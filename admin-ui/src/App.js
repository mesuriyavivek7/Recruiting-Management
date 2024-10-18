import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Admin from './Pages/Dashboard/Admin';
import EnterpriceTable from './Pages/PagesForAdmin/EnterPriceTable';
import AdminDashboard from './Components/AdminDashboard';





import Login from './Pages/Login/Login';
import RecruitingAgencyTable from './Pages/PagesForAdmin/RecruitingAgencyTable';
import AccountManagerDashboard from './Components/AccountManagerDashboard';
import AccountManager from './Pages/Dashboard/AccountManager';
import AccountRecruitingAgencyTable from './Pages/PagesForAccountManager/AccountRecruitingAgencyTable';
import AccountEnterpriceTable from './Pages/PagesForAccountManager/AccountEnterPriceTable';
import AccountJobTable from './Pages/PagesForAccountManager/AccountJobTable';

import AccountCandidateTable from './Pages/PagesForAccountManager/AccountCandidateTable';
import CandidateDetails from './Pages/PagesForAccountManager/CandidateDetails';
import AdminJobTable from './Pages/PagesForAdmin/AdminJobTable';
import AdminCandidateTable from './Pages/PagesForAdmin/AdminCandidateTable';

import AdminCandidateDetails from './Pages/PagesForAdmin/AdminCandidateDetails';
import Job from './Pages/PagesForAccountManager/Job';
import AdminJob from './Pages/PagesForAdmin/AdminJob';
import AdminEnterprise from './Pages/PagesForAdmin/AdminEnterprise';
import SuperAdmin from './Pages/Dashboard/SuperAdmin';
import SupperAdminDashboard from './Components/SuperAdminDashboard';
import SuperEnterpriceTable from './Pages/PagesForSuperAdmin/SuperEnterPriceTable';
import SuperRecruitingAgencyTable from './Pages/PagesForSuperAdmin/SuperRecruitingAgencyTable';
import SuperJobTable from './Pages/PagesForSuperAdmin/SuperJobTable';
import SuperCandidateTable from './Pages/PagesForSuperAdmin/SuperCandidateTable';
import SuperCandidateDetails from './Pages/PagesForSuperAdmin/SuperCandidateDetails';
import SuperAdminJob from './Pages/PagesForSuperAdmin/SuperAdminJob';
import { useSelector } from 'react-redux';
import AdminRecruiting from './Pages/PagesForAdmin/RecruitingAgency/AdminRecruting';




function App() {
  const userData = useSelector((state) => state.admin?.userData);

  const AppRouter = createBrowserRouter(
    [
      {
        path:"/",
        // element:<Login></Login>
        element: !userData ? <Login /> : <Navigate to={`/${userData.admin_type}/dashboard`} />
      },
      {
        path:"/master_admin",
        // element: <Admin/>,
        element: userData?.admin_type === "master_admin" ? <Admin /> : <Navigate to="/" />,
        children: [
          {
            index: true, 
            element: <AdminDashboard />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard/>,
           },
          {
            path: "enterprise",
            element: <EnterpriceTable/>,
          },
          {
          
            path: "recruiting-agency",
            element: <RecruitingAgencyTable/>,
          },
          {
            path: "jobs",
            element: <AdminJobTable/>,
          },
          {
            path: "candidates",
            element: <AdminCandidateTable/>,
          },
          {
            path: "job/:id",
            element: <AdminJob/>,
          },
          {
            path: "candidate/:id",
            element: <AdminCandidateDetails/>,
          },
          {
            path: "enterprise/:id",
            element: <AdminEnterprise/>,
          },
          {
            path: "recruiting-agency/:id",
            element: <AdminRecruiting/>,
          },
        
        
        
        
       ],
      },
      {
        path:"/account_manager",
        // element: <AccountManager/>,
        element: userData?.admin_type === "account_manager" ? <AccountManager /> : <Navigate to="/" />,
        children: [
          {
            index: true, 
            element: <AccountManagerDashboard/>,
          },
          {
            path: "dashboard",
            element: <AccountManagerDashboard/>,
           },
          {
            path: "enterprise",
            element: <AccountEnterpriceTable/>,
          },
          {
            path: "recruiting-agency",
            element: <AccountRecruitingAgencyTable/>,
          },
          {
            path: "jobs",
            element: <AccountJobTable/>,
          },
          {
            path: "candidates",
            element: <AccountCandidateTable/>,
          },
          {
            path: "job/:id",
            element: <Job/>,
          },
          {
            path: "candidate/:id",
            element: <CandidateDetails/>,
          },
         
        
       ],
      },
      {
        path:"/super_admin",
        // element: <SuperAdmin/>,
        element: userData?.admin_type === "super_admin" ? <SuperAdmin /> : <Navigate to="/" />,
        children: [
          {
            index: true, 
            element: <SupperAdminDashboard/>,
          },
          {
            path: "dashboard",
            element: <SupperAdminDashboard/>,
           },
          {
            path: "enterprise",
            element: <SuperEnterpriceTable/>,
          },
          {
            path: "recruiting-agency",
            element: <SuperRecruitingAgencyTable/>,
          },
          {
            path: "jobs",
            element: <SuperJobTable/>,
          },
          {
            path: "candidates",
            element: <SuperCandidateTable/>,
          },
          {
            path: "job/:id",
            element: <SuperAdminJob/>,
          },
          {
            path: "candidate/:id",
            element: <SuperCandidateDetails/>,
          },
         
        
       ],
      },
     

    ]
  );
  return (
    <div className="App max-w-[100vw] max-h-screen">
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
