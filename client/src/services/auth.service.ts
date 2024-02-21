import { AUTH_KEY } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage"

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(AUTH_KEY, accessToken);
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(AUTH_KEY);
    if (authToken) {
        const decodedData = decodedToken(authToken);
        return decodedData;
    }
    return "";
}

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(AUTH_KEY);
    return !!authToken;
}

export const removeUserInfo = (key: string) => {
    return localStorage.removeItem(key);
}