// Dashboard.tsx

import React, { useEffect, useState, forwardRef } from 'react';
import {
  Group,
  Text,
  Title,
  Divider,
  Card,
  List,
  Tooltip,
  Anchor,
  Accordion,
  Container,
} from '@mantine/core';
import RiskBadge from '../RiskBadge/index';
import Company from '../types/Company';
import NewsItem from '../types/NewsItem';
import FinancialStats from '../FinancialStats/index';
import QuoteViz from '../QuoteViz/index';
import QAComponent from '../Q&A/index';

const Dashboard: React.FC<{ companyData: Company }> = ({companyData}) => {

    const { ticker, info, risk, details } = companyData;

  if (!companyData) {
    return <Text>No data found for this company.</Text>;
  }

  console.log(companyData);

  return (
    <Container>
    <Group spacing="md">
      <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>{details.company_name}</Title>
        </Card.Section>
        <Card.Section>
          <Text>{details.business_description}</Text>
          <Divider my="md" />
          <Group>
            <Text>Financial Risk:</Text>
            <Tooltip label="True Value">
              <RiskBadge riskLevel={details.financial_risk_profile_numeric} />
            </Tooltip>
            <Tooltip label="Predicted Value">
              <RiskBadge riskLevel={risk.answer} />
            </Tooltip>
            <Accordion>
              <Accordion.Item key={'risk-reasoning'} value={'risk-reasoning'}>
                <Accordion.Control icon={'❔'}>{'Reasoning'}</Accordion.Control>
                <Accordion.Panel><Text>{risk.reasoning}</Text></Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Group>
        </Card.Section>
      </Card>
      <Group spacing="sm">
        <Card withBorder shadow="md" padding="md">
          <Card.Section>
            <Title>Recent News</Title>
          </Card.Section>
          <Card.Section>
            {info && info.news && info.news.length === 0 ? (
              <Text>No recent news found.</Text>
            ) : (
              <List>
              {/* {JSON.stringify(info.news)} */}
                {info.news.map((article: NewsItem) => (
                  <List.Item key={article.id}>
                    <Anchor href={article.url}>{article.headline}</Anchor>
                  </List.Item>
                ))}
              </List>
            )}
          </Card.Section>
        </Card>
        <Card withBorder shadow="md" padding="md">
          <Card.Section>
            <Title>Peers</Title>
          </Card.Section>
          <Card.Section>
            {info && info.peers && info.peers.length === 0 ? (
              <Text>No close peers found.</Text>
            ) : (<>{info.peers.map((peer:string) => <Anchor m={10} href={`https://finance.yahoo.com/quote/${peer}`}>{peer}</Anchor> )}</>)}
          </Card.Section>
        </Card>
      </Group>
      <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>Q&A</Title>
        </Card.Section>
        <Card.Section>
          <QAComponent companyData={companyData} />
        </Card.Section>
      </Card>
      <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>Key Financial Metrics</Title>
        </Card.Section>
        <Card.Section>
          {!details ? (
            <Text>No details found.</Text>
          ) : (<FinancialStats detailsData={details} />)}
        </Card.Section>
      </Card>
      {info && info.quote && <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>Price</Title>
        </Card.Section>
        <Card.Section>
          <QuoteViz stockData={info.quote} />
        </Card.Section>
      </Card>}
    </Group>
    </Container>
  );
};

export default Dashboard;
