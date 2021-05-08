import "./styles.scss";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

import RegisterForm from "../RegisterForm";
import CardUser from "../CardUser";

const ProfileView = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div>
      {isUpdating 
        ? <RegisterForm user={currentUser} setUser={setCurrentUser} setIsUpdating={setIsUpdating} />
        : <CardUser user={currentUser} setIsUpdating={setIsUpdating} />
      } 
    </div>
  );
};

export default ProfileView;
