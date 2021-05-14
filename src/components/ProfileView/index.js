import "./styles.scss";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

import RegisterForm from "../RegisterForm";
import CardUser from "../CardUser";

const ProfileView = () => {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div>
      {isUpdating ? (
        <RegisterForm user={user} setIsUpdating={setIsUpdating} />
      ) : (
        <CardUser user={user} setIsUpdating={setIsUpdating} />
      )}
    </div>
  );
};

export default ProfileView;
