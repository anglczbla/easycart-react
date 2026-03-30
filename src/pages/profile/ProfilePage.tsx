import { useUserForm } from "../../hooks/user/useUserForm";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";

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
    handleImage,
  } = useUserForm();

  return (
    <div>
      <div>
        <h1 className="text-center font-bold">My Profile</h1>
        <div className="w-full bg-white rounded-lg shadow-lg p-2 mt-2">
          <ul className="flex flex-col gap-2 justify-center items-center">
            <li>
              {data?.avatar == null ? (
                <p
                  className="cursor-pointer"
                  onClick={() => data?.id && toggleEdit(data.id)}
                >
                  No Photo
                </p>
              ) : (
                <img
                  src={data?.avatar}
                  alt={data?.avatar}
                  className="rounded-full"
                />
              )}
            </li>
            <li> Username: {data?.username}</li>
            <li>Email: {data?.email}</li>
            <li>
              Phone:{" "}
              {data?.phone ?? (
                <p
                  className="cursor-pointer"
                  onClick={() => data?.id && toggleEdit(data.id)}
                >
                  Add Phone Number
                </p>
              )}
            </li>
            <li>
              City:{" "}
              {data?.city ?? (
                <p
                  className="cursor-pointer"
                  onClick={() => data?.id && toggleEdit(data.id)}
                >
                  Add City
                </p>
              )}{" "}
            </li>
            <li>
              Addres:{" "}
              {data?.address ?? (
                <p
                  className="cursor-pointer"
                  onClick={() => data?.id && toggleEdit(data.id)}
                >
                  Add Address
                </p>
              )}
            </li>
            <Button
              onClick={() => data?.id && toggleEdit(data.id)}
              name="Edit Profile"
            />
            {showEdit ? (
              <form onSubmit={updateProfile}>
                <input
                  type="file"
                  placeholder="add photo"
                  onChange={handleImage}
                />
                {errors && <ErrorMessage errors={errors.email} />}
                <input
                  type="text"
                  name="email"
                  value={formProfile.email}
                  onChange={handleFormProfile}
                  placeholder="input email"
                  className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
                />
                {errors && <ErrorMessage errors={errors.username} />}
                <input
                  type="text"
                  name="username"
                  value={formProfile.username}
                  onChange={handleFormProfile}
                  placeholder="input new username"
                  className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
                />
                {errors && <ErrorMessage errors={errors.phone} />}
                <input
                  type="number"
                  name="phone"
                  value={formProfile.phone}
                  onChange={handleFormProfile}
                  placeholder="input phone number"
                  className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
                />
                {errors && <ErrorMessage errors={errors.address} />}
                <input
                  type="text"
                  name="address"
                  value={formProfile.address}
                  onChange={handleFormProfile}
                  placeholder="input addres"
                  className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
                />
                {errors && <ErrorMessage errors={errors.city} />}
                <input
                  type="text"
                  name="city"
                  value={formProfile.city}
                  onChange={handleFormProfile}
                  placeholder="input city"
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
    </div>
  );
};

export default ProfilePage;
