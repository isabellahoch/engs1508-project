import { LoadingOverlay, Box } from '@mantine/core';
import CompanyRecord from '../types/CompanyRecord';
import SearchBar from '../SearchBar/index';
import { useState } from 'react';
import Company from '../types/Company';
import Dashboard from '../Dashboard/index';
import { useGetCompaniesQuery } from '../services/api/index';

export default function RiskyBusiness() {

  const companiesQuery = useGetCompaniesQuery();

  const [selectedCompany, setSelectedCompany] = useState<CompanyRecord>(null);
  const [pageLoading, setPageIsLoading] = useState(false);

  if(companiesQuery.isLoading || companiesQuery.error || !companiesQuery.data || companiesQuery.data.length < 1) {
    return <></>
  }

  return (<>
          <SearchBar companies={companiesQuery.data} onSelect={setSelectedCompany} />
          {/* <Box pos="relative"> */}
            {/* <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}> */}
              {selectedCompany && <Dashboard selectedCompany={selectedCompany} />}
            {/* </LoadingOverlay> */}
          {/* </Box> */}
        </>);
}