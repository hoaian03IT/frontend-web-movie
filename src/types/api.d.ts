import { User } from "./user";

export namespace Request {
    interface Login {
        email: string;
        password: string;
    }
    interface Register extends Login {
        name: string;
    }
    interface VerifyOTP {
        otp: string;
        userId: string;
    }
}

export namespace Response {
    interface Error {
        message: string;
    }
    interface Login {
        message: string;
        token: string;
        userInfo: User;
    }
}
