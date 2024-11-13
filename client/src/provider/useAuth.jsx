import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("the data is not get")
    }
    return authContext;
}