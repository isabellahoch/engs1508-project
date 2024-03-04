import React, { useEffect, useState, forwardRef } from 'react';
import {
  Container, Text
} from '@mantine/core';
import Message from '../../types/Message';

const MessageBubble = ({ message }) => {

    const { sender, text } = message;

    const senderStyles = {
        user: {
          backgroundColor: "#1f8599",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "70%",
          marginLeft: "auto",
          marginBottom: "10px",
          marginLeft: "100px"
        },
        system: {
          backgroundColor: "#b6c8cc",
          color: "black",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "70%",
          marginRight: "auto",
          marginBottom: "10px",
          marginRight: "100px"
        },
      };

    return (<Container style={senderStyles[sender]}><Text size="md">{text}</Text></Container>);
}

export default MessageBubble;