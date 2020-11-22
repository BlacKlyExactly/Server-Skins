import axios, { AxiosResponse } from "axios";

const logout = async () => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const response: AxiosResponse = await axios.get("/api/logout");
            resolve(response);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

export default logout;