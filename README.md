# Risky Business Full-Stack App: ENGS15.08 Final Project

This repository contains the code for a full-stack application designed to assess the financial risk profile (FRP) of companies. 

The application combines:

- **AI-powered financial risk prediction**: A RAG LLM agent leverages various data sources to predict FRP and provides reasoning behind its decision.
- **Financial data visualization**: Key financial ratios, FinNLP pricing data, and recent news articles are aggregated and presented in a dashboard.
- **Due diligence Q&A chatbot**: A LangChain agent with multiretriever capabilities assists with due diligence tasks by answering user queries using various information sources and citing any information used.

## Project Structure
The repository is organized into two main directories:

`backend`: Contains the Python code for the FastAPI backend and LangChain integration.
`frontend`: Contains the TypeScript code for the React frontend using Vite and Mantine.
Each directory includes its own dependencies, configuration files, and source code.

### Backend: FastAPI + LangChain

<br> ┣ 📂data
<br>┃ ┣ 📂Markdown RAG
<br>┃ ┃ ┣ 📂vectorstore
<br>┃ ┃┃ ┣ 📜index.faiss
<br>┃ ┃┃ ┗ 📜index.pkl
<br>┃ ┃ ┣ 📜general_criteria_markdown_v2.txt
<br>┃ ┃ ┣ 📜Low Volatility Table.txt
<br>┃ ┃ ┣ 📜Medial Volatility Table.txt
<br>┃ ┃ ┣ 📜ratios_and_adjustments.txt
<br>┃ ┃ ┣ 📜sector_specific_guidance_markdown_v1.txt
<br>┃ ┃ ┗ 📜Standard Volatility Table.txt
<br>┃ ┣ 📜company_tickers.json
<br>┃ ┣ 📜original_data_v1.csv
<br>┃ ┣ 📜original_data.csv
<br>┃ ┗ 📜ticker.txt
<br> ┣ 📜.env
<br> ┣ 📜.gitignore
<br> ┣ 📜company_tickers.json
<br> ┣ 📜data.py
<br> ┣ 📜financial_info.py
<br> ┣ 📜main.py
<br> ┣ 📜prompt_templates.py
<br> ┣ 📜requirements.txt
<br> ┣ 📜scraping.py
<br> ┣ 📜ticker.txt
\ ┗ 📜utils.py

### Frontend: Vite + React + TypeScript

┣ 📂public
<br>┃ ┗ 📜RB_logo.png
┣ 📂src
<br>┃ ┣ 📂assets
<br>┃ ┃ ┗ 📜react.svg
<br>┃ ┣ 📂Dashboard
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂FinancialStats
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂Loading
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂Q&A
<br>┃ ┃ ┣ 📂MessageBubble
<br>┃ ┃┃ ┗ 📜index.tsx
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂QuoteViz
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂RiskBadge
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂RiskyBusiness
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂SearchBar
<br>┃ ┃ ┗ 📜index.tsx
<br>┃ ┣ 📂services
<br>┃ ┃ ┗ 📂api
<br>┃ ┃   ┗ 📜index.ts
<br>┃ ┣ 📂slices
<br>┃ ┃ ┗ 📜index.ts
<br>┃ ┣ 📂types
<br>┃ ┃ ┣ 📜Company.ts
<br>┃ ┃ ┣ 📜CompanyRecord.ts
<br>┃ ┃ ┣ 📜index.ts
<br>┃ ┃ ┣ 📜Message.ts
<br>┃ ┃ ┣ 📜NewsArticle.ts
<br>┃ ┃ ┣ 📜NewsItem.ts
<br>┃ ┃ ┗ 📜SimpleCompany.ts
<br>┃ ┣ 📜App.css
<br>┃ ┣ 📜App.tsx
<br>┃ ┣ 📜index.css
<br>┃ ┣ 📜main.tsx
<br>┃ ┣ 📜store.ts
<br>┃ ┗ 📜vite-env.d.ts
<br> ┣ 📜.env
<br> ┣ 📜.eslintrc.cjs
<br> ┣ 📜.gitignore
<br> ┣ 📜index.html
<br> ┣ 📜package.json
<br> ┣ 📜postcss.config.cjs
<br> ┣ 📜README.md
<br> ┣ 📜tsconfig.json
<br> ┣ 📜tsconfig.node.json
\ ┗ 📜vite.config.ts

## Deployment Instructions
1. Prerequisites:
- Python 3.x
- Node.js and npm

2. Setting Up the Backend:
Install dependencies: `pip install -r backend/requirements.txt`
Create a .env file in the backend directory and set the necessary environment variables

3. Setting Up the Frontend:

Install dependencies: `npm install`
Adjust environment variables in the .env file as needed to point to API URL.

4. Running the Application:

Start the backend: `cd backend && uvicorn main:app --reload`
Start the frontend: `cd frontend && npm run dev`
The application will be accessible at [http://localhost:5173/](http://localhost:5173/).

## Summary

This project was developed for the ENGS15.08 Final Project at Dartmouth College. We translated our many Colab notebooks into a full-stack application: a Python FastAPI backend paired with a TypeScript + Vite + React frontend using the Mantine component library. In a dashboard-style interface, users can access AI-powered tools in a single place, automating the work that may normally be given to an entry-level analyst. Our RAG LLM agent will predict the financial risk profile (FRP) for any company in its database on the fly and provide established, structured reasoning as to how it came to that decision. In addition, FinNLP pricing data, recent news articles, and key financial ratios are also aggregated and highlighted in one place. A subset of these inputs are fed into the financial risk prediction model to obtain the final results. Also, we created a due diligence Q&A chatbot: a LangChain agent armed with multiretriever capabilities, combining RAG with scraped SEC filings (including a company 10-K obtained using the Edgar API and BeautifulSoup) with a WebRetriever to be able to conduct searches using the Google JSON Search API and a custom Programmable Search Engine (PSE) in order to return the most accurate and helpful results to any due diligence query. Also, given the important financial use cases of this dashboard tool, the retrieval process ensures that any document used in the final response must also have a source, and these sources are cited in the response to guarantee accuracy and allow for human validation. This Q&A chain involves a websocket between the frontend and backend throughout the conversation to make conversational speed as efficient as possible.