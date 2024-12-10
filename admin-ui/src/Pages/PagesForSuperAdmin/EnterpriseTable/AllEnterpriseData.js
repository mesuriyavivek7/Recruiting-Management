import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { columns } from "./RowColData";
import { fetchAccountManager, fetchEnterpriseById, getAllVerifiedEnterprisesSuperAdmin } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import Notification from "../../../Components/Notification";

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

export default function AllEnterpriseData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [loader, setLoader] = React.useState(false);
  const [notification, setNotification] = React.useState(null);

  const navigate = useNavigate();

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page changes
  };

  // Filter handler
  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  // Fetch enterprises and set rows
  const fetchAllEnterpriseData = async () => {
    setLoader(true);
    try {
      const enterpriseIds = await getAllVerifiedEnterprisesSuperAdmin();
      const response = await Promise.all(
        enterpriseIds.data.map(async (enterpriseId, index) => {
          const enterprise = await fetchEnterpriseById(enterpriseId);
          const account_manager = await fetchAccountManager(enterprise.allocated_account_manager);

          return {
            id: index + 1,
            _id: enterprise._id,
            full_name: enterprise.full_name || `User ${index + 1}`,
            email: enterprise.email || `user${index + 1}@example.com`,
            designation: enterprise.designation || "Not Provided",
            company_name: enterprise.company_name || "Unknown",
            country: enterprise.country || "Unknown",
            city: enterprise.city || "Unknown",
            email_verification: enterprise.isEmailVerified ? "yes" : "no",
            account_status: enterprise.account_status.status,
            account_manager: account_manager.full_name,
          };
        })
      );
      setRows(response);
    } catch (err) {
      console.error(err);
      showNotification("Something went wrong while fetching data", "failure");
    } finally {
      setLoader(false);
    }
  };

  // Filter and search logic
  React.useEffect(() => {
    const newFilteredRows = rows.filter((row) => {
      const matchesSearch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All" || row.account_status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(newFilteredRows);
  }, [rows, searchTerm, filterStatus]);

  React.useEffect(() => {
    fetchAllEnterpriseData();
  }, []);

  const handleRowClick = (params) => {
    const e_id = params.row._id;
    navigate(`/super_admin/enterprise/${params.id}`, { state: { enterpriseId: e_id } });
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "600px",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              padding: "0",
              "& input": {
                height: "30px",
                padding: "8px",
              },
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "#315370" },
              "&.Mui-focused fieldset": { borderColor: "#315370" },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FaSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" gap={0}>
          {["All", "Active", "Inactive"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "contained" : "outlined"}
              onClick={() => handleFilterClick(status)}
              sx={{
                backgroundColor: filterStatus === status ? "#315370" : "#e0e0e0",
                color: filterStatus === status ? "white" : "gray",
                fontSize: "16px",
                height: "45px",
                textTransform: "none",
                width: "120px",
                border: "1px solid gray",
                borderRadius:
                  status === "All" ? "20px 0 0 20px" :
                    status === "Inactive" ? "0 20px 20px 0" : "0",
                "&:hover": {
                  backgroundColor: filterStatus === status ? "#315380" : "#e0e0e0",
                },
              }}
            >
              {status}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          columns={columns}
          rowHeight={80}
          loading={loader}
          getRowHeight={calculateRowHeight}
          onRowClick={handleRowClick}
          pagination={false}
          pageSize={rowsPerPage}
          hideFooterPagination={true}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.09rem' },
            },
            ' [class^=MuiDataGrid]': { border: 'none' },
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold !impotant',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '0.7rem', lg: '1.1rem' },
              color: 'black',

              '&:focus': {
                outline: 'none',
                border: 'none',
              },
              backgroundColor: '#e3e6ea !important',
              minHeight: '60px',
            },
            '& .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'blue',
              visibility: 'visible',
            },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.7rem', lg: '1.1rem' },
              minHeight : '2.5rem',
            },

            '& .MuiDataGrid-cellContent': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiDataGrid-row': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },

          }}
        />
      </Box>

      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page"
      />
    </>
  );
}
