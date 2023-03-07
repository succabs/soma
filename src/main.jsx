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
import { users } from "./assets/users";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userId, setUserId] = useState(null);
  
  const signin = (userId) => {
    setIsSignedIn(true);
    setUserId(userId);
     // Fetch user data from the JSON file
  };
  
  const signout = () => {
    setIsSignedIn(false);
    setUserId(null);
  };



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root signin={signin} signout={signout} isSignedIn={isSignedIn} userId={userId}/>,
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
