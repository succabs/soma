import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Root(props) {
    return (
      <>  
        <Navbar signout={props.signout} signin={props.signin} isSignedIn={props.isSignedIn}/>      
        <Outlet />
        
      </>
    );
  }