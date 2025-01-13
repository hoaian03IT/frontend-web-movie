import { authInstance, instance } from "@/lib/axios-instances";
import { Request, Response } from "@/types/api";
import { AxiosInstance } from "axios";
import { handleErrorApi } from ".";

export class AuthService {
    private static instance: AxiosInstance = instance;
    private static authInstance: AxiosInstance = authInstance;

    static async login(payload: Request.Login) {
        try {
            const res = await this.instance.post<Response.Login>("/auth/login", payload);
            return res.data;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    static async register(payload: Request.Register) {
        try {
            const res = await this.instance.post<string>("/auth/register", payload);
            return res.data;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    static async registerOTPVerification(payload: Request.VerifyOTP) {
        try {
            const res = await this.instance.post<Response.Login>("/auth/registration-verify", payload);
            return res.data;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    static async resendRegisterOTPVerification(payload: Pick<Request.VerifyOTP, "userId">) {
        try {
            const res = await this.instance.post<string>("/auth/registration-resend-otp", payload);
            return res.data;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    static async refreshToken() {
        try {
            const res = await this.instance.get<Response.RefreshToken>("/auth/refresh-token");
            return res.data;
        } catch (error) {
            handleErrorApi(error);
        }
    }

    static async logOut() {
        try {
            const res = await this.authInstance.post<{ message: string }>("/auth/logout");
            return res.data;
        } catch (error) {
            console.log(error);
            handleErrorApi(error);
        }
    }
}
