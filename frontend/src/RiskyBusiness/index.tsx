import { Container, Text, Title } from '@mantine/core';
import CompanyRecord from '../types/CompanyRecord';
import SearchBar from '../SearchBar/index';
import { useState } from 'react';
import Dashboard from '../Dashboard/index';
import { useGetCompaniesQuery } from '../services/api/index';

const RiskyBusiness = () => {

  const companiesQuery = useGetCompaniesQuery();

  const [selectedCompany, setSelectedCompany] = useState<CompanyRecord>(null);
  const [pageLoading, setPageIsLoading] = useState(false);

  if(companiesQuery.isLoading) {
    return <Container>
      <Title align="center">💼 🔍 Risky Business 🔎 💼 </Title>
      <br />
      <Text>Connecting to API....</Text>
      <Text>It may take up to 60 seconds for the backend to start up again (the Render free tier is notoriously slow) so pleaase be patient! You can test if it's ready by visiting <a href="https://engs1508-backend.onrender.com/companies">this link</a> in your browser.</Text>
    </Container>
  }

  if(companiesQuery.error || !companiesQuery.data || companiesQuery.data.length < 1) {
    return <Container>
      <Title align="center">💼 🔍 Risky Business 🔎 💼 </Title>
      <br />
      <Text>There was an error connecting to the API.</Text>
      <Text>Please ensure it is up and running locally or at <a href="https://engs1508-backend.onrender.com/companies">engs1508-backend.onrender.com</a>.</Text>
    </Container>
  }

  return (<>
          <Title align="center">💼 🔍 Risky Business 🔎 💼 </Title>
          <br />
          <SearchBar companies={companiesQuery.data} onSelect={setSelectedCompany} />
            {selectedCompany && <Dashboard selectedCompany={selectedCompany} />}
        </>);
}

export default RiskyBusiness;