import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function DataTable({ data = [], columns, handleEdit, handleDelete }) {
  const initialColumns = [
    /*{
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },*/
    {
      field: 'action',
      headerName: 'Action',
      width: 90,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton onClick={() => handleEdit(cellValues)}>
              <Edit style={{ color: 'white' }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(cellValues)}>
              <Delete style={{ color: 'white' }} />
            </IconButton>
          </>
        );
      }
    },
  ];
  columns = columns.concat(initialColumns)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        style={{ color: 'white' }}
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}