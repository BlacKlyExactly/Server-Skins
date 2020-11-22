import axios from "axios";
import url from "./adress";

const logger = async( log: string ) => {
    try {
        await axios.post(
            `${url}/api/logs/log`, 
            log,
        );
    } catch (error) {
        console.log(error);
    }
}

export default logger;