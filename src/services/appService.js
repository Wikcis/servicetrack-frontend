import {bearer} from "../context";
import {getToken} from "../api/apiFunctions";

export const getMethod = async (url) => {
    try {
        const savedToken = await getToken();


        if (savedToken !== null) {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `${bearer} ${savedToken}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch object");
            }
            return await response.json();
        } else return null;
    } catch (error) {
        console.error('Error in getting:'+ error);
        throw error;
    }
}

export const deleteMethod = async (url) => {
    try {
        const savedToken = await getToken();

        if (savedToken !== null) {
            const response = await fetch(url, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Authorization: `${bearer} ${savedToken}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch object");
            }
            return await response.json();
        } else return null;

    } catch (error) {
        console.error('Error in deleting:'+ error);
        throw error;
    }
}

export const postMethod = async (url, requestBody) => {
    try {

        if (url.includes("login") || url.includes("registration")) {
            console.log("Post for login: %j", requestBody);

            const response = await fetch(url, {
                method: "POST",
                body: requestBody,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error("Failed to post object");
            }
            return await response.json();
        }

        const savedToken = await getToken();
        console.log("Post for NOT LOGIN: %j", requestBody);

        if (savedToken !== null) {
            const response = await fetch(url, {
                method: "POST",
                body: requestBody,
                credentials: "include",
                headers: {
                    Authorization: `${bearer} ${savedToken}`,
                    "Content-Type": "application/json",
                }
            });
            console.log("Post for login: %j", response);
            if (!response.ok) {
                throw new Error("Failed to post object with token");
            }
            return await response.json();
        } else return null;
    } catch (error) {
        console.error('Error in posting: '+ error);
        throw error;
    }
}


