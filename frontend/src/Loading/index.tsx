import React from 'react';
import { CircularProgress, Text, Center } from '@mantine/core';

interface LoadingProps {
  description?: string;
}

const Loading: React.FC<LoadingProps> = ({ description = "Loading..." }) => {
  return (
    <Center style={{ height: '100%' }}>
      <CircularProgress size="md" />
      <Text mt="md">{description}</Text>
    </Center>
  );
};

export default Loading;
