import { Outlet, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Root() {
    return (
      <>  
        <div id="navbar">
        <Navbar />
        </div>
        <div id="content"></div>
        <Outlet />
      </>
    );
  }