import { Response } from "@/types/api";
import { isAxiosError } from "axios";

export const isErrorResponse = (data: any): data is Response.Error => {
    return typeof data.message === "string";
};

export const defaultErrorMessage = "OOps! Something went wrong.";

export const handleErrorApi = (error: any) => {
    if (isAxiosError(error) && isErrorResponse(error.response?.data)) {
        throw new Error(error.response.data.message || defaultErrorMessage);
    }
    throw new Error(defaultErrorMessage);
};
