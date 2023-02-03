import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Error from "./pages/Error/Error";

import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/profile/:username/saved",
        element: <Profile />,
      },
      {
        path: "/profile/:username/tagged",
        element: <Profile />,
      },
    ],
  },
  {
    path: "accounts/login",
    element: <Login />,
  },
  {
    path: "accounts/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
