from typing import Union

import pandas as pd
import numpy as np
import json
import re
from tqdm import tqdm
from operator import itemgetter
import pickle
import string
import time
import os
from dotenv import load_dotenv

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import MarkdownHeaderTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.llms import HuggingFaceHub
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline

from fastapi import FastAPI

from utils import *
from prompt_templates import *

app = FastAPI()

load_dotenv()

df = pd.read_csv("./data/original_data.csv")
df['circa_rating'] = df['circa_rating'].str.extract('(\d+)').astype(int)
df['volatility'] = df.apply(lambda row: choose_volatility_table(row['circa_rating'], row['sector']), axis=1)
df['Risk_Categories'] = df.apply(calculate_risk_categories, axis=1)

# Set up markdown splitter
headers_to_split_on = [
    ("#", "Header 1"),
    ("##", "Header 2"),
    ("###", "Header 3"),
    ("####", "Header 4"),
    ("#####", "Header 5"),
]

markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on, strip_headers = False)

# Upload documents
documents = [
    # general crtieria
    './data/Markdown RAG/general_criteria_markdown_v2.txt',
    # sector-specific guidance
    './data/Markdown RAG/sector_specific_guidance_markdown_v1.txt',
    # ratios and adjustments
    './data/Markdown RAG/ratios_and_adjustments.txt',
    # standard volatility table
    './data/Markdown RAG/Standard Volatility Table.txt',
    # medial volatility table
    './data/Markdown RAG/Medial Volatility Table.txt',
    # low volatility tale
    './data/Markdown RAG/Low Volatility Table.txt'
]

# STEP 1: SPLIT ON MARKDOWN HEADERS
md_header_splits = []

for doc in documents:
  doc = open(doc, 'r').read()
  doc_data = markdown_splitter.split_text(doc)
  md_header_splits += doc_data

# STEP 2: ADD RECURSIVE CHARACTER SPLITTER ON PARAGRAPHS/SENTENCES
text_splitter = RecursiveCharacterTextSplitter()

final_doc_splits = text_splitter.split_documents(md_header_splits)



vectorstore = FAISS.load_local("./data/Markdown RAG/vectorstore", OpenAIEmbeddings(model = 'text-embedding-ada-002'))
retriever = vectorstore.as_retriever()

template = """<s>[INST]Use the following context to help you answer the question below:
{context}

Question: {question}[/INST]
"""
prompt = ChatPromptTemplate.from_template(template)

# TRAINING LOOP
model = HuggingFaceHub(
    repo_id = "mistralai/Mixtral-8x7B-Instruct-v0.1",
    task="text-generation",
    model_kwargs={
        "max_new_tokens": 5000,
        "top_k": 30,
        "temperature": 0.1,
        "repetition_penalty": 1.03,
    },
)

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | model
    | StrOutputParser()
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/companies/cik/{cik}")
def return_company_info_from_cik(cik: str, q: Union[str, None] = None):

    chain1 = (
      {"context": retriever, "step1": RunnablePassthrough()}
      | prompt1
      | model
      | StrOutputParser()
    )

    row = df.loc[df['company_name'] == cik]

    step1_output = mistral_extract_output(chain1.invoke(create_prompt1(row)))

    risk_categories = str(row['Risk_Categories']).strip("{}").replace(", ", "\n")

    prompt2 = ChatPromptTemplate.from_template(step2_template(step1_output, row, risk_categories))

    chain2 = (
        {"context": retriever, "step2": RunnablePassthrough()}
        | prompt2
        | model
        | StrOutputParser()
    )

    step2_output = mistral_extract_output(chain2.invoke(create_prompt2(row)))

    prompt3 = create_prompt3(step1_output, step2_output, row, risk_categories)

    final_chain = (
      {"step3":RunnablePassthrough()}
      | prompt3
      | model
      | StrOutputParser()
    )
    final_output = mistral_extract_output(final_chain.invoke(json_final_answer_prompt(row)))

    final_answer = extract_json_and_answer(final_output)

    reasoning = "# STEP 1 OUTPUT:\n" + step1_output + "\n # STEP 2 OUTPUT:\n" + step2_output + "\n # FINAL ANSWER OUTPUT:\n" + final_output

    return {"cik": cik, "answer": final_answer, "reasoning": reasoning}

@app.get("/companies/{ticker}")
def return_company_info_from_ticker(ticker: str, q: Union[str, None] = None):

    chain1 = (
      {"context": retriever, "step1": RunnablePassthrough()}
      | prompt1
      | model
      | StrOutputParser()
    )

    matches_df = df.loc[df['ticker'] == ticker]
    
    row = matches_df.iloc[0].to_dict()

    # return {"ticker": ticker, "row": row}

    step1_output = mistral_extract_output(chain1.invoke(create_prompt1(row)))

    risk_categories = str(row['Risk_Categories']).strip("{}").replace(", ", "\n")

    prompt2 = ChatPromptTemplate.from_template(step2_template(step1_output, row, risk_categories))

    chain2 = (
        {"context": retriever, "step2": RunnablePassthrough()}
        | prompt2
        | model
        | StrOutputParser()
    )

    step2_output = mistral_extract_output(chain2.invoke(create_prompt2(row)))

    prompt3 = create_prompt3(step1_output, step2_output, row, risk_categories)

    final_chain = (
      {"step3":RunnablePassthrough()}
      | prompt3
      | model
      | StrOutputParser()
    )
    final_output = mistral_extract_output(final_chain.invoke(json_final_answer_prompt(row)))

    final_answer = extract_json_and_answer(final_output)

    reasoning = "# STEP 1 OUTPUT:\n" + step1_output + "\n # STEP 2 OUTPUT:\n" + step2_output + "\n # FINAL ANSWER OUTPUT:\n" + final_output

    return {"ticker": ticker, "answer": final_answer, "reasoning": reasoning, "details": row}


@app.get("/docs/{doc}")
def return_company_info(doc: str, q: Union[str, None] = None):
    return {"doc": doc, "q": q, 'fsplit': final_doc_splits[94]}

@app.get("/questions/{doc}")
def ask_qa(doc: str, q: Union[str, None] = None):
    question = "Summarize the sector-specific guidance for the technology software industry supplemental ratios to consider in 2 sentences."
    res = chain.invoke(question)
    return {"doc": doc, "q": q, 'res': res}