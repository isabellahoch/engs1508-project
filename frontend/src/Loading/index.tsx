import React from 'react';
import { Loader, Center } from '@mantine/core';

interface LoadingProps {
  description?: string;
}

const Loading: React.FC<LoadingProps> = ({ description = "Loading..." }) => {
  return (
    <Center style={{ height: '100%' }}>
      <Loader color="blue" size={200} />;
    </Center>
  );
};

export default Loading;
