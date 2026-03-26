import { useUserForm } from "../../hooks/user/useUserForm";
import Button from "../ui/Button";

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
    cancelButton,
  } = useUserForm();
  return (
    <div>
      <div>
        <h1>My Profile</h1>
        <ul>
          <li> Username: {data?.username}</li>
          <li>Email: {data?.email}</li>
          <li>Phone: {data?.phone ?? "Add Phone Number"}</li>
          <li>City: {data?.city ?? "Add City"} </li>
          <li>Addres: {data?.address ?? "Add Address"}</li>
          <Button
            onClick={() => data?.id && toggleEdit(data.id)}
            name="Edit Profile"
          />
          {showEdit ? (
            <form onSubmit={updateProfile}>
              {errors.length > 0 && (
                <div className="font-bold text-red-500 text-center">
                  {errors.map((msg: string, index: number) => (
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

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex mt-5 "
                  name={isPending ? "...Update Profile" : "Update Profile"}
                />
                <Button
                  onClick={cancelButton}
                  className="flex mt-5  bg-red-700"
                  name="Cancel"
                />
              </div>
            </form>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
