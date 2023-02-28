import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "./home";

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
            <div className="frontPageGreetings">
            <h1>Welcome to Soma</h1>
            <h2>The only Social Media App you will ever need!</h2>
            <p>Please log in with the button to use the site with its full functionality.</p>
          
          <Outlet />     
          </div>   
      </>
    );
  }