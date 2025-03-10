import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { validateUser } from './State/Admin/Action';
import { useEffect } from 'react';

import Loading from './Components/Loading';

import Admin from './Pages/Dashboard/Admin';
import AdminDashboard from './Components/AdminDashboard';
import EnterpriceTable from './Pages/PagesForAdmin/EnterPriceTable';
import RecruitingAgencyTable from './Pages/PagesForAdmin/RecruitingAgencyTable';
import AdminJobTable from './Pages/PagesForAdmin/AdminJobTable';
import AdminCandidateTable from './Pages/PagesForAdmin/AdminCandidateTable';
import AdminJob from './Pages/PagesForAdmin/AdminJob';
import AdminCandidateDetails from './Pages/PagesForAdmin/AdminCandidateDetails';
import AdminEnterprise from './Pages/PagesForAdmin/AdminEnterprise';
import AdminRecruiting from './Pages/PagesForAdmin/RecruitingAgency/AdminRecruting';
import Login from './Pages/Login/Login';

import AccountManager from './Pages/Dashboard/AccountManager';
import AccountManagerDashboard from './Components/AccountManagerDashboard';
import AccountEnterpriceTable from './Pages/PagesForAccountManager/AccountEnterPriceTable';
import AccountRecruitingAgencyTable from './Pages/PagesForAccountManager/AccountRecruitingAgencyTable';
import AccountJobTable from './Pages/PagesForAccountManager/AccountJobTable';
import AccountCandidateTable from './Pages/PagesForAccountManager/AccountCandidateTable';
import Job from './Pages/PagesForAccountManager/Job';
import CandidateDetails from './Pages/PagesForAccountManager/CandidateDetails';
import AcRecruiting from './Pages/PagesForAccountManager/RecruitingAgency/AcRecruting';
import PostJob from './Pages/PagesForAccountManager/PostJob';
import AcmanagerJobs from './Pages/PagesForAccountManager/AcmanagerJobs';
import AcJob from './Pages/PagesForAccountManager/previewjob/AcJob';

import SuperAdmin from './Pages/Dashboard/SuperAdmin';
import SupperAdminDashboard from './Components/SuperAdminDashboard';
import SuperEnterpriceTable from './Pages/PagesForSuperAdmin/SuperEnterPriceTable';
import SuperRecruitingAgencyTable from './Pages/PagesForSuperAdmin/SuperRecruitingAgencyTable';
import SuperJobTable from './Pages/PagesForSuperAdmin/SuperJobTable';
import SuperCandidateTable from './Pages/PagesForSuperAdmin/SuperCandidateTable';
import SuperCandidateDetails from './Pages/PagesForSuperAdmin/SuperCandidateDetails';
import SuperAdminJob from './Pages/PagesForSuperAdmin/SuperAdminJob';
import AcEnterprise from './Pages/PagesForAccountManager/AcEnterprise';
import SuperRecruiting from './Pages/PagesForSuperAdmin/RecruitingAgency/SuperRecruiting';
import SuperEnterpriseDetails from './Pages/PagesForSuperAdmin/SuperEnterpriseDetails';
import Support from './Pages/PagesForSuperAdmin/Support';
import AccountManagerTable from './Pages/PagesForSuperAdmin/AccountManagerTable';


function App() {
  const {userData,loading} = useSelector((state) => state.admin);
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(validateUser())
  },[dispatch])

  if(loading) {
    return <Loading></Loading>
  }


  const AppRouter = createBrowserRouter(
    [
      {
        path: "/",
        element:
          !userData && !loading ? (
            <Login />
          ) : userData?.admin_type ? (
            <Navigate to={`/${userData.admin_type}/dashboard`} />
          ) : (
            <Loading />
          ),
      },
      {
        path: "/master_admin",
        element: userData?.admin_type === "master_admin" ? <Admin /> : <Navigate to="/" />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "enterprise",
            element: <EnterpriceTable />,
          },
          {
            path: "recruiting-agency",
            element: <RecruitingAgencyTable />,
          },
          {
            path: "jobs",
            element: <AdminJobTable />,
          },
          {
            path: "candidates",
            element: <AdminCandidateTable />,
          },
          {
            path: "job/:id",
            element: <AdminJob />,
          },
          {
            path: "candidate/:id",
            element: <AdminCandidateDetails />,
          },
          {
            path: "enterprise/:id",
            element: <AdminEnterprise />,
          },
          {
            path: "recruiting-agency/:id",
            element: <AdminRecruiting />,
          },
        ],
      },
      {
        path: "/account_manager",
        element: userData?.admin_type === "account_manager" ? <AccountManager /> : <Navigate to="/" />,
        children: [
          {
            index: true,
            element: <AccountManagerDashboard />,
          },
          {
            path: "dashboard",
            element: <AccountManagerDashboard />,
          },
          {
            path: "enterprise",
            element: <AccountEnterpriceTable />,
          },
          {
            path: "recruiting-agency",
            element: <AccountRecruitingAgencyTable />,
          },
          {
            path: "jobs",
            element: <AccountJobTable />,
          },
          {
            path: "enterprise/:id",
            element: <AcEnterprise />,
          },
          {
            path: "recruiting-agency/:id",
            element: <AcRecruiting />,
          },
          {
            path: "candidates",
            element: <AccountCandidateTable />,
          },
          {
            path: "jobs/:id",
            element: <Job />,
          },
          {
            path: "candidate/:id",
            element: <CandidateDetails />,
          },
          {
            path: 'myjobs',
            element: <AcmanagerJobs></AcmanagerJobs>
          },
          {
            path: "myjobs/postjob",
            element: <PostJob></PostJob>
          },
          {
            path: 'myjobs/:id',
            element: <AcJob></AcJob>
          }
        ],
      },
      {
        path: "/super_admin",
        element: userData?.admin_type === "super_admin" ? <SuperAdmin /> : <Navigate to="/" />,
        children: [
          {
            index: true,
            element: <SupperAdminDashboard />,
          },
          {
            path: "dashboard",
            element: <SupperAdminDashboard />,
          },
          {
            path: "enterprise",
            element: <SuperEnterpriceTable />,
          },
          {
            path: "recruiting-agency",
            element: <SuperRecruitingAgencyTable />,
          },
          {
            path: "jobs",
            element: <SuperJobTable />,
          },
          {
            path: "recruiting-agency/:id",
            element: <SuperRecruiting></SuperRecruiting>,
          },
          {
            path: "candidates",
            element: <SuperCandidateTable />,
          },
          {
            path: "ac_manager",
            element: <AccountManagerTable />
          },
          {
            path: "enterprise/:id",
            element: <SuperEnterpriseDetails />,
          },
          {
            path: "job/:id",
            element: <SuperAdminJob />,
          },
          {
            path: "candidate/:id",
            element: <SuperCandidateDetails />,
          },
          {
            path: "support",
            element: <Support></Support>
          }
        ],
      },
    ]
  );

  return (
    <div className="App max-w-[100vw] max-h-screen">
      {
        <RouterProvider router={AppRouter} />
      }
    </div>
  );
}

export default App;
