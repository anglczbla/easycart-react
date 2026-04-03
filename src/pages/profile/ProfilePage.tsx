import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useUserForm } from "../../hooks/user/useUserForm";

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
      <h1 className="text-center font-bold p-5">My Profile</h1>
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        <div className="w-full flex justify-center items-center  p-6 mt-2">
          <div>
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
                className="rounded-full w-45 h-35 object-cover object-center"
              />
            )}
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-2">
          <h1 className="font-bold text-primary">Personal Information</h1>
          <div className="lg:flex gap-10 ">
            <p className="font-thin">
              Name <br /> <span className="text-primary">{data?.username}</span>
            </p>
            <p className="font-thin">
              Email <br />
              <span className="text-primary">
                {data?.email ?? (
                  <p
                    className="cursor-pointer"
                    onClick={() => data?.id && toggleEdit(data.id)}
                  >
                    Add Email
                  </p>
                )}
              </span>
            </p>
            <p>
              Phone:
              <br />
              {data?.phone ?? (
                <p
                  className="cursor-pointer"
                  onClick={() => data?.id && toggleEdit(data.id)}
                >
                  Add Phone Number
                </p>
              )}
            </p>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-lg p-6 6mt-2">
          <h1 className="font-bold text-primary">Address</h1>
          <p>
            {data?.address} - {data?.city}
          </p>
        </div>

        <Button
          onClick={() => data?.id && toggleEdit(data.id)}
          name="Edit Profile"
          className="mt-5"
        />

        {showEdit ? (
          <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-2">
            <form onSubmit={updateProfile}>
              <input
                type="file"
                placeholder="add photo"
                onChange={handleImage}
              />
              <Input
                type="text"
                name="email"
                value={formProfile.email}
                onChange={handleFormProfile}
                placeholder="input email"
                errors={errors.email}
              />

              <Input
                type="text"
                name="username"
                value={formProfile.username}
                onChange={handleFormProfile}
                placeholder="input new username"
                errors={errors.username}
              />

              <Input
                type="tel"
                name="phone"
                value={formProfile.phone}
                onChange={handleFormProfile}
                placeholder="input phone number"
                errors={errors.phone}
              />

              <Input
                type="text"
                name="address"
                value={formProfile.address}
                onChange={handleFormProfile}
                placeholder="input addres"
                errors={errors.addresss}
              />

              <Input
                type="text"
                name="city"
                value={formProfile.city}
                onChange={handleFormProfile}
                placeholder="input city"
                errors={errors.city}
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
