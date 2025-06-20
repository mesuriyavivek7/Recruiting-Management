import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import components for login signup
import Login from "./pages/Login/Login";
import RecruitSignUp from "./pages/Signup/RecruitSignUp";
import EnterpriseSignup from "./pages/Signup/EnterpriseSignup";
import KYC from "./components/KYC";
import ChangePassword from "./pages/Login/ChangePassword";
import ResetPassword from "./pages/Login/ResetPassword";
//import components for enterprise dashboard
import Enterprisedashboard from "./pages/Dashboard/Enterprisedashboard";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import DemoVideosPage from "./components/DemoVideos";
import JobPostings from "./pages/jobs/JobPostings";
import BulkActions from "./components/BulkActions";
import Offers from "./pages/EnterpriseOffers/Offers";
import Support from "./pages/Support";
import Candidate from "./pages/Candidate/Candidate";
import EnterpriseTeam from "./pages/Enterpriseteam/EnterpriseTeam";
import AdminRoute from "./pages/Enterpriseteam/AdminRoute";
//import components for recruiter agency dashboard
import RecruitDashboard from "./pages/Dashboard/RecruitDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Jobs from "./pages/Jobs";
import UploadResume from "./pages/UploadResume";
import RecruiterTeam from "./pages/Recruiterteam/RecruiterTeam";
import RecruiterCandidate from "./pages/Recruitercandidate/RecruiterCandidate";
import RecruiterProfilePage from "./pages/RecruiterProfilePage";
import RecruiterDemoVideos from "./components/RecruiterDemoVideos";
import RecruiterSettings from "./pages/RecruiterSettings";
import RecruiterOffers from "./pages/RecruiterOffers/Offers";
import SearchCandidate from "./pages/database/SearchCandidate";
import AddCandidate from "./pages/database/AddCandidate";
import CandidateResult from "./components/database/CandidateResult";

const App = () => {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup/supplier",
      element: <RecruitSignUp />,
    },
    {
      path: "/signup/employer",
      element: <EnterpriseSignup />,
    },
    {
      path: "/signup/supplier/kyc",
      element: <KYC />,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword/>
    },
    {
      path: "/reset-password/:token/:usertype",
      element: <ChangePassword></ChangePassword>
    },
    {
      path: "/employer",
      element: <Enterprisedashboard />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "jobposting/landing/postjob",
          element: <PostJob />,
        },
        { 
          path: "jobposting/landing/postjob/:oldjobid",
          element: <PostJob />
        },
        {
          path: "jobposting/landing",
          element: <JobPostings/>,
        },
        {
          path: 'team',
          element: <AdminRoute>
                     <EnterpriseTeam></EnterpriseTeam>
                   </AdminRoute>
        },
        {
          path: "bulkactions",
          element: <BulkActions/>,
        },
        {
          path: "demovideos",
          element: <DemoVideosPage/>,
        },
        {
          path: "offers",
          element: <Offers/>,
        },
        {
          path: "support",
          element:<Support/>
        },
        {
          path: "candidate",
          element: <Candidate></Candidate>
        }
      ],
    },
    {
       path:'/recruiter',
       element:<RecruitDashboard></RecruitDashboard>,
       children:[
        { 
          path:'dashboard',
          element:<RecruiterDashboard/>
        },
        {
          path:'jobs',
          element:<Jobs/>
        },
        {
          path:'uploadresume',
          element:<UploadResume/>
        },
        {
          path:'team',
          element:<AdminRoute>
                    <RecruiterTeam></RecruiterTeam>
                 </AdminRoute>
        },
        {
          path:'candidate',
          element:<RecruiterCandidate></RecruiterCandidate>
        },
        {
          path:"searchcandidate",
          element:<SearchCandidate></SearchCandidate>
        },
        {
          path:'searchresult',
          element:<CandidateResult></CandidateResult>
        },
        {
          path:'addcandidate',
          element:<AddCandidate></AddCandidate>
        },
        {
          path:'srprofilepage',
          element:<RecruiterProfilePage></RecruiterProfilePage>
        },
        {
          path:'offers',
          element:<RecruiterOffers/>
        },
        {
          path:'demovideos',
          element:<RecruiterDemoVideos></RecruiterDemoVideos>
        },
        {
          path:'settings',
          element:<RecruiterSettings></RecruiterSettings>
        }
       ]
    }
  ]);
  return (
    <div className="App max-w-[100vw] max-h-screen">
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default App;
