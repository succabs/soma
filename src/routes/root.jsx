import { Outlet, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Root() {
    return (
      <>  
      
        <Navbar />
        
        <div id="outlet">
        <Outlet />
        </div>
      </>
    );
  }