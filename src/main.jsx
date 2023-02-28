import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Home from "./routes/home";
import User from "./routes/user";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Protected from "./Components/Protected";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  const signin = () => {
    setIsSignedIn(true);
    console.log("sisassa");
  };
  const signout = () => {
    setIsSignedIn(false);
    console.log("ulkona");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root signin={signin} signout={signout} isSignedIn={isSignedIn}/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "home/",
          element: <Home />,
        },
        {
          path: "user/",
          element: (
            <Protected isSignedIn={isSignedIn}>
              <User />
            </Protected>
          ),
        },
        {
          path: "login/",
          element: <Login/>,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<App />
);
