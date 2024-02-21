
import { AUTH_KEY } from "@/constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

export const instance = axios.create();

instance.defaults.headers.post['Content-Type'] = "application/json";
instance.defaults.headers['accept'] = "application/json";
instance.defaults.timeout = 60000;

//add a request interceptor
instance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(AUTH_KEY);
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)


// add a response interceptor
instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
        const resObj: ResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta
        }
        return resObj;
    },
    async function (error) {
        if (error?.response?.status === 403) {
        } else {
            const resObj: IGenericErrorResponse = {
                statusCode: error?.response?.statusCode || 500,
                message: error?.response?.message || `something went wrong!`,
                errorMessages: error?.response?.data?.message
            }
            return resObj;
        }
    }
)

