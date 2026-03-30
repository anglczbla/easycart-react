import type { AuthLayoutProps } from "../../types/types";

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex justify-between w-full h-screen">
      <div className="w-full bg-emerald-800 flex items-center justify-center ">
        <div className="bg-[url('/logo.png')] bg-contain bg-no-repeat bg-center w-full h-full"></div>
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="w-full p-10">
          <div className="max-w-xl mx-auto text-center mb-5">
            <h4 className="font-bold text-lg text-primary">{title}</h4>
            <p className="font-medium text-md text-primary">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
