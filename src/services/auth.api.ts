import { instance } from "@/lib/axios-instances";
import { Request, Response } from "@/types/api";
import { AxiosError, AxiosInstance } from "axios";
import { defaultErrorMessage, isErrorResponse } from ".";

export class AuthService {
    private static instance: AxiosInstance = instance;

    static async login(payload: Request.Login) {
        try {
            const res = await this.instance.post<Response.Login>("/auth/login", payload);
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError && isErrorResponse(error.response?.data)) {
                throw new Error(error.response.data.message || defaultErrorMessage);
            }
            throw new Error(defaultErrorMessage);
        }
    }
}
