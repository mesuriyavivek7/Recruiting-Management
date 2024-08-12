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

const App = () =>{
  const AppRouter = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login />,
      },
      {
        path:"/signup/supplier",
        element: <RecruitSignUp/>
      },
      {
        path:"/signup/employer",
        element: <EnterpriseSignup/>
      },
      {
        path:"/signup/supplier/kyc",
        element: <KYC/>
      },
      {
        path:"/employer",
        element: <Enterprisedashboard/>,
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
            element:<PostJob/>
          }
        ],
      }

    ]
  );
  return (
    <div className="App max-w-[100vw] max-h-screen">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
