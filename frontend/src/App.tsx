// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` reqnuire styles imports
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, LoadingOverlay, Box } from '@mantine/core';
import CompanyRecord from './types/CompanyRecord';
import SearchBar from './SearchBar/index';
import { useState } from 'react';
import Company from './types/Company';
import Dashboard from './Dashboard/index';
import Loading from './Loading/index';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

const dummyCompanies: CompanyRecord[] = [
  { name: "Acme Corporation", ticker: "ACME", cik: '1234567890' },
  { name: "Brilliant Ideas Inc.", ticker: "BRAIN", cik: '9876543210' },
  { name: "Cozy Cloud Solutions", ticker: "CLOUD", cik: '1112223330' },
  { name: "Dynamic Delivery Drones", ticker: "DRONE", cik: '3334445550' },
  { name: "Evergreen Energy Systems", ticker: "GREEN", cik: '5556667770' },
  { name: "Fantastic Food Franchise", ticker: "FFood", cik: '7778889990' },
  { name: "Gadget Guru Electronics", ticker: "GADGET", cik: '0001112220' },
  { name: "Happy Harmony Homes", ticker: "HAPPY", cik: '2223334440' },
  { name: "Imaginative Interactive Studios", ticker: "IMAGINE", cik: '4445556660' },
  { name: "Jolly Java Joints", ticker: "JJAVA", cik: '6667778880' },
];

// const dummyCompanyData: Company[] = [
//   {
//     name: "AAR Corp.",
//     cik: 1000001, // Replace with actual CIK??
//     tickerSymbol: "AIR",
//     circaRating: "Intermediate[3]",
//     businessDescription: "AAR Corp. provides products and services to commercial airlines...",
//     news: [],
//     financialRisk: {
//       rating: "Intermediate[3]",
//       reasoning: "Placeholder for reasoning behind the rating",
//     },
//     metrics: {
//       ffoToDebt: 0.18,
//       debtToEbitda: 1.31,
//       cfoToDebt: 0.23,
//       focfToDebt: 0.11,
//       dcfToDebt: 0.11,
//       ffoInterestCoverage: 2.93,
//       ebitdaToInterest: 10.30,
//       ebitMargin: 7.25,
//       ebitdaMargin: 8.70,
//       returnOnCapital: 7.05,
//     },
//   },
//   {
//     name: "Leidos Holdings Inc.",
//     cik: 1112223,
//     tickerSymbol: "LDO",
//     circaRating: "Intermediate[3]",
//     businessDescription: "Leidos Holdings, Inc., together with its subsidiaries, provides...",
//     news: [],
//     financialRisk: {
//       rating: "Intermediate[3]",
//       reasoning: "Placeholder for reasoning behind the rating",
//     },
//     metrics: {
//       ffoToDebt: 0.22,
//       debtToEbitda: 2.51,
//       cfoToDebt: 0.26,
//       focfToDebt: 0.21,
//       dcfToDebt: 0.31,
//       ffoInterestCoverage: 5.50,
//       ebitdaToInterest: 8.58,
//       ebitMargin: 8.43,
//       ebitdaMargin: 10.60,
//       returnOnCapital: 8.32,
//     },
//   },
// ];

const dummyCompanyData: Company[] = [
  {
    "ticker": "KBR",
    "info": {
    "news": [
      {
      "category": "company",
      "datetime": 1709249912,
      "headline": "Tracking Stanley Druckenmiller's Duquesne Family Office Portfolio - Q4 2023 Update",
      "id": 126220573,
      "image": "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/495501702/image_495501702.jpg?io=getty-c-w1536",
      "related": "KBR",
      "source": "SeekingAlpha",
      "summary": "Duquesne Family Office's 13F portfolio value increased from $2.79B to $3.35B in Q4 2023. Click here for a detailed review.",
      "url": "https://finnhub.io/api/news?id=25eee0764bc14776f59bfe27e3f822ad62a4ea86909bdccdd027138a6d875f99"
      },
      {
      "category": "company",
      "datetime": 1709068500,
      "headline": "KBR to Hold Sustainable Technology Solutions Primer Webinar",
      "id": 126174820,
      "image": "https://media.zenfs.com/en/prnewswire.com/2b0b0312d9a898c6705d475076f2c982",
      "related": "KBR",
      "source": "Yahoo",
      "summary": "KBR (NYSE: KBR) announced today that it will hold a webcast of their Sustainable Technology Solutions (STS) Primer on Tuesday, March 12, 2024, beginning at 8:00 a.m. Central Time (9:00 a.m. Eastern Time).",
      "url": "https://finnhub.io/api/news?id=567bfffc8f71c6162af8c85032a22e858bc328f86908f6a36162bbff38ddf124"
      },
      {
      "category": "company",
      "datetime": 1708683985,
      "headline": "KBR (NYSE:KBR) Is Paying Out A Larger Dividend Than Last Year",
      "id": 126086235,
      "image": "https://media.zenfs.com/en/simply_wall_st__316/cf3f0369cec0a4d8742d0cfe2fa44bae",
      "related": "KBR",
      "source": "Yahoo",
      "summary": "The board of KBR, Inc. ( NYSE:KBR ) has announced that it will be increasing its dividend by 11% on the 15th of April...",
      "url": "https://finnhub.io/api/news?id=987f738858836adebaa75ce9b9f300f4bf53aa9ce4ed7a108f1d2b8ef45f0d20"
      }
    ],
    "quote": {
      "c": 59.91,
      "d": -0.12,
      "dp": -0.1999,
      "h": 60.18,
      "l": 59.65,
      "o": 59.89,
      "pc": 60.03,
      "t": 1709326802
    },
    "peers": [
      "TRU",
      "J",
      "NLSN",
      "PSN",
      "CACI",
      "KBR",
      "SAIC",
      "FCN",
      "DNB",
      "EXPO",
      "950140.KQ"
      ]
    },
    "risk": {
      "answer": 4,
      "reasoning": "# STEP 1 OUTPUT:\n The Aerospace and Defense industry, as per the provided sector-specific guidance, has unique characteristics that warrant special consideration in financial analysis. Core ratios, such as those related to revenue, profitability, and leverage, are crucial for assessing the financial health of companies in this sector. However, given the industry's nature, supplemental ratios like Free Operating Cash Flow to debt (FOCF to debt), debt service coverage ratios, and Discretionary Cash Flow to debt (DCF to debt) are also important. These supplemental ratios help refine the understanding of a company's credit risk profile and cash flow, especially when developing new products.\n # STEP 2 OUTPUT:\n Based on the given information, let's determine the financial risk profile for KBR Inc. following the general corporate methodology and the industry-specific guidance for the Aerospace and Defense industry.\n\nStep 2A: Comparing core ratios -\n1. FFO to debt: Aggressive Risk [5]\n2. Debt to EBITDA: Intermediate Risk [3]\n\nAccording to the industry-specific guidance, FFO to debt is a crucial ratio for the Aerospace and Defense industry. Therefore, we will consider FFO to debt as the relevant core ratio.\n\nStep 2B: Considering supplementary ratios -\n1. FOCF to debt: Significant Risk [4]\n2. DCF to debt: Minimal Risk [1]\n\nBased on the industry-specific guidance, FOCF to debt and DCF to debt are essential supplemental ratios for the Aerospace and Defense industry. Since these two ratios indicate different cash flow/leverage assessments, we need to select the relevant supplemental ratio. In this case, we will choose FOCF to debt as it provides a better indicator of a company's future leverage, given the industry's nature of developing new products and requiring significant capital expenditures.\n\nNow, we will adjust the preliminary cash flow/leverage assessment based on the selected supplemental ratio, FOCF to debt (Significant Risk [4]). The preliminary cash flow/leverage assessment was Aggressive Risk [5] based on the FFO to debt ratio. After considering the supplemental ratio, we will adjust the preliminary cash flow/leverage assessment down by one category to Significant Risk [4].\n\nTherefore, the financial risk profile for KBR Inc. is a Significant Risk [4].\n # FINAL ANSWER OUTPUT:\n Based on the information provided, here is the JSON object with the 'reasoning' and 'answer' fields:\n\n```json\n{\n  \"reasoning\": \"The financial risk profile for KBR Inc. is determined by comparing core ratios and considering supplementary ratios, as per the general corporate methodology and the industry-specific guidance for the Aerospace and Defense industry. The core ratio, FFO to debt, indicates an Aggressive Risk [5]. However, considering the industry-specific guidance, we focus on the supplemental ratio FOCF to debt, which shows a Significant Risk [4]. After adjusting the preliminary cash flow/leverage assessment based on the selected supplemental ratio, the final financial risk profile for KBR Inc. is a Significant Risk [4].\",\n  \"answer\": 4\n}\n```"
    },
    "details": {
      "Unnamed: 0.1": 9,
      "Unnamed: 0": 9,
      "company_name": "KBR Inc.",
      "sector": "AEROSPACE & DEFENSE",
      "financial_risk_profile": "[4] Significant",
      "circa_rating": 3,
      "business_description": "KBR, Inc. provides scientific, technology, and engineering solutions to governments and commercial customers worldwide.",
      "ffo_to_debt_ltm": 0.16,
      "debt_to_ebitda_ltm": 2.07,
      "cfo_to_debt_ltm": 0.19,
      "focf_to_debt_ltm": 0.14,
      "dcf_to_debt_ltm": 0.26,
      "ffo_interest_coverage_ltm": 2.88,
      "ebitda_to_interest_ltm": 7.45,
      "ebit_margin_ltm": 6.97,
      "ebitda_margin_ltm": 8.34,
      "return_on_capital_ltm": 8.56,
      "ticker": "KBR",
      "volatility": "Standard",
      "Risk_Categories": {
        "ffo_to_debt": "Aggressive Risk [5]",
        "debt_to_ebitda": "Intermediate Risk [3]",
        "ffo_cash_interest_cover": "Aggressive Risk [5]",
        "ebitda_to_interest": "Intermediate Risk [3]",
        "cfo_to_debt": "Significant Risk [4]",
        "focf_to_debt": "Significant Risk [4]",
        "dcf_to_debt": "Minimal Risk [1]"
      },
      "financial_risk_profile_numeric": 4
    }
    }
]

export default function App() {

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return <MantineProvider
            theme={theme}
            classNamesPrefix="financial-dashboard"
            >
              <SearchBar companies={dummyCompanies} onSelect={setSelectedCompany} />
              {/* <Box pos="relative"> */}
                {/* <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}> */}
                  <Dashboard companyData={dummyCompanyData[0]} />
                {/* </LoadingOverlay> */}
              {/* </Box> */}
              {/* Your app here */}
            </MantineProvider>;
}