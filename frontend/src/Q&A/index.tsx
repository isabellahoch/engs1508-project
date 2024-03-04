// Dashboard.tsx

import React, { useEffect, useState, useCallback } from 'react';
import {
  Group,
  Text,
  Title,
  Divider,
  Card,
  List,
  Tooltip,
  TextInput,
  Box,
  ActionIcon,
  Container,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Company from '../types/Company';
import Message from '../types/Message';
import MessageBubble from './MessageBubble';

const QAComponent: React.FC<{ companyData: Company }> = ({companyData}) => {

    const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/companies/CIK0000320193/chat');

    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const [messages, setMessages] = useState<Message[]>([]);

    const [questionText, setQuestionText] = useState<String>('');

    const { ticker, info, risk, details } = companyData;

    const theme = useMantineTheme();

    useEffect(() => {
        if (lastMessage !== null) {
          setMessageHistory((prev) => prev.concat(lastMessage));

          setMessages([...messages, {sender: 'system', text: lastMessage.data}])
        }

        
      }, [lastMessage]);

    const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const appendMessage = (event) => {
        
        event.preventDefault();

        sendMessage(questionText);

        setMessages([...messages, {sender: 'user', text: questionText}]);

        setQuestionText('');
    }

  return (
    <Container>

        {(!messages || messages.length == 0) ? <Text>Ask a due diligence question!</Text> : (
            <Box>
                {messages.map((message, index) => <MessageBubble message={message} />)}
            </Box>
        )}

        <Group spacing="md">
            <TextInput
                value={questionText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuestionText(event.currentTarget.value)}
                styles={{
                    backgroundColor: theme.colors.gray[0],
                    borderRadius: theme.radius.md,
                    width: "80%",
                    minWidth: "200px"
                }}
                disabled={readyState !== ReadyState.OPEN}
            />
            <ActionIcon variant="filled" aria-label="Send" onClick={appendMessage} disabled={readyState !== ReadyState.OPEN}>
                <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
        </Group>
        
    </Container>
  );
};

export default QAComponent;
