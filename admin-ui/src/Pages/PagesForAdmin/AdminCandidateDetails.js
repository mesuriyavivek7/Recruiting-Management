import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FaBriefcase, FaInfoCircle } from 'react-icons/fa'; 
import { Button, Divider, Grid, Typography } from '@mui/material';
import { FaBuilding } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { fetchCandidateAttachmentsById, fetchCandidateBasicDetailsById, fetchCandidateResumesById, fetchconsentProofByCId, fetchSQAnswersByCid } from '../../services/api';


function AdminCandidateDetails() {
  const location = useLocation();
  const candidate_id = location.state?.candidate_id;

  const [candidateDetails, setCandidateDetails] = useState(null);
  const [candidateAttachments, setCandidateAttachments] = useState(null);
  const [cId, setCId] = useState(null);
  const [candidateResumes, setCandidateResumes] = useState(null);
  const [candidateconsentProof, setCandidateconsentProof] = useState(null);
  const [candidateSQAnswers, setCandidateSQAnswers] = useState(null);
  const [value, setValue] = useState('one');

  const fetchCandidateDetails = async () => {
    const response = await fetchCandidateBasicDetailsById(candidate_id);
    setCandidateDetails(response?.basic_details);
    setCId(response?.basic_details?.candidate_id);
  }

  const fetchCandidateAttachments = async () => {
    const response = await fetchCandidateAttachmentsById(cId);
    setCandidateAttachments(response);
  }

  const fetchCandidateResumes = async () => {
    const response = await fetchCandidateResumesById(cId);
    setCandidateResumes(response);
  }

  const fetchconsentProof = async () => {
    const response = await fetchconsentProofByCId(cId);
    setCandidateconsentProof(response);
  }

  const fetchSQAnswers = async () => {
    const response = await fetchSQAnswersByCid(cId);
    setCandidateSQAnswers(response);
  }

  useEffect(() => {
    fetchCandidateDetails();
    fetchCandidateAttachments();
    fetchCandidateResumes();
    fetchconsentProof();
    fetchSQAnswers();
  }, [cId])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='bg-gray-100 h-auto' >
      <Box sx={{ width: '100%' }} className=" p-6 rounded-lg  font-sans">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="Job Details Tabs"
          sx={{
            '& .MuiTab-root': {
              color: 'gray-600',
              fontSize: '1rem',
              '&.Mui-selected': {
                color: '#315370',
                fontWeight: 'bold',
              },

            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#315370',
              height: '6px',
              borderRadius: '2px',
            },
          }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab value="one" label="Candidate Details" icon={<FaBriefcase className="text-lg" />} />
          <Tab value="two" label="Attachments" icon={<FaBuilding className="text-lg" />} />
          <Tab value="three" label="Screening Questions" icon={<FaInfoCircle className="text-lg" />} />
        </Tabs>
        <div className="mt-6">
          {value === 'one' && (
            <div>
              {/* Candidate Basic Details */}
              <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ fontSize: "24px", mb: 1 }}>
                    Candidate Basic Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Grid container spacing={4}>
                      {/* First Name */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>First Name:</strong> {candidateDetails?.first_name}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Last Name */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Last Name:</strong> {candidateDetails?.last_name}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Country */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Country: </strong> {candidateDetails?.country}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Current Location */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Current Location: </strong> {candidateDetails?.current_location}
                          </Typography>
                        </Box>
                      </Grid>


                    </Grid>
                  </Box>
                </Grid>
              </div>
              <Divider sx={{ mb: 2, pt: 2 }} />

              {/* Contact Details */}
              <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ fontSize: "24px", mb: 1 }}>
                    Contact Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: 2,
                      boxShadow: 3,
                    }}
                  >
                    {/* Primary Email addres */}
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Primary Email:</strong> {candidateDetails?.primary_email_id}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Additional Email Address */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Additional Email:</strong> {candidateDetails?.additional_email_id || "N/A"}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Primary Contact No */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Primary Contact No:</strong> {"+"}{candidateDetails?.primary_contact_number}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Additional Contact No */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Additional Contact No:</strong> {candidateDetails?.additional_contact_number || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>

                    </Grid>
                  </Box>
                </Grid>
              </div>

              <Divider sx={{ mb: 2, pt: 2 }} />

              {/* Employment Details */}
              <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ fontSize: "24px", mb: 1 }}>
                    Employment Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: 2,
                      boxShadow: 3,
                    }}
                  >
                    {/* Primary Email addres */}
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Current Company: </strong> {candidateDetails?.current_company}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Additional Email Address */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Current Designation: </strong> {candidateDetails?.current_designation}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Experience Contact No */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Experience: </strong> 4
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Relevent Experience */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Relavent Experience: </strong> {candidateDetails?.relevant_experience}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Current Annual Salary */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Current Annual Salary: </strong> {candidateDetails?.current_annual_salary} {"INR"}                          </Typography>
                        </Box>
                      </Grid>

                      {/* Expected Annual Salary */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Expected Annual Salary: </strong> {candidateDetails?.expected_annual_salary} {"INR"}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Notice Peroid */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Notice Period: </strong> {candidateDetails?.notice_period} {"Days"}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Salary Remarks */}
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Salary Remarks: </strong> {candidateDetails?.salary_remarks}
                          </Typography>
                        </Box>
                      </Grid>


                    </Grid>
                  </Box>
                </Grid>
              </div>

              <Divider sx={{ mb: 2, pt: 2 }} />

              {/* Education */}
              <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ fontSize: "24px" }}>
                    Education Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      padding: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Grid container spacing={4}>
                      {/* Education Qualification */}
                      <Grid item xs={12} sm={12}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Education Qualification:</strong> {candidateDetails?.education_qualification}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Candidate Summary  */}
                      <Grid item xs={12} sm={12}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body1">
                            <strong>Candidate Summary / Cover Note:</strong> {candidateDetails?.candidate_summary || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>

                    </Grid>
                  </Box>
                </Grid>

              </div>

            </div>
          )}



          {value === 'two' && (<>
            <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ fontSize: "24px", mb: 2 }}>
                  Attachments
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: 2,
                    boxShadow: 3,
                  }}
                >
                  <Box sx={{ padding: 3 }}>
                    {/* Candidate Resume */}
                    <Box
                      sx={{
                        marginBottom: 2,
                        padding: 2,
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        boxShadow: 2,
                        border: "1px solid #e0e0e0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                          Candidate Resume
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
                          Filename: {candidateResumes?.filename || "N/A"}
                        </Typography>
                      </Box>
                      {candidateResumes?.filepath ? (
                        <a
                          href={`${process.env.REACT_APP_APP_URL}/resumedocs/${candidateResumes.filepath.replace(
                            /^uploads\/resumedocs\//,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              marginTop: 1,
                              borderRadius: "8px",
                              padding: "8px 20px",
                              fontWeight: "bold",
                              backgroundColor: "#315370",
                              "&:hover": {
                                backgroundColor: "#0056b3",
                              },
                            }}
                          >
                            View
                          </Button>
                        </a>
                      ) : (
                        <Typography variant="body2" sx={{ color: "#999" }}>
                          No file available
                        </Typography>
                      )}
                    </Box>

                    {/* Candidate Evaluation Form */}
                    <Box
                      sx={{
                        marginBottom: 2,
                        padding: 2,
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        boxShadow: 2,
                        border: "1px solid #e0e0e0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                          Candidate Evaluation Form
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
                          Filename: {candidateAttachments?.evaluation_form.filename || "N/A"}
                        </Typography>
                      </Box>
                      {candidateAttachments?.evaluation_form.filepath ? (
                        <a
                          href={`${process.env.REACT_APP_APP_URL}/candidatedocs/${candidateAttachments?.evaluation_form.filepath.replace(
                            /^uploads\/candidatedocs\//,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              marginTop: 1,
                              borderRadius: "8px",
                              padding: "8px 20px",
                              fontWeight: "bold",
                              backgroundColor: "#315370",
                              "&:hover": {
                                backgroundColor: "#0056b3",
                              },
                            }}
                          >
                            View
                          </Button>
                        </a>
                      ) : (
                        <Typography variant="body2" sx={{ color: "#999" }}>
                          No file available
                        </Typography>
                      )}
                    </Box>

                    {/* Candidate Consent Proof */}
                    <Box
                      sx={{
                        marginBottom: 2,
                        padding: 2,
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        boxShadow: 2,
                        border: "1px solid #e0e0e0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                          Candidate Consent Proof
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
                          Filename : {candidateconsentProof.filename}
                        </Typography>
                      </Box>
                      {candidateAttachments?.evaluation_form.filepath ? (
                        <a
                          href={`${process.env.REACT_APP_APP_URL}/consetproof/${candidateconsentProof?.filepath.replace(
                            /^uploads\/consetproof\//,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              marginTop: 1,
                              borderRadius: "8px",
                              padding: "8px 20px",
                              fontWeight: "bold",
                              backgroundColor: "#315370",
                              "&:hover": {
                                backgroundColor: "#0056b3",
                              },
                            }}
                          >
                            View
                          </Button>
                        </a>
                      ) : (
                        <Typography variant="body2" sx={{ color: "#999" }}>
                          No file available
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </div>
          </>
          )}

          {value === 'three' && (
            <div container spacing={2} sx={{ pt: "15px", mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ fontSize: "24px", mb: 2 }}>
                  Screening Questions
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <div className="p-6 rounded-lg space-y-6 font-sans bg-white shadow-md">
                  {/* Dynamically render questions */}
                  <Grid container spacing={3}>
                    {candidateSQAnswers.screening_questions.map((question, index) => {
                      // Find the corresponding answer for the question
                      const answerObject = candidateSQAnswers.screening_answer.find(
                        (ans) => ans.id === question.id
                      );
                      const answer = answerObject?.answer || "N/A";

                      return (
                        <Grid item xs={12} key={question.id}>
                          <Box
                            sx={{
                              padding: "16px",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              backgroundColor: "#f9f9f9",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <Typography component="div" className="space-y-4">
                              {/* Question */}
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <h3 className="text-lg xl:text-xl font-semibold text-gray-700" style={{ marginRight: "8px" }}>
                                  Question {index + 1}:
                                </h3>
                                <p className="text-gray-600 xl:text-xl" style={{ margin: 0 }}>
                                  {question.question_title}
                                  {question.madantory && (
                                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                                  )}
                                </p>
                              </div>

                              {/* Answer */}
                              <p className="text-gray-800 font-medium text-lg" style={{ marginTop: "8px" }}>
                                <strong>Answer:</strong> {answer}
                              </p>
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </Grid>
            </div>
          )}
        </div>

      </Box >
    </div >
  );
}

export default AdminCandidateDetails;
