import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const {
    formLogin,
    submitLogin,
    handleLogin,
    isPending,
    helperPassword,
    showPassword,
    errors,
  } = useLogin();
  return (
    <div>
      {errors.length > 0 && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {errors.map((msg, index) => (
            <p key={index}> {msg}</p>
          ))}
        </div>
      )}

      <form onSubmit={submitLogin}>
        <input
          type="email"
          name="email"
          value={formLogin.email}
          onChange={handleLogin}
          placeholder="input an email"
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formLogin.password}
          onChange={handleLogin}
          placeholder="input a password"
        />
        <button type="button" onClick={helperPassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <button type="submit" disabled={isPending}>
          {isPending ? "...Login" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
