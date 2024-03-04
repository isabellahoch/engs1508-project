// SearchBar.tsx

import React, { useState, useEffect } from 'react';
import { Container, TextInput, useMantineTheme, Popover } from '@mantine/core';
import CompanyRecord from '../types';

interface SearchBarProps {
  companies: CompanyRecord[];
  onSelect: (company: CompanyRecord) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ companies, onSelect }: SearchBarProps) => {
  const [searchText, setSearchText] = useState<String>('');
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyRecord[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    const filterCompanies = () => {
      const lowerSearchText = searchText.toLowerCase();
      setFilteredCompanies(
        companies.filter((company) => {
          const lowerName = company.name.toLowerCase();
          const lowerTicker = company.ticker.toLowerCase();
          return (
            lowerName.includes(lowerSearchText) ||
            lowerTicker.includes(lowerSearchText) ||
            company.cik.toString().includes(searchText)
          );
        })
      );
    };

    filterCompanies();
  }, [searchText, companies]);

  const handleInputChange = (value: string) => {
    setSearchText(value);
    setIsOpen(true);
  };

  const handleSelect = (company: CompanyRecord) => {
    onSelect(company);
    setSearchText(company.name);
    setIsOpen(false);
  };

  const content = (
    <Container style={{ padding: theme.spacing.md }}>
      {filteredCompanies.length > 0 ? (
        filteredCompanies.map((company, index) => (
          <Container key={`${index}-${company.ticker}`} onClick={() => handleSelect(company)}>
            {company.name} ({company.ticker})
          </Container>
        ))
      ) : (
        <>No matches found.</>
      )}
    </Container>
  );

  return (
    <Container style={{ position: 'relative' }}>
        <Popover width={850} position="bottom" withArrow shadow="md"
          placement="bottom"
          content={content} opened={isOpen} onChange={setIsOpen}
          >
        <Popover.Target>
      <TextInput
        label="Search by name, ticker, or CIK"
        value={searchText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event.currentTarget.value)}
        styles={{
          backgroundColor: theme.colors.gray[0],
          borderRadius: theme.radius.md,
        }}
      />
      </Popover.Target>
      <Popover.Dropdown
          placement="bottom"
        >
            {content}
        </Popover.Dropdown>
        </Popover>
    </Container>
  );
};

export default SearchBar;
