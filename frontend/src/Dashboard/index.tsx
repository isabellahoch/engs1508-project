// Dashboard.tsx

import React, { useEffect, useState, forwardRef } from 'react';
import {
  Group,
  Grid,
  Box,
  Text,
  Title,
  Divider,
  Card,
  List,
  Tooltip,
  Anchor,
  Accordion,
  LoadingOverlay,
  Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Markdown from 'react-markdown';
import RiskBadge from '../RiskBadge/index';
import CompanyRecord from '../types/CompanyRecord';
import NewsItem from '../types/NewsItem';
import FinancialStats from '../FinancialStats/index';
import QuoteViz from '../QuoteViz/index';
import QAComponent from '../Q&A/index';
import Loading from '../Loading';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { useGetCompanyByTickerQuery } from '../services/api/index';

const Dashboard: React.FC<{ selectedCompany: CompanyRecord }> = ({selectedCompany}: any) => {

  const { data, error, isLoading } = useGetCompanyByTickerQuery(selectedCompany.ticker);

  const [visible, { toggle }] = useDisclosure(false);

  if ((!isLoading && !data) || error) {
    return (<Text>No data found for this company.</Text>);
  }

  useEffect(() => {
    if(!isLoading && visible) {
      toggle();
    }
  }, [isLoading])

  return (
    <Container>
      {selectedCompany && <Card withBorder shadow="md" padding="md" style={{marginBottom: "30px", marginTop: "25px"}}>
      <Card.Section>
        <Title>{selectedCompany.name} ({selectedCompany.ticker})</Title>
      </Card.Section>
      <Card.Section>
        {selectedCompany.cik}
      </Card.Section>
    </Card>}

    {data ? 
    <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2}}
            >
                <Masonry gutter="30px" columnsCount={2}>
    {/* <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}> */}
    
      <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>{data.details.company_name}</Title>
        </Card.Section>
        <Card.Section>
          <Text>{data.details.business_description}</Text>
          <Divider my="md" />
          <Group>
            <Text>Financial Risk:</Text>
            <Tooltip label="True Value">
              <RiskBadge riskLevel={data.details.financial_risk_profile_numeric} />
            </Tooltip>
            <Tooltip label="Predicted Value">
              <RiskBadge riskLevel={data.risk.answer} />
            </Tooltip>
            <Accordion>
              <Accordion.Item key={'data-risk-reasoning'} value={'risk-reasoning'}>
                <Accordion.Control icon={'❔'}>{'Reasoning'}</Accordion.Control>
                <Accordion.Panel><Container><Markdown>{data.risk.reasoning.replaceAll('#', '###').split('FINAL ANSWER OUTPUT')[0]}</Markdown></Container></Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Group>
        </Card.Section>
      </Card>
      {(data.cik && data.cik != '?????????????') ? <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>Q&A</Title>
        </Card.Section>
        <Card.Section>
          <QAComponent companyData={data} wsUrl={`${import.meta.env.VITE_API_URL.replace('http://', 'ws://').replace('https://', 'wss://')}/companies/${data.cik}/chat`} />
        </Card.Section>
      </Card> :
      <Card withBorder shadow="md" padding="md">
      <Card.Section>
        <Title>Q&A</Title>
      </Card.Section>
      <Card.Section>
        <br></br>
        <Text>Q&A is currently not available for this company.</Text>
      </Card.Section>
    </Card>
      }
      {data.info && data.info.quote && <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>Price</Title>
        </Card.Section>
        <Card.Section>
          <QuoteViz stockData={data.info.quote} />
        </Card.Section>
      </Card>}
      <Card withBorder shadow="md" padding="md">
          <Card.Section>
            <Title>Recent News</Title>
          </Card.Section>
          <Card.Section>
            {data.info && data.info.news && data.info.news.length === 0 ? (
              <Text>No recent news found.</Text>
            ) : (
              <List>
                {data.info.news.map((article: NewsItem, index) => (
                  <List.Item key={`${index}-${article.id}`}>
                    <Anchor href={article.url}>{article.headline}</Anchor>
                  </List.Item>
                ))}
              </List>
            )}
          </Card.Section>
        </Card>

        <Card withBorder shadow="md" padding="md">
          <Card.Section>
            <Title>Comps</Title>
          </Card.Section>
          <Card.Section>
            {data.info && data.info.peers && data.info.peers.length === 0 ? (
              <Text>No close peers found.</Text>
            ) : (<>{data.info.peers.map((peer:string) => <Anchor m={10} href={`https://finance.yahoo.com/quote/${peer}`}>{peer}</Anchor> )}</>)}
          </Card.Section>
        </Card>

      <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>Key Financial Metrics</Title>
        </Card.Section>
        <Card.Section>
          {!data.details ? (
            <Text>No details found.</Text>
          ) : (<FinancialStats detailsData={data.details} />)}
        </Card.Section>
      </Card>
    {/* </LoadingOverlay> */}
      </Masonry>
            </ResponsiveMasonry>
            : (<Container><Loading /></Container>)}
      </Container>
  );
};

export default Dashboard;
