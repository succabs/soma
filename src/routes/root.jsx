import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Greetings from "./greetings";

export default function Root(props) {
  const userId = props.userId;
  if (props.isSignedIn) {
    return (
      <>
        <Navbar
          signout={props.signout}
          signin={props.signin}
          isSignedIn={props.isSignedIn}
          userId={props.userId}
        />
        <div className="outlet">
          <Outlet context={{ userId }} />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
        signout={props.signout}
        signin={props.signin}
        isSignedIn={props.isSignedIn}
      />
      <div className="outlet">
        <Greetings />
      </div>
    </>
  );
}
