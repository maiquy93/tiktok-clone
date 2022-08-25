import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();

  return (
    <div>
      <h1>Profile</h1>
      <span>Path is: {location.pathname}</span>
    </div>
  );
}

export default Profile;
