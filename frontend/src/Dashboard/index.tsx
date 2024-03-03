// Dashboard.tsx

import React, { useEffect, useState } from 'react';
import {
  Group,
  Text,
  Title,
  Divider,
  Card,
  ListItem,
  Badge,
  Container,
} from '@mantine/core';
import Company from '../types';
import NewsArticle from '../types/NewsArticle';

const Dashboard: React.FC<{ companyData: Company }> = ({ companyData }: Company) => {

    const { name, summary, risk, news } = companyData;

  if (!companyData) {
    return <Text>No data found for this company.</Text>;
  }

  return (
    <Container>
    <Group spacing="md">
      <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>{name}</Title>
        </Card.Section>
        <Card.Section>
          <Text>{summary}</Text>
          <Divider my="md" />
          <Group>
            <Text>Financial Risk:</Text>
            <Badge color={risk === 'High' ? 'red' : risk === 'Medium' ? 'orange' : 'green'}>{risk}</Badge>
          </Group>
        </Card.Section>
      </Card>
      <Card withBorder shadow="md" padding="md">
        <Card.Section>
          <Title>Recent News</Title>
        </Card.Section>
        <Card.Section>
          {news.length === 0 ? (
            <Text>No recent news found.</Text>
          ) : (
            <>
              {news.map((article: NewsArticle) => (
                <ListItem key={article.headline}>{article.headline}</ListItem>
              ))}
            </>
          )}
        </Card.Section>
      </Card>
    </Group>
    </Container>
  );
};

export default Dashboard;
