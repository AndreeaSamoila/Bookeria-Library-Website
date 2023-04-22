import {useContext, createContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);