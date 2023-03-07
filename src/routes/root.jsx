import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Greetings from "./greetings";

export default function Root(props) {
    if (props.isSignedIn) {
        return (
            <>  
              <Navbar signout={props.signout} signin={props.signin} isSignedIn={props.isSignedIn}/>   
              <Outlet />
            </>
          );
        }
      
    return (
      <>  
        <Navbar signout={props.signout} signin={props.signin} isSignedIn={props.isSignedIn}/>  
        <Greetings />   
           
      </>
    );
  }