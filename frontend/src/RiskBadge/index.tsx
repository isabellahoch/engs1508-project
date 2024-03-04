import React, { useEffect, useState, forwardRef } from 'react';
import {
  Badge
} from '@mantine/core';

const RiskBadge = forwardRef<HTMLDivElement>((props, ref) => {

    const { riskLevel } = props;

    return <Badge ref={ref} {...props} color={riskLevel == 4 ? 'red' : riskLevel == 3 ? 'orange' : 'green'}>{riskLevel}</Badge> as JSX.Element;
})

export default RiskBadge;