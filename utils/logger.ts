import axios from "axios";
import url from "./adress";

const logger = async( log: string ) => {
    try {
        await axios.post(
            `http://localhost:${process.env.PORT ? process.env.PORT : 3000}/api/logs/log`, 
            log,
        );
    } catch (error) {
        console.log(error);
    }
}

export default logger;