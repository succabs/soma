import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Greetings from "./greetings";

export default function Root(props) {
  const userId = props.userId;
    if (props.isSignedIn) {
        return (
            <>  
              <Navbar signout={props.signout} signin={props.signin} isSignedIn={props.isSignedIn}userId={props.userId}/>   
              <Outlet context={{ userId }} />
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