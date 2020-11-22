const axios = require("axios");

const cache = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/inventory`);

        const inventory = Object.values(response.data.rgDescriptions).filter(( item ) => item.tradable === 1);

        await Promise.all(inventory.map( async ({ market_hash_name }, index ) => {
            try {
                const url = `http://localhost:${process.env.PORT ? process.env.PORT : 3000}/api/prices/${market_hash_name}&${index}`;
                const price = await axios.get(`${encodeURI(url)}`);
                console.log(price.data);
            } catch (error) {
                console.log("[Sklep] > Pobieranie ceny przerwane");
                throw error;
            }
        })).then(() => console.log("[Sklep] > Pobieranie cen zakończone"))
    } catch (error) {
        console.log("[Sklep] > Pobieranie ekwipunku przerwane");
        throw error;
    }
}

cache();