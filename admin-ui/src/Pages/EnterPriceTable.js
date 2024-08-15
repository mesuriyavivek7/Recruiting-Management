
import React, { useState } from 'react';
import { Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  paginationButton: {
    borderRadius: '50%',
    minWidth: '32px',
    height: '32px',
    margin: '0 4px',
    backgroundColor: '#315370',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1e354e',
    },
  },
}));

const EnterpriceTable = () => {
  const classes = useStyles();

  const products = [
    {
      _id: '1',
      full_name: "zigo",
      email: "xyz@gmail.com",
      mobile_no: 67656456447,
      company_name: "heryo",
      designation: "software development",
      company_size: 30,
      country: "India",
      state: "Gujrat",
      city: "Gandhinagar",
      email_verification: "yes",
    },
  ];

  const repeatedProducts = Array(20).fill(null).map((_, index) => ({
    ...products[0],
    _id: String(index + 1),
  }));

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedRows = repeatedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const totalPages = Math.ceil(repeatedProducts.length / rowsPerPage);
  const maxPagesToShow = 5;
  const startPage = Math.max(0, Math.min(page - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow);

  return (
    <div className='p-5'>
      <div className='flex gap-7'>
        <Button
          className='bg-blue-230'
          id="demo-customized-button"
          aria-haspopup="true"
          variant="contained"
          style={{ backgroundColor: '#315370', color: 'white', fontSize: '16px' }}
        >
          All
        </Button>
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          disableElevation
          style={{ backgroundColor: '#315370', color: 'white', fontSize: '16px' }}
        >
          New
        </Button>
      </div>

      <Card className='mt-7'>
        <CardHeader title="All Enterprise" style={{ fontSize: '40px', fontWeight: 'bold' }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">Email</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">Mobile No.</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">Designation</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">Company Name</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">Company Size</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">Country</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">State</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">City</TableCell>
                <TableCell sx={{ fontSize: '22px', fontWeight: 'bold' }} align="left">Email verification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item._id}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.full_name}</TableCell>
                  <TableCell align='left' component="th" scope="row" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.email}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.mobile_no}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.designation}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.company_name}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.company_size}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.country}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.state}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.city}</TableCell>
                  <TableCell align="left" sx={{ fontSize: '20px', textAlign: 'center' }}>{item.email_verification}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <div className='flex justify-center align-middle pt-8'>
        <TablePagination
      
          classes={{
            root: classes.pagination,
            displayedRows: classes.paginationButton,
          }}
          component="div"
          count={repeatedProducts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={5}  // Fixed rows per page
          // Hide dropdown and associated labels
          sx={{
            '.MuiTablePagination-actions button': {
              borderRadius: '50%',
              minWidth: '38px',
              height: '38px',
              margin: '0 4px',
              backgroundColor: '#315370',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1e354e',
              },
            },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-label, .MuiInputBase-root': {
              display: 'none',  // This hides the dropdown and label
            },
          }}
          ActionsComponent={() => (
            <div className="flex items-center justify-center">
              <button
                onClick={() => handleChangePage(null, page - 1)}
                className={`mx-1 px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-black text-xl`}
                disabled={page === 0}
              >
                &lt;
              </button>
              {Array.from({ length: endPage - startPage }, (_, index) => startPage + index).map((pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handleChangePage(null, pageIndex)}
                  className={`mx-1 px-3 py-2 rounded-full ${page === pageIndex ? 'bg-blue-230' : 'bg-gray-300 hover:bg-gray-400'} text-black text-xl`}
                >
                  {pageIndex + 1}
                </button>
              ))}
              <button
                onClick={() => handleChangePage(null, page + 1)}
                className={`mx-1 px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-black text-xl`}
                disabled={page >= totalPages - 1}
              >
                &gt;
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default EnterpriceTable;
