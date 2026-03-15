import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const {
    formRegist,
    submitRegister,
    handleRegist,
    isPending,
    helperPassword,
    showPassword,
  } = useRegister();
  return (
    <div>
      <form onSubmit={submitRegister}>
        <input
          type="text"
          name="username"
          value={formRegist.username}
          onChange={handleRegist}
          placeholder="input an username"
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
          placeholder="input an password"
        />
        <button onClick={helperPassword}>Show</button>
        <button>{isPending ? "...Register" : "Register"}</button>
      </form>
    </div>
  );
};

export default RegisterPage;
