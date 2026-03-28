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
    handleImage,
  } = useUserForm();
  return (
    <div>
      <div>
        <h1>My Profile</h1>
        <ul>
          <li>
            {data?.avatar == null ? (
              <p
                className="cursor-pointer"
                onClick={() => data?.id && toggleEdit(data.id)}
              >
                Add Photo
              </p>
            ) : (
              <img src={data?.avatar} alt={data?.avatar} />
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
              {errors.length > 0 && (
                <div className="font-bold text-red-500 text-center">
                  {errors.map((msg: string, index: number) => (
                    <p key={index}> {msg}</p>
                  ))}
                </div>
              )}
              <input
                type="file"
                placeholder="add photo"
                onChange={handleImage}
              />
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
