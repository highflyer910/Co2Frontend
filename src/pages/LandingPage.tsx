// LandingPage.tsx
import React from "react";
// import { useNavigate } from "react-router-dom";
import TelegramLoginButton from "../elements/TelegramLoginButton";
import Header from "../components/Header";

const LandingPage: React.FC = () => {
  // const navigate = useNavigate();

  // if (jwt) {
  //   console.log("User is authenticated, redirecting to dashboard");
  //   navigate("/groups");
  // }

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <img
        src={`/background.webp`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      <Header />

      {/* Main content */}
      <main
        className="relative flex flex-col items-center justify-center py-16 md:pt-0 pt-0"
        role="main"
      >
        <h1 className="font-poppins text-3xl font-bold text-center bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          Welcome to GoGreen
        </h1>

        <p className="font-body text-2xl text-shadow text-bold text-green-950 mb-6 mt-4 text-center">
          Start making a difference today!
        </p>

        <TelegramLoginButton />
      </main>
    </div>
  );
};

export default LandingPage;
