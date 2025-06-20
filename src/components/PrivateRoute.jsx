import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return element;
  }
}
export default PrivateRoute;
