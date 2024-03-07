// Dashboard.tsx

import React, { useEffect, useState, useCallback, MouseEventHandler } from 'react';
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

const QAComponent: React.FC<{ companyData: Company, wsUrl: string }> = ({companyData, wsUrl}) => {

    if(!companyData || !wsUrl) {
      return;
    }

    const ws = new WebSocket(wsUrl);

    const [socketOpen, setSocketOpen] = useState(false)

    // const [socketUrl, setSocketUrl] = useState(wsUrl);

    // console.log(`connecting to ${socketUrl} / ${wsUrl}`)

    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

    // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const [messages, setMessages] = useState<Message[]>([]);

    const [questionText, setQuestionText] = useState<string>('');

    console.log(ws.readyState);

    ws.onopen = (event) => {
      setSocketOpen(true);
      console.log('ws opened')
    };
  
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      console.log(json);
      // try {
      //   if ((json.event = "data")) {
      //     setBids(json.data.bids.slice(0, 5));
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    };

    const sendMessage = (text: string) => {
      ws.send(text)
    }

    // useEffect(() => {
    //   console.log(connectionStatus, readyState)

    //   if (readyState == 1) {
    //     console.log('connected!');
    //     sendMessage('What kinds of due diligence questions are you able to answer about the company?')
    //   }

    //   if (lastMessage !== null) {
    //     setMessageHistory((prev) => prev.concat(lastMessage));

    //     setMessages((prev) => prev.concat({sender: 'system', text: lastMessage.data}));

    //     messageHistory.map(msg => console.log(msg.data));

    //     // allMessages.push({sender: 'system', text: lastMessage.data});

    //     // console.log(`Received message: ${lastMessage.data}`);

    //     // setMessages([...messages, {sender: 'system', text: lastMessage.data}]);

    //     // setTimeout(() => setMessages(allMessages), 2500);
    //   }
        
    //   }, [lastMessage, readyState]);

    // const connectionStatus = {
    // [ReadyState.CONNECTING]: 'Connecting',
    // [ReadyState.OPEN]: 'Open',
    // [ReadyState.CLOSING]: 'Closing',
    // [ReadyState.CLOSED]: 'Closed',
    // [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[readyState];


    const appendMessage: MouseEventHandler<HTMLButtonElement> = (event) => {
        
        event.preventDefault();

        sendMessage(questionText);
        setMessages((prev) => prev.concat({sender: 'user', text: questionText}));

        // allMessages.push({sender: 'user', text: questionText});

        setQuestionText('');
    }

  return (
    <Container>

        {(!messages || messages.length == 0) ? <Text>Ask a due diligence question!</Text> : (
            <Box>
                {messages.map((message, index) => <MessageBubble key={`message-${index}`} message={message} />)}
            </Box>
        )}

        <Group>
            <TextInput
                value={questionText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuestionText(event.currentTarget.value)}
                // disabled={readyState !== ReadyState.OPEN}
                disabled={!socketOpen}
            />
            <ActionIcon variant="filled" aria-label="Send" onClick={appendMessage}
            // disabled={readyState !== ReadyState.OPEN}
            disabled={!socketOpen}
            >
                <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
        </Group>
        
    </Container>
  );
};

export default QAComponent;
