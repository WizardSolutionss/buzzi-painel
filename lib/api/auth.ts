import { api } from "../api";
import { LoginFormData, User } from "../../schemas/authSchema";

export const authApi = {
    login: (data: LoginFormData) => api.post("/auth/login", data),
    me: () => api.get<User>("/auth/me"),
    logout: () => api.post("/auth/logout", {}),
};
