import { Response } from "@/types/api";

export const isErrorResponse = (data: any): data is Response.Error => {
    return typeof data.message === "string";
};

export const defaultErrorMessage = "OOps! Something went wrong.";
