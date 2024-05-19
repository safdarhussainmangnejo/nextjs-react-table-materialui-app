'use client'
import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  TextField,
  Paper,
  Container,
  Typography,
} from '@mui/material';

// Custom filter function for the 'name' column
function fuzzyTextFilterFn(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue !== undefined
      ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
      : true;
  });
}

// Define a default UI for filtering
const DefaultColumnFilter = () => null;

const TableComponent = ({ columns, data }) => {
  const [filterInput, setFilterInput] = useState('');

  const handleFilterChange = e => {
    const value = e.target.value || '';
    setFilter('name', value);
    setFilterInput(value);
  };

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes: {
        fuzzyText: fuzzyTextFilterFn,
      },
    },
    useFilters,
    useSortBy
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginTop: '3rem' }}>
        Nextjs App of Table with Sorting and Filtering
      </Typography>
      <TextField
        variant="outlined"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Search by name"
        style={{ marginBottom: '1rem'}}
      />
      <TableContainer component={Paper} style={{ marginBottom: '1rem'}}>
        <Table {...getTableProps()}>
          
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{ backgroundColor: 'grey', color: 'white' }}
                  >
                    {column.render('Header')}
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                      sx={{ color: 'white' }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableComponent;
