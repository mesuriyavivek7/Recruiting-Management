import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import logo from './logo.svg';
import Admin from './Pages/Dashboard/Admin';
import EnterpriceTable from './Pages/EnterPriceTable';
import AdminDashboard from './Components/AdminDashboard';

import RecruitingAgencyData from './Pages/RecruitingAgency/RecruitingAgencyData';


function App() {

  const AppRouter = createBrowserRouter(
    [
      
      {
        path:"/",
        element: <Admin/>,
        children: [
          {
            index: true, 
            element: <AdminDashboard />,
          },
          {
            path: "/admin/dashboard",
            element: <AdminDashboard/>,
           },
          {
            path: "/admin/enterprise",
            element: <EnterpriceTable/>,
          },
          {
            path: "/admin/recruiting-agency",
            element: <RecruitingAgencyData/>,
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
