import NewsItem from './NewsItem';

interface Company {
  ticker: string;
  cik: any;
  info: {
    news: NewsItem[];
    quote: Record<string, unknown>; // Unknown type due to lack of information
    peers: string[];
  };
  risk: RiskResponse;
  details: DetailsData;
}

interface RiskResponse {
  answer: number;
  reasoning: string;
}

interface DetailsData {
  'Risk_Categories': any;
  [key: string]: any; // Allows for dynamic keys with string or number values
}

export default Company;