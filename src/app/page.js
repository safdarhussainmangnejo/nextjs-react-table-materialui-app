import React from 'react';
import TableComponent from '../components/TableComponent';
import { data, columns } from '../components/data';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <TableComponent columns={columns} data={data} />
    </Container>
  );
};

export default HomePage;
