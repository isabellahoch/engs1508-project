import NewsArticle from "./NewsArticle";

interface SimpleCompany {
    name: string;
    cik: number;
    tickerSymbol: string;

    circaRating: string;

    businessDescription: string;
  
    news: NewsArticle[];
  
    financialRisk: {
      rating: string;
      reasoning: string;
    };
  
    metrics: {
        ffoToDebt: number; 
        debtToEbitda: number;
        cfoToDebt: number;
        focfToDebt: number;
        dcfToDebt: number;
        ffoInterestCoverage: number;
        ebitdaToInterest: number;
        ebitMargin: number;
        ebitdaMargin: number;
        returnOnCapital: number;
    };
  }

export default SimpleCompany;