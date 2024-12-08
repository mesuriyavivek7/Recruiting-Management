import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { columns } from "./RowColData";
import { fetchEnterpriseById, getAllVerifiedEnterprisesSuperAdmin } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const calculateRowHeight = (params) => {
  const contentHeight = params.row ? params.row.content.length / 10 : 50;
  return Math.max(80, contentHeight);
};

export default function AllEnterpriseData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [loader, setLoader] = React.useState(false)

  const navigate = useNavigate();

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const fetchAllEnterpriseData = async () => {
    setLoader(true);
    try {
      const enterpriseIds = await getAllVerifiedEnterprisesSuperAdmin();

      const response = await Promise.all(
        enterpriseIds.data.map(async (enterpriseId, index) => {
          const enterprise = await fetchEnterpriseById(enterpriseId);

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
          };
        })
      );
      setRows(response);
    } catch (error) {
      console.error("Error fetching enterprise details: ", error);
    }
    finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    fetchAllEnterpriseData();
  }, []);

  const handleRowClick = async (params) => {
    const id = params.id;
    const e_id = params.row._id;
    console.log(params.row);
    try {
      navigate(`/super_admin/enterprise/${id}`, { state: { enterpriseId: e_id } })
    } catch (error) {
      console.error("Error fetching enterprise data:", error);
    }
  };


  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.id} // Specify the custom ID field
          rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
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
            "& .MuiDataGrid-root": {
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.7rem", lg: "1.09rem" },
            },
            " [class^=MuiDataGrid]": { border: "none" },
            "& .MuiDataGrid-columnHeader": {
              fontWeight: "bold !important",
              fontSize: { xs: "0.875rem", sm: "1rem", md: "0.7rem", lg: "1.1rem" },
              color: "black",
              "&:focus": {
                outline: "none",
                border: "none",
              },
              backgroundColor: "#e3e6ea !important",
              minHeight: "60px",
            },
            "& .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnSeparator": {
              color: "blue",
              visibility: "visible",
            },
            "& .MuiDataGrid-cell": {
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.7rem", lg: "1.1rem" },
            },
            "& .MuiDataGrid-cellContent": {
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
      <TablePagination
        component="div"
        count={rows.length} // Total number of rows
        page={page} // Current page number
        onPageChange={handleChangePage} // Handler for changing page
        rowsPerPage={rowsPerPage} // Rows per page number
        onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
        rowsPerPageOptions={[5, 10, 25]} // Rows per page options
        labelRowsPerPage="Rows per page" // Label
      />
    </>
  );
}
