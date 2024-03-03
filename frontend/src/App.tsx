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

const dummyCompanyData: Company[] = [
  {
    name: "AAR Corp.",
    cik: 1000001, // Replace with actual CIK??
    tickerSymbol: "AIR",
    circaRating: "Intermediate[3]",
    businessDescription: "AAR Corp. provides products and services to commercial airlines...",
    news: [],
    financialRisk: {
      rating: "Intermediate[3]",
      reasoning: "Placeholder for reasoning behind the rating",
    },
    metrics: {
      ffoToDebt: 0.18,
      debtToEbitda: 1.31,
      cfoToDebt: 0.23,
      focfToDebt: 0.11,
      dcfToDebt: 0.11,
      ffoInterestCoverage: 2.93,
      ebitdaToInterest: 10.30,
      ebitMargin: 7.25,
      ebitdaMargin: 8.70,
      returnOnCapital: 7.05,
    },
  },
  {
    name: "Leidos Holdings Inc.",
    cik: 1112223,
    tickerSymbol: "LDO",
    circaRating: "Intermediate[3]",
    businessDescription: "Leidos Holdings, Inc., together with its subsidiaries, provides...",
    news: [],
    financialRisk: {
      rating: "Intermediate[3]",
      reasoning: "Placeholder for reasoning behind the rating",
    },
    metrics: {
      ffoToDebt: 0.22,
      debtToEbitda: 2.51,
      cfoToDebt: 0.26,
      focfToDebt: 0.21,
      dcfToDebt: 0.31,
      ffoInterestCoverage: 5.50,
      ebitdaToInterest: 8.58,
      ebitMargin: 8.43,
      ebitdaMargin: 10.60,
      returnOnCapital: 8.32,
    },
  },
];



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