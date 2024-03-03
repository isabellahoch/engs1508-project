import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import 'dotenv/config';
import Company from '../types/Company';
import CompanyRecord from '../types/CompanyRecord';

export const riskyBusinessApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}/api/` }),
  endpoints: (builder: any) => ({
    getCompanyByCIK: builder.query({
      query: (cik: string) => `companies/cik/${cik}`,
    }),
    getCompanyByTicker: builder.query({
      query: (ticker: string) => `companies/${ticker}`,
    }),
    getCompanies: builder.query({
      query: () => `companies`,
    }),
  }),
})

export const { useGetCompanyByCIKQuery, useGetCompanyByTickerQuery, useGetCompaniesQuery } = riskyBusinessApi