import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export function AuthContextProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}