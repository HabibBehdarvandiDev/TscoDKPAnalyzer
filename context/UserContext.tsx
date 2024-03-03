"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedUser {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  actions: [];
  username: string;
  password: string;
}

interface UserContextType {
  authToken: string;
  setAuth: (token: string) => void;
  clearAuth: () => void;
  decodeAuthToken: () => DecodedUser | any; // Adjust this type as needed
}

const initialContextValue: UserContextType = {
  authToken: "",
  setAuth: () => {}, // Provide default implementation
  clearAuth: () => {}, // Provide default implementation
  decodeAuthToken: () => {}, // Provide default implementation
};

const UserContext = createContext<UserContextType>(initialContextValue);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState("");

  const setAuth = (token: string) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  const clearAuth = () => {
    setAuthToken("");
    localStorage.removeItem("authToken");
  };

  const decodeAuthToken = () => {
    try {
      return jwtDecode(authToken);
    } catch (error) {
      console.error("Error decoding authToken:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/login"); // Adjust the route as needed
    }
  }, [authToken, router]);

  return (
    <UserContext.Provider
      value={{ authToken, setAuth, clearAuth, decodeAuthToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
