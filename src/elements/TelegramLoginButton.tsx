import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; // Import crypto-js for encryption in the frontend
import Cookies from "js-cookie"; // Import Cookies for handling cookies
import { useMain } from "../contexts/MainContext";

interface TelegramUser {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
}

const TelegramLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useMain();

  useEffect(() => {
    window.onTelegramAuth = async (user: TelegramUser) => {
      const secretKey = import.meta.env.VITE_APP_SECRET_KEY; // Replace with your secret key

      const dataString = `${user.auth_date}${user.first_name}${user.id}${user.username}${user.photo_url}`;
      const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey).toString();

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL_BE}/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Custom-Origin": "secretorginipasswordtomorrowdevfromfe",
          },
          body: JSON.stringify({ ...user, hash: encryptedData }),
        });

        const result = await response.json();

        if (result.status === "success") {
          const tokenJwt = result.token; // Assuming the JWT token is returned in the result

          Cookies.set("jwt-co2", tokenJwt, {
            secure: true,
            sameSite: "None",
          });

          dispatch({
            type: "SET_USER",
            payload: {
              userId: user.id + "",
              userName: user.first_name ?? undefined,
              userNick: user.username ?? undefined,
              jwt: tokenJwt,
            },
          });

          navigate("/pick-group"); // Navigate to the new PickGroupPage
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.setAttribute("data-telegram-login", "AnotherCoBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://co2backend.onrender.com");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    document.getElementById("telegram-login-button-container")?.appendChild(script);
  }, [dispatch, navigate]);

  return <div id="telegram-login-button-container"></div>;
};

export default TelegramLoginButton;
