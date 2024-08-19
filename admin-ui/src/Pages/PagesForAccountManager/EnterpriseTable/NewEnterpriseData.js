import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Card,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import axios from 'axios'
import { useSelector } from "react-redux";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const NewEnterpriseData = () => {
  const [open, setOpen] = useState(false);
  
  const [selectedManager, setSelectedManager] = useState("");

  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  const [newEnterprise,setNewEnterprise]=useState([])

  const fetchEnterpriseData=async ()=>{
      try{
         const allEnterprise=await axios.get(`${process.env.REACT_APP_API_APP_URL}/enterprise/adminpending`)
         setNewEnterprise(allEnterprise.data)
      }catch(err){
        
      }
  }
  
  useEffect(()=>{
    fetchEnterpriseData()
  },[])


  const products = [
    {
      _id: "1",
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
      createdAt:'22-01-2022',
      account_status:"Active",
      action:'Activate'
    },
  ];

  const repeatedProducts = Array(10)
    .fill(null)
    .map((_, index) => ({
      ...products[0],
      _id: String(index + 1),
    }));
    const [openpopup, setOpenpopup] = useState(false);
  const [reason, setReason] = useState("");
  const [notification,setNotification]=useState(null)
  const [inactivateLoad,setInactivateLoad]=useState(false)
  //for showing notification
  const showNotification=(message,type)=>{
     setNotification({message,type})
  }

    const [selectInactive,setSelectInactive]=useState(null)
  
  const handleInactivateButton =async (e,item) => {  
    e.stopPropagation();  
    if(item.account_status.status==="Active"){
      setSelectInactive(item)
      setOpenpopup(true);
    }else{
      try{
      // await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`,{id:item._id,status:item.account_status.status,reason,admin_id:myValue.userData._id})
       fetchEnterpriseData()
       showNotification("Successfully account status changed.","success")
      }catch(err){
         showNotification("Something went wrong in changeing account status..!","failure")
      }
    }
  };
  const handleCloseInactivateButton = () => {
    setSelectInactive(null)
    setOpenpopup(false);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (item) => {
    setSelectedRow(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManager("");
    setSelectedRow(null);
  };
  const handleSubmitButton =async  () => {
    console.log("Submit button clicked")
    // Handle the reason submission logic here
  
      //please change here admin id with my_value id
      try{
        setInactivateLoad(true)
        //await axios.post(`${process.env.REACT_APP_API_APP_URL}/enterprise/changestatus`,{id:selectInactive._id,status:selectInactive.account_status.status,reason,admin_id:myValue.userData._id})
        console.log("Status request get")
      // fetchEnterpriseData()
        setOpenpopup(false);
        showNotification("Successfully account status changed.","success")
      }catch(err){
        showNotification("Something went wrong in changeing account status..!","failure")
      }
      setInactivateLoad(false)
  };
  // Calculate the rows to display
  const paginatedRows = newEnterprise.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="">
      <Card className="mt-9 font-sans">
        <p className="text-lg xl:text-2xl">New Enterprise</p>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", xl: "20px" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", xl: "20px" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", xl: "20px" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  align="left"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", xl: "20px" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  Mobile No.
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", xl: "20px" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  Designation
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", xl: "20px" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  Company Name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", xl: "20px" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  Company Size
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: {
                      xs: "12px",
                      sm: "16px",
                      lg: "17px",
                      xl: "20px",
                    },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  Country
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: {
                      xs: "12px",
                      sm: "16px",
                      lg: "17px",
                      xl: "20px",
                    },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  State
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: {
                      xs: "12px",
                      sm: "16px",
                      lg: "17px",
                      xl: "20px",
                    },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  City
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: {
                      xs: "12px",
                      sm: "16px",
                      lg: "17px",
                      xl: "20px",
                    },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                  align="left"
                >
                  Email Verified
                </TableCell>

                <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Created At
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Account Status
  </TableCell>
  <TableCell sx={{ fontSize: { xs: '12px', sm: '16px', lg: '17px', xl: '20px' }, fontWeight: 'bold', whiteSpace: 'nowrap' }} align="left">
    Action
  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((item, index) => (
                <TableRow
                  key={item._id}
                  onClick={() => handleRowClick(item)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedRow === index ? "#f0f0f0" : "inherit",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <TableCell
                    align="left"
                    className=""
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                      cursor: "pointer",
                    }}
                  >
                    {item._id}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.full_name}
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.email}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.mobileno}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.designation}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.company_name}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.company_size}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.country}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.state}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "15px",
                        xl: "17px",
                      },
                    }}
                  >
                    {item.city}
                  </TableCell>

                  <TableCell align="left" sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: { xs: "12px", sm: "14px", xl: "17px" },
                        width: { xl: "90px", sm: "50px" },

                        backgroundColor:
                          item.email_verified === true ? "green" : "red",
                        color: "white",
                        "&:hover": {
                          backgroundColor:
                            item.email_verified === true
                              ? "darkgreen"
                              : "darkred",
                        },
                        textTransform: "none",
                      }}
                    >
                      {(item.email_verified)?("Yes"):("No")}
                    </Button>
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' } }}>
    {item.createdAt}
  </TableCell>
  <TableCell align="left"  sx={{ fontSize: { xs: '12px', sm: '14px', lg: '15px', xl: '17px' },textAlign: "center" }}>
    <h1 className={`px-2 py-2 rounded-2xl text-sm text-white ${(item.account_status.status==="Active")?("bg-green-500"):"bg-red-500"}`}>{item.account_status.status}</h1>
  </TableCell>
  
  
                  <TableCell align="left" sx={{ textAlign: "center" }}>
                    <Button  onClick={(e)=>handleInactivateButton(e,item)}
                      variant="contained"
                      sx={{
                        fontSize: { xs: "12px", sm: "16px", xl: "18px" },
                        width: { xl: "120px", sm: "120px" },

                        backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },
                        textTransform: "none",
                      }}
                    >
                      {(item.account_status.status==="Active")?("Inactivate"):("Activate")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openpopup} onClose={handleCloseInactivateButton}>
        <DialogTitle>Inactivate Enterprise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason why you want to inactivate this account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInactivateButton}  sx={{
                        fontSize: { xs: "12px", sm: "14px", xl: "17px" },
                        width: { xl: "80px", sm: "40px" },
                        color:'white',
                        backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },
                        textTransform: "none",
                      }}>
            Cancel
          </Button>
          <Button onClick={handleSubmitButton}  sx={{
                        fontSize: { xs: "12px", sm: "14px", xl: "17px" },
                        width: { xl: "100px", sm: "50px" },
                        //height:"30px",
                       color:'white',
                        backgroundColor:
                          "#315370",
                        "&:hover": {
                          backgroundColor:"gray"
                        },
                        textTransform: "none",
                    
                      }}>
               {inactivateLoad &&
                <span className="absolute inset-0 flex items-center justify-center">
                                          <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5.6-3.2a10 10 0 00-10.4 0L4 12z"></path>
                                          </svg>
                                     </span>
                                     }
                                     
                                     {!inactivateLoad && <span>Submit</span>}
          </Button>
        </DialogActions>
      </Dialog>
        
        {selectedRow && (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{ fontSize: { sm: "16px", xl: "20px" } }}
          >
            <DialogTitle
              sx={{
                fontSize: { sm: "20px", xl: "25px" },
                borderBottom: "2px solid black", // Add this line for the border
                paddingBottom: "8px",
              }}
            >
              Details for {selectedRow?.full_name}
            </DialogTitle>
            <DialogContent>
              <div className="space-y-6  space-x-2 pt-4 grid grid-cols-2">
                <p className="pt-6 pl-3">
                  <strong>Id:</strong> {selectedRow?._id}
                </p>
                <p>
                  <strong>Email:</strong> {selectedRow?.email}
                </p>
                <p>
                  <strong>Mobile No:</strong> {selectedRow?.mobile_no}
                </p>
                <p>
                  <strong>Company:</strong> {selectedRow?.company_name}
                </p>
                <p>
                  <strong>Designation:</strong> {selectedRow?.designation}
                </p>

                <p>
                  <strong>Company Size:</strong> {selectedRow?.company_size}
                </p>
                <p>
                  <strong>Country:</strong> {selectedRow?.country}
                </p>
                <p>
                  <strong>State:</strong> {selectedRow?.state}
                </p>
                <p>
                  <strong>City:</strong> {selectedRow?.city}
                </p>
                <p>
                  <strong>Email verification:</strong>{" "}
                  {selectedRow?.email_verification}
                </p>
           </div>
            </DialogContent>
            <DialogActions>
            <Button
            variant="contained"
           
            onClick={handleClose}
            sx={{ backgroundColor:  '#315370', color: 'white',
              '&:hover': {
                backgroundColor: 'gray',
              },
             }}
          >
            Approve
          </Button>
            </DialogActions>
          </Dialog>
        )}
      </Card>
      <TablePagination
        component="div"
        count={repeatedProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page"
      />
    </div>
  );
};

export default NewEnterpriseData;
