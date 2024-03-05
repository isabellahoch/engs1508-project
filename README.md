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

┣ 📂data
\┃ ┣ 📂Markdown RAG
\┃┃ ┣ 📂vectorstore
\┃┃┃ ┣ 📜index.faiss
\┃┃┃ ┗ 📜index.pkl
\┃┃ ┣ 📜general_criteria_markdown_v2.txt
\┃┃ ┣ 📜Low Volatility Table.txt
\┃┃ ┣ 📜Medial Volatility Table.txt
\┃┃ ┣ 📜ratios_and_adjustments.txt
\┃┃ ┣ 📜sector_specific_guidance_markdown_v1.txt
\┃┃ ┗ 📜Standard Volatility Table.txt
\┃ ┣ 📜company_tickers.json
\┃ ┣ 📜original_data_v1.csv
\┃ ┣ 📜original_data.csv
\┃ ┗ 📜ticker.txt
┣ 📜.env
┣ 📜.gitignore
┣ 📜company_tickers.json
┣ 📜data.py
┣ 📜financial_info.py
┣ 📜main.py
┣ 📜prompt_templates.py
┣ 📜requirements.txt
┣ 📜scraping.py
┣ 📜ticker.txt
┗ 📜utils.py

### Frontend: Vite + React + TypeScript

┣ 📂public
\┃ ┗ 📜RB_logo.png
┣ 📂src
\┃ ┣ 📂assets
\┃┃ ┗ 📜react.svg
\┃ ┣ 📂Dashboard
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂FinancialStats
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂Loading
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂Q&A
\┃┃ ┣ 📂MessageBubble
\┃┃┃ ┗ 📜index.tsx
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂QuoteViz
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂RiskBadge
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂RiskyBusiness
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂SearchBar
\┃┃ ┗ 📜index.tsx
\┃ ┣ 📂services
\┃┃ ┗ 📂api
\┃┃   ┗ 📜index.ts
\┃ ┣ 📂slices
\┃┃ ┗ 📜index.ts
\┃ ┣ 📂types
\┃┃ ┣ 📜Company.ts
\┃┃ ┣ 📜CompanyRecord.ts
\┃┃ ┣ 📜index.ts
\┃┃ ┣ 📜Message.ts
\┃┃ ┣ 📜NewsArticle.ts
\┃┃ ┣ 📜NewsItem.ts
\┃┃ ┗ 📜SimpleCompany.ts
\┃ ┣ 📜App.css
\┃ ┣ 📜App.tsx
\┃ ┣ 📜index.css
\┃ ┣ 📜main.tsx
\┃ ┣ 📜store.ts
\┃ ┗ 📜vite-env.d.ts
┣ 📜.env
┣ 📜.eslintrc.cjs
┣ 📜.gitignore
┣ 📜index.html
┣ 📜package.json
┣ 📜postcss.config.cjs
┣ 📜README.md
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┗ 📜vite.config.ts

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