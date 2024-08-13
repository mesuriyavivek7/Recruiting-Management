import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import RecruitSignUp from "./pages/Signup/RecruitSignUp";
import EnterpriseSignup from "./pages/Signup/EnterpriseSignup";
import KYC from "./components/KYC";
import Enterprisedashboard from "./pages/Dashboard/Enterprisedashboard";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import PostJobForm2 from "./components/PostJobForms/postjobform2";
import PostJobForms3 from "./components/PostJobForms/PostJobForms3";
import PostJobForm4 from "./components/PostJobForms/PostJobForm4";

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
          path: "postjob",
          element: <PostJob />,
        },
        {
          path: "jobform2",
          element: <PostJobForm2/>,
        },
        {
          path: "jobform3",
          element: <PostJobForms3/>,
        },
        {
          path: "jobform4",
          element: <PostJobForm4/>,
        },
      ],
    },
  ]);
  return (
    <div className="App max-w-[100vw] max-h-screen">
      <RouterProvider router={AppRouter} />
    </div>
  );
};

export default App;
