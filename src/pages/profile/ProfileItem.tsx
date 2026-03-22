import type { User } from "../../hooks/user/useUser";

interface ProfileItemProps {
  data?: User;
}

const ProfileItem = ({ data }: ProfileItemProps) => {
  return (
    <div>
      <div>
        <h1>My Profile</h1>
        <ul>
          <li>{data?.username}</li>
          <li>{data?.email}</li>
          <li>{data?.phone}</li>
          <li>{data?.city}</li>
          <li>{data?.address}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileItem;
