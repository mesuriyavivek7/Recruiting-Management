import "./index.css";
import Login from './components/Login';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RecruitSignUp from "./components/RecruitSignUp";

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
