import { useRegister } from "../hooks/useRegister";

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
    <div>
      {errors.length > 0 && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {errors.map((msg, index) => (
            <p key={index}> {msg}</p>
          ))}
        </div>
      )}

      <form onSubmit={submitRegister}>
        <input
          type="text"
          name="username"
          value={formRegist.username}
          onChange={handleRegist}
          placeholder="input a username"
        />
        <input
          type="email"
          name="email"
          value={formRegist.email}
          onChange={handleRegist}
          placeholder="input an email"
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formRegist.password}
          onChange={handleRegist}
          placeholder="input a password"
        />
        <button type="button" onClick={helperPassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <button type="submit" disabled={isPending}>
          {isPending ? "...Registering" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
