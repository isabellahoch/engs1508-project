import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Company from '../../types/Company';
import CompanyRecord from '../../types/CompanyRecord';

export const riskyBusinessApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/` }),
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