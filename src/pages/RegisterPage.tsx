import { useRegister } from "../hooks/auth/useRegister";

const RegisterPage = () => {
  const {
    formRegist,
    submitRegister,
    handleRegist,
    isPending,
    helperPassword,
    showPassword,
    errors,
  } = useRegister();

  return (
    <div className="w-full p-10">
      <div className="max-w-xl mx-auto text-center mb-16">
        <h4 className="font-bold text-lg text-sky-400">Register</h4>
        <p className="font-medium text-md text-sky-300">Create Your Account</p>
      </div>

      <form
        onSubmit={submitRegister}
        className="flex flex-wrap flex-col justify-center items-center gap-5 border border-sky-400 rounded-xl p-5 lg:w-2/3 lg:mx-auto"
      >
        {errors.length > 0 && (
          <div className="font-bold text-red-500 text-center">
            {errors.map((msg, index) => (
              <p key={index}> {msg}</p>
            ))}
          </div>
        )}
        <input
          type="text"
          name="username"
          value={formRegist.username}
          onChange={handleRegist}
          placeholder="input a username"
          className="w-full border border-sky-400 p-2 rounded-lg focus:outline-none focus:ring-sky-500 focus:ring-1 focus:border-sky-500"
        />
        <input
          type="email"
          name="email"
          value={formRegist.email}
          onChange={handleRegist}
          placeholder="input an email"
          className="w-full border border-sky-400 p-2 rounded-lg focus:outline-none focus:ring-sky-500 focus:ring-1 focus:border-sky-500"
        />
        <div className="flex w-full gap-2 items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formRegist.password}
            onChange={handleRegist}
            placeholder="input a password"
            className="w-full border border-sky-400 p-2 rounded-lg focus:outline-none focus:ring-sky-500 focus:ring-1 focus:border-sky-500"
          />

          <button
            type="button"
            onClick={helperPassword}
            className="text-base font-semibold text-sky-500 bg-sky-300 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full text-base font-semibold text-sky-500 bg-sky-300 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
        >
          {isPending ? "...Registering" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
