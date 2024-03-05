# Risky Business Full-Stack App: ENGS15.08 Final Project

## Backend: FastAPI + LangChain

┣ 📂data
┃ ┣ 📂Markdown RAG
┃ ┃ ┣ 📂vectorstore
┃ ┃ ┃ ┣ 📜index.faiss
┃ ┃ ┃ ┗ 📜index.pkl
┃ ┃ ┣ 📜general_criteria_markdown_v2.txt
┃ ┃ ┣ 📜Low Volatility Table.txt
┃ ┃ ┣ 📜Medial Volatility Table.txt
┃ ┃ ┣ 📜ratios_and_adjustments.txt
┃ ┃ ┣ 📜sector_specific_guidance_markdown_v1.txt
┃ ┃ ┗ 📜Standard Volatility Table.txt
┃ ┣ 📜company_tickers.json
┃ ┣ 📜original_data_v1.csv
┃ ┣ 📜original_data.csv
┃ ┗ 📜ticker.txt
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

## Frontend: Vite + React + TypeScript

┣ 📂public
┃ ┗ 📜RB_logo.png
┣ 📂src
┃ ┣ 📂assets
┃ ┃ ┗ 📜react.svg
┃ ┣ 📂Dashboard
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂FinancialStats
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂Loading
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂Q&A
┃ ┃ ┣ 📂MessageBubble
┃ ┃ ┃ ┗ 📜index.tsx
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂QuoteViz
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂RiskBadge
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂RiskyBusiness
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂SearchBar
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂services
┃ ┃ ┗ 📂api
┃ ┃   ┗ 📜index.ts
┃ ┣ 📂slices
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂types
┃ ┃ ┣ 📜Company.ts
┃ ┃ ┣ 📜CompanyRecord.ts
┃ ┃ ┣ 📜index.ts
┃ ┃ ┣ 📜Message.ts
┃ ┃ ┣ 📜NewsArticle.ts
┃ ┃ ┣ 📜NewsItem.ts
┃ ┃ ┗ 📜SimpleCompany.ts
┃ ┣ 📜App.css
┃ ┣ 📜App.tsx
┃ ┣ 📜index.css
┃ ┣ 📜main.tsx
┃ ┣ 📜store.ts
┃ ┗ 📜vite-env.d.ts
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

