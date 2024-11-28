

import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useLocation } from 'react-router-dom';
import { FaBullseye, FaThumbsUp, FaBan, FaStar, FaQuestionCircle, FaFilePdf, FaFileAlt, FaFileAudio, FaMapMarkerAlt, FaBriefcase, FaInfoCircle, FaPaperclip, FaUsers, FaDollarSign, FaClock, FaCalendarAlt } from 'react-icons/fa'; // React Icons
import { Card, Grid, Typography } from '@mui/material';
import { FaBuilding } from "react-icons/fa";
import { fetchCommissionDetailsByJobId, fetchJobAttachmentsByJobId, fetchJobBasicDetailsByJobId, fetchJobCompanyInfoByJobId, fetchJobSourcingByJobId, fetchSQByJobId } from '../../services/api';


function AdminJobDetails() {
  const [value, setValue] = useState('one');
  const [jobType] = useState('contract'); // fulltime or contract

  const location = useLocation();
  const job_id = location?.state?.job_id;
  const [jobDetails, setJobDetails] = useState(null);
  const [jobCompanyInfo, setJobCompanyInfo] = useState(null);
  const [jobSourcingDetails, setJobSourcingDetails] = useState(null);
  const [jobAttachments, setJobAttachments] = useState(null);
  const [screeningQuestions, setScreeningQuestion] = useState(null);
  const [commissionDetails, setJobCommission] = useState(null);

  const fetchJobDetails = async () => {
    try {
      const response = await fetchJobBasicDetailsByJobId(job_id);
      setJobDetails(response);
    } catch (error) {
      console.error("Error while fetching enterprise details : ", error);
    }
  }

  const fetchJobCompanyInfo = async () => {
    try {
      const response = await fetchJobCompanyInfoByJobId(job_id);
      setJobCompanyInfo(response);
    } catch (error) {
      console.error("Error while fetching job company info", error);
    }
  }

  const fetchJobSourcingDetails = async () => {
    try {
      const response = await fetchJobSourcingByJobId(job_id);
      setJobSourcingDetails(response);
    } catch (error) {
      console.error("Error while fetching the job sourcing details : ", error);
    }
  }
  const fetchJobAttachments = async () => {
    try {
      const response = await fetchJobAttachmentsByJobId(job_id);
      setJobAttachments(response);
    } catch (error) {
      console.error("Error while fetching the job sourcing details : ", error);
    }
  }

  const fetchJobScreeningQuestion = async () => {
    try {
      const response = await fetchSQByJobId(job_id);
      console.log(response.screening_questions);
      setScreeningQuestion(response?.screening_questions);
    } catch (error) {
      console.error("Error while getting the screeing questions : ", error);
    }
  }

  const fetchJobCommissionDetails = async () => {
    try {
      const response = await fetchCommissionDetailsByJobId(job_id);
      console.log(response);
      setJobCommission(response);
    } catch (error) {
      console.error("Error while getting job commision details : ", error);
    }
  }

  useEffect(() => {
    fetchJobDetails();
    fetchJobCompanyInfo();
    fetchJobSourcingDetails();
    fetchJobAttachments();
    fetchJobScreeningQuestion();
    fetchJobCommissionDetails();
  }, []);

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
          <Tab value="one" label="Job Details" icon={<FaBriefcase className="text-lg" />} />
          <Tab value="two" label="Company Details" icon={<FaBuilding className="text-lg" />} />

          <Tab
            value="three"
            label={
              <span className="whitespace-nowrap  text-ellipsis">
                Sourcing Guidelines & Attachments
              </span>
            }
            icon={<FaUsers className="text-lg" />}
          />

          <Tab value="four" label="Screening Questions" icon={<FaInfoCircle className="text-lg" />} />
        </Tabs>
        <div className="mt-6">
          {value === 'one' && (
            <Card
              className="mt-4 font-sans py-6"
              sx={{
                borderRadius: '8px',
                boxShadow: 3,
                backgroundColor: '#f0f0f0',
                padding: 3,
              }}
            >
              {/* Job Details Section */}
              <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="flex items-center mb-2 pb-2"
                >
                  <FaBriefcase className="mr-2 text-black" /> Job Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Job Id:</strong> {job_id}
                      </Typography>


                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Job Title:</strong>{jobDetails?.job_title}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={12}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <div>
                          <strong>Job Description:</strong>
                          <span dangerouslySetInnerHTML={{ __html: jobDetails?.job_description }} />
                        </div>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Country:</strong>{jobDetails?.country}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>City:</strong> {jobDetails?.city}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Job Domains:</strong> {jobDetails?.job_domain}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Open Positions:</strong> {jobDetails?.positions}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Experience:</strong> {jobDetails?.experience.minexp} - {jobDetails?.experience?.maxexp} years
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Is Remote Work:</strong> {jobDetails?.permanent_remote_work ? "Yes" : "No"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Job Commission Details */}
              <Box sx={{ mb: 2, pb: 2, borderBottom: 'none' }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="flex items-center mb-2 pb-2"
                >
                  <FaMapMarkerAlt className="mr-2 text-black" /> Job Commission Details
                </Typography>

                {/* Right Section */}
                <Grid container spacing={2} sx={{ pt: '12px' }} >
                  {jobType === 'fulltime' && (
                    <>
                      {/* Full-Time Remuneration Details */}
                      <Grid item xs={12} sm={12} sx={{ ml: '9px' }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                          paddingTop='8px'
                          gap={1}
                        >
                          <FaDollarSign className="text-black" />
                          Remuneration Details
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Annual Salary:</strong> $100,000 - $120,000
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Additional Salary Details:</strong> Performance bonuses included...
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>


                      <Grid item xs={12} sm={12}>

                        <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1} >
                          <FaInfoCircle className="text-black" />
                          Commission
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }} >
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1" sx={{ pl: 4 }}>
                                <strong>Commission Payout:</strong> 5% of annual salary
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1" sx={{ pl: 4 }}>
                                <strong>Payment Terms:</strong> Upon candidate joining
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1" sx={{ pl: 4 }}>
                                <strong>Replacement Clause:</strong> Applicable within 90 days
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {commissionDetails?.work_type === 'contract' && (
                    <>
                      {/* Contract Remuneration Details */}
                      <Grid item xs={12} sm={12} sx={{ ml: '6px' }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                          paddingTop="8px"
                          gap={1}
                        >
                          <FaClock className="text-black" />
                          Contract Remuneration Details
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }}>


                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Contract Duration:</strong> {commissionDetails?.work_details?.contract?.contract_duration_count} {commissionDetails?.work_details?.contract?.contract_duration_type === "weekly" ? "Week" : "Month"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Contract Pay:</strong> {commissionDetails?.work_details?.contract?.fix_contract_pay}  {commissionDetails?.work_details?.contract?.contract_pay_currency} {commissionDetails?.work_details?.contract?.contract_pay_rate_type}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Contract Pay Cycle:</strong> {commissionDetails?.work_details?.contract?.contract_pay_cycle}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Additional  Details:</strong> {commissionDetails?.work_details?.contract?.additional_contract_details}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          sx={{ mt: 2 }}
                        >
                          <FaCalendarAlt className="text-black" />
                          Commission
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Payment Terms:</strong> Upon candidate joining
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Replacement Clause:</strong> value
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {commissionDetails?.work_type === 'full_time' && (
                    <>
                      {/* Contract Remuneration Details */}
                      <Grid item xs={12} sm={12} sx={{ ml: '6px' }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                          paddingTop="8px"
                          gap={1}
                        >
                          <FaClock className="text-black" />
                          Contract Remuneration Details
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }}>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Salary : </strong>
                                {commissionDetails?.work_details?.full_time?.full_time_salary_type === "Fixed" ? (
                                  <>
                                    <span>{commissionDetails?.work_details?.full_time?.fixed_salary} {" "}</span>
                                    {commissionDetails?.work_details?.full_time?.full_time_salary_currency}
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      {commissionDetails?.work_details?.full_time?.min_salary} - {" "}
                                      {commissionDetails?.work_details?.full_time?.max_salary}
                                    </span>
                                    {" "}
                                    {commissionDetails?.work_details?.full_time?.full_time_salary_currency}
                                  </>
                                )}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Additional Details:</strong> {commissionDetails?.work_details?.full_time?.additional_salary_details}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          sx={{ mt: 2 }}
                        >
                          <FaCalendarAlt className="text-black" />
                          Commission
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Payment Terms:</strong> {commissionDetails?.commission_details?.payment_tearms}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Replacement Clause:</strong>  {commissionDetails?.commission_details?.replacement_clause}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box
                              sx={{
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                              }}
                            >
                              <Typography variant="body1">
                                <strong>Commission Pay : </strong>
                                {commissionDetails?.commission_details?.commission_type === "Fixed" ? (
                                  <>
                                    <span>{commissionDetails?.commission_details?.commission_fix_pay} </span>
                                  </>
                                ) : (
                                  <>
                                    <span>{commissionDetails?.commission_details?.commission_percentage_pay} {" "} {commissionDetails?.commission_details?.commission_type === "Percentage" ? "%" : ""}</span>
                                  </>
                                )}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Card>
          )}

          {value === 'two' && (<Card
            className="mt-4 font-sans py-6"
            sx={{
              borderRadius: '8px',
              boxShadow: 3,
              backgroundColor: '#f0f0f0',
              padding: 3,
            }}
          >
            <Box sx={{ mb: 2, pb: 0, borderBottom: 'none' }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                className="flex items-center mb-4"
                sx={{ borderBottom: 'none' }}
              >
                <FaBuilding className="text-black" /> Company Details
              </Typography>

              <Box sx={{ pt: '2px' }}>
                <Box
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography variant="body1">
                    <strong>Company Name:</strong> {jobCompanyInfo?.client_name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Typography variant="body1">
                    <div>
                      <strong>Company Description:</strong>
                      <span dangerouslySetInnerHTML={{ __html: jobCompanyInfo?.client_description }} />
                    </div>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
          )}

          {value === 'three' && (
            <Card
              className="mt-4 font-sans py-6"
              sx={{
                borderRadius: '8px',
                boxShadow: 3,
                backgroundColor: '#f0f0f0',
                padding: 3,
              }}
            >
              <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="flex items-center mb-2 pb-2"
                >
                  <FaStar className="mr-2 text-black" /> Must Haves
                </Typography>

                <Grid container spacing={2}>
                  {/* Skills Section */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Skills : </strong> {jobSourcingDetails?.must_haves}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 2, pb: 2, borderBottom: '4px solid white' }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="flex items-center mb-2 pb-2"
                >
                  <FaBan className=" mr-2 text-2xl xl:text-3xl text-black-600" />No Poach Clients
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography variant="body1">
                        <p className="mt-2 xl:text-lg">{jobSourcingDetails?.poach_clients}</p>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {jobSourcingDetails?.nice_to_haves && (
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {/* Nice to Haves Section */}
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        className="flex items-center mb-2"
                      >
                        <FaThumbsUp className="mr-2 text-2xl xl:text-3xl text-black" /> Nice
                        to Haves
                      </Typography>
                      <div className="pl-4">
                        <ul className="list-disc pl-5 mt-2 space-y-3">
                          <li className="xl:text-lg">{jobSourcingDetails?.nice_to_haves}</li>
                        </ul>
                      </div>
                    </Box>
                  </Grid>
                  {/* Target Companies Section */}
                  {jobSourcingDetails?.target_companies && (
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          backgroundColor: '#fff',
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          className="flex items-center mb-2"
                        >
                          <FaBullseye className="mr-2 text-2xl xl:text-3xl text-black" />{" "}
                          Target Companies
                        </Typography>
                        <div className="pl-4">
                          <ul className="list-disc pl-5 mt-2 space-y-3">
                            <li className="xl:text-lg">{jobSourcingDetails?.target_companies}</li>
                          </ul>
                        </div>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}

              <Box sx={{ mb: 2, pb: 2, borderBottom: 'none' }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="flex items-center mb-2 pb-2"
                >
                  <FaPaperclip className="mr-2 text-2xl xl:text-3xl text-black" /> Attachments
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                      }}
                    >
                      {jobAttachments ? (
                        <ul className="list-none pl-0 mt-2 space-y-4">
                          {/* Audio Brief */}
                          {jobAttachments.audio_brief && (
                            <li className="flex items-center justify-between xl:text-lg">
                              <div className="flex items-center space-x-2">
                                <FaFileAudio className="text-blue-600" />
                                <span>Audio Brief</span>
                              </div>
                              <a
                                href={jobAttachments.audio_brief.filepath}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#1976d2',
                                  textDecoration: 'none',
                                  padding: '8px 12px',
                                  border: '1px solid #1976d2',
                                  borderRadius: '4px',
                                }}
                              >
                                View File
                              </a>
                            </li>
                          )}

                          {/* Evaluation Form */}
                          {jobAttachments.evaluation_form && (
                            <li className="flex items-center justify-between xl:text-lg">
                              <div className="flex items-center space-x-2">
                                <FaFilePdf className="text-red-600" />
                                <span>Evaluation Form</span>
                              </div>
                              <a
                                href={`/${jobAttachments.evaluation_form.filepath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#1976d2',
                                  textDecoration: 'none',
                                  padding: '8px 12px',
                                  border: '1px solid #1976d2',
                                  borderRadius: '4px',
                                }}
                              >
                                View File
                              </a>
                            </li>
                          )}

                          {/* Sample CV */}
                          {jobAttachments.sample_cv && (
                            <li className="flex items-center justify-between xl:text-lg">
                              <div className="flex items-center space-x-2">
                                <FaFilePdf className="text-red-600" />
                                <span>Sample CV</span>
                              </div>
                              <a
                                href={`/${jobAttachments.sample_cv.filepath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#1976d2',
                                  textDecoration: 'none',
                                  padding: '8px 12px',
                                  border: '1px solid #1976d2',
                                  borderRadius: '4px',
                                }}
                              >
                                View File
                              </a>
                            </li>
                          )}

                          {/* Other Documents */}
                          {jobAttachments.other_docs && (
                            <li className="flex items-center justify-between xl:text-lg">
                              <div className="flex items-center space-x-2">
                                <FaFileAlt className="text-gray-600" />
                                <span>Other Documents</span>
                              </div>
                              <a
                                href={`/${jobAttachments.other_docs.filepath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: '#1976d2',
                                  textDecoration: 'none',
                                  padding: '8px 12px',
                                  border: '1px solid #1976d2',
                                  borderRadius: '4px',
                                }}
                              >
                                View File
                              </a>
                            </li>
                          )}
                        </ul>
                      ) : (
                        <Typography>No attachments available.</Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          )}

          {value === 'four' && (
            <div className="p-5 rounded-lg space-y-1 font-sans bg-gray-110">
              <h2 className="flex items-center gap-4 text-xl xl:text-2xl font-semibold text-gray-800">
                <FaQuestionCircle className="text-black" />
                Screening Questions
              </h2>

              {screeningQuestions.length === 0 ? (
                <Typography className="text-lg text-gray-500">No screening questions available.</Typography>
              ) : (
                <Grid container spacing={2} sx={{ pt: '2px' }}>
                  {screeningQuestions.map((question, index) => (
                    <Grid item xs={12} sm={12} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          backgroundColor: '#fff',
                        }}
                      >
                        <Typography variant="body1">
                          <div className="space-y-3">
                            <h3 className="text-lg xl:text-xl font-semibold text-gray-700">
                              {question.madantory ? (
                                <span className="text-red-500">*</span>
                              ) : null}
                              {` ${index + 1}. ${question.question_title} ?`}
                            </h3>

                            {/* Answer Type Handling */}
                            {(question.ans_type === 'single_select' ||
                              question.ans_type === 'multi_select') && (
                                <div className="mt-2 flex gap-4 items-center">
                                  {question.answer.option.map((option, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <span className="ml-4 font-semibold text-gray-700 xl:text-lg">
                                        {String.fromCharCode(65 + idx)}. {/* A, B, C, D */}
                                      </span>
                                      <span className="text-gray-700 xl:text-lg">{option}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}

export default AdminJobDetails;
