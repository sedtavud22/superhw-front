import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        let token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const res = await axios.get("http://localhost:8888/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    run();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
