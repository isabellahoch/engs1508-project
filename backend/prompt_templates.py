from langchain_core.prompts import ChatPromptTemplate

step1_template = f"""<s> [INST]Use the following context to help you accomplish the task:""" + """
  {context}
  TASK: {step1}[/INST]"""

prompt1 = ChatPromptTemplate.from_template(step1_template)

def step2_template(step1_output, row, risk_categories):
    return  f"<s> [INST]Use the following context to help you determine the financial risk profile for {row['company_name']}:" + """
    {context}

    Use the following informatino to help you determine the financial risk profile:
    1) The risk categories for each of the metrics based on the""" + f""" {row['volatility']} volatility table: {risk_categories}.
    2) Summary the industry-specific guidance:""" + step1_output + """

    Take a deep breath and think step by step. YOUR NEXT TASK: {step2}[/INST]"""

def create_prompt3(step1_output, step2_output, row, risk_categories):
    step3_template = f"""<s> [INST] Use the following information to help you determine the financial risk profile:
    1) risk categories for each of the metrics based on the {row['volatility']} volatility table: {risk_categories}.
    2) Summary of the industry-specific guidance: {step1_output}
    3) Risk profile assignment reasoning: {step2_output}

    Here is your final task:""" + "{step3} [/INST]"
    prompt3 = ChatPromptTemplate.from_template(step3_template)

    return prompt3

def create_prompt1(row):
  return f"""
  STEP 1: In a few sentences, briefly summarize the sector-specific guidance about which supplemental and core metrics are considered important for the {row['sector'].title()} industry. If the {row['sector'].title()} industry is not mentioned, use the industry and business description to find the most similar sector.
  """

def create_prompt2(row):
  return f"""
  STEP 2: Follow the general corporate methodology and the procedure in the industry-specific guidance to aggregate the key financial ratios and determine the financial risk (1-6). Pay attention to the industry-specific guidance about which metrics are most important for the {row['sector']} industry.
  STEP 2A: First, compare the core ratios (FFO to debt and debt to EBITDA) to the ratio ranges in the relevant benchmark table. If the core ratios result in different cash flow/leverage assessments, select the relevant core ratio based on the industry-specific guidance or whichever the best indicator of a company's future leverage.
  STEP 2B: Next, consider the supplementary ratios. Follow the industry-specific guidance. If the cash flow/leverage assessment(s) indicated by the important supplemental ratio(s) differs from the preliminary cash flow/leverage assessment, we might adjust the preliminary cash flow/leverage assessment by one category in the direction of the cash flow/leverage assessment indicated by the supplemental ratio(s) to derive the adjusted cash flow/leverage assessment. We will make this adjustment if, in our view, the supplemental ratio provides the best indicator of a company's future leverage. If there is more than one important supplemental ratio and they result in different directional deviations from the preliminary cash flow/leverage assessment, we will select one as the relevant supplemental ratio based on which, in our opinion, provides the best indicator of a company's future leverage. We will then make the adjustment outlined above if the selected supplemental ratio differs from the preliminary cash flow/leverage assessment and the selected supplemental ratio provides the best overall indicator of a company's future leverage.
  Your final answer should be a single risk profile from 1 to 6.
  """

def json_final_answer_prompt(row):
  return f"""For your final answer, return a JSON object with 'reasoning' and 'answer' fields.

  Your response should be in the form {{'reasoning': <Methodological explanation as to why you chose that specific rating>, 'answer': <A single category from 1-6> }}"""