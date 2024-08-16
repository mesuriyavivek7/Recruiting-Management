import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from './Pages/Dashboard/Admin';
import EnterpriceTable from './Pages/EnterPriceTable';
import AdminDashboard from './Components/AdminDashboard';





import Login from './Pages/Login/Login';
import RecruitingAgencyTable from './Pages/RecruitingAgencyTable';
import AccountManagerDashboard from './Components/AccountManagerDashboard';


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
          {
            path: "account-manager",
            element: <AccountManagerDashboard/>,
          },
        
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
