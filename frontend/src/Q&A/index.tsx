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
  TextInput,
  Anchor,
  Accordion,
  Container,
  useMantineTheme,
} from '@mantine/core';
import Company from '../types/Company';

const QAComponent: React.FC<{ companyData: Company }> = ({companyData}) => {

    const [questionText, setQuestionText] = useState<String>('');

    const { ticker, info, risk, details } = companyData;

    const theme = useMantineTheme();

  return (
    <Container>
    <Group spacing="md">
        <TextInput
            label="Ask a due diligence question!"
            value={questionText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuestionText(event.currentTarget.value)}
            styles={{
                backgroundColor: theme.colors.gray[0],
                borderRadius: theme.radius.md,
            }}
        />
    </Group>
      
    </Container>
  );
};

export default QAComponent;
