import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import JobDetails from './Pages/PagesForAccountManager/JobDetails';
import AccountCandidateTable from './Pages/PagesForAccountManager/AccountCandidateTable';
import CandidateDetails from './Pages/PagesForAccountManager/CandidateDetails';



function App() {

  const AppRouter = createBrowserRouter(
    [
      {
        path:"/",
        element:<Login></Login>
      },
      {
        path:"/admin",
        element: <Admin/>,
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
        
        
       ],
      },
      {
        path:"/account-manager",
        element: <AccountManager/>,
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
            element: <JobDetails/>,
          },
          {
            path: "candidate/:id",
            element: <CandidateDetails/>,
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
