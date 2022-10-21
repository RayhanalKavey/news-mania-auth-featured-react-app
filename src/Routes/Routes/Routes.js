import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Category from "../../Pages/Category/Category";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import News from "../../Pages/News/News";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5005/news"),
      },
      // {
      //   path: "/home",
      //   element: <Home></Home>,
      // },
      {
        path: "/category/:id",
        element: <Category></Category>,
        loader: ({ params }) =>
          fetch(`http://localhost:5005/category/${params.id}`),
      },
      {
        path: "/news/:id",
        element: (
          <PrivateRoute>
            {" "}
            <News></News>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5005/news/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
