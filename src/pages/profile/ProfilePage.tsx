import { useUserForm } from "../../hooks/user/useUserForm";
import ProfileItem from "./ProfileItem";

const ProfilePage = () => {
  const {
    formProfile,
    handleFormProfile,
    updateProfile,
    showEdit,
    toggleEdit,
    data,
    errors,
    isPending,
  } = useUserForm();
  return (
    <div>
      <div className="max-w-xl mx-auto text-center mb-10">
        <h4 className="font-semibold text-lg text-primary">Form Profile</h4>
        <p className="font-medium text-md text-primary">Update Profile</p>

        <button onClick={() => data?.id && toggleEdit(data.id)}>
          Edit Profile
        </button>
        {showEdit ? (
          <form onSubmit={updateProfile}>
            {errors.length > 0 && (
              <div className="font-bold text-red-500 text-center">
                {errors.map((msg, index) => (
                  <p key={index}> {msg}</p>
                ))}
              </div>
            )}
            <input
              type="text"
              name="email"
              value={formProfile.email}
              onChange={handleFormProfile}
              placeholder="input email"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <input
              type="text"
              name="username"
              value={formProfile.username}
              onChange={handleFormProfile}
              placeholder="input new username"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
            />

            <input
              type="number"
              name="phone"
              value={formProfile.phone}
              onChange={handleFormProfile}
              placeholder="input phone number"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <input
              type="text"
              name="address"
              value={formProfile.address}
              onChange={handleFormProfile}
              placeholder="input addres"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <input
              type="text"
              name="city"
              value={formProfile.city}
              onChange={handleFormProfile}
              placeholder="input city"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <input
              type="text"
              name="avatar"
              value={formProfile.avatar}
              onChange={handleFormProfile}
              placeholder="input avatar"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />

            <button
              type="submit"
              className="flex text-base font-semibold text-white bg-primary mt-5 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
            >
              {isPending ? "...Update Profile" : "Update Profile"}
            </button>
          </form>
        ) : null}
      </div>
      <ProfileItem data={data} />
    </div>
  );
};

export default ProfilePage;
