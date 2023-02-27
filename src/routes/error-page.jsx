import { useRouteError } from "react-router-dom";
import {Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Error message:
        <i> {error.statusText || error.message}</i>
      </p>
      <p>Click <Link to={`/home`}>here</Link> to go back to front page.</p>

    </div>
  );
}