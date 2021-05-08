import withAuth from "../../hoc/withAuth";
import ProfileView from "../../components/ProfileView";

const UserProfile = () => {

  return (
      <ProfileView />
  );
};

export default withAuth(UserProfile);
