import type { AuthLayoutProps } from "../../types/types";

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-surface">
      <div className="w-full lg:w-1/2 bg-primary flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/logo.png')] bg-center bg-no-repeat opacity-5 scale-150" />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="EasyCart"
            className="h-24 lg:h-32 mb-8 invert brightness-0"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4 tracking-tight">
            Welcome to EasyCart
          </h1>
          <p className="text-secondary/60 text-lg max-w-md font-medium">
            Discover the most elegant shopping experience with our curated
            collections.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold text-primary">{title}</h2>
            <p className="text-muted font-medium">{subtitle}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl card-shadow border border-gray-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
