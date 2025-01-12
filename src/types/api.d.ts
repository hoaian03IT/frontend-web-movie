import { User } from "./user";

export namespace Request {
    interface Login {
        email: string;
        password: string;
    }
    interface Register extends Login {
        name: string;
    }
}

export namespace Response {
    interface Login {
        message: string;
        token: string;
        userInfo: User;
    }
    interface Error {
        message: string;
    }
}
