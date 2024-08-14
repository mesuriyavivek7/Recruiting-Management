import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import logo from './logo.svg';
import Admin from './Pages/Dashboard/Admin';


function App() {

  const AppRouter = createBrowserRouter(
    [
      
      {
        path:"/",
        element: <Admin/>,
        // children: [
        //   {
        //     path: "dashboard",
        //     element: <Dashboard />,
        //    },
          // {
          //   path: "settings",
          //   element: <Settings />,
          // },
          // {
          //   path: "postjob",
          //   element:<PostJob/>
          // }
      //  ],
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
