import Swal, { SweetAlertResult } from "sweetalert2";
import axios, { AxiosResponse } from "axios";
import useClientData from "./useClientData";
import { UserData } from "./useAuth";

const useBuy = ( data: UserData, price: number, itemName: string, itemId ) => {
    const [ cData, setCredits, setTradeUrl, updateClientData ] = useClientData(data);
    
    const buy = async (): Promise<void> => {
        if(!data){
            Swal.fire({
                title: "Zaloguj się",
                html: `Żeby zakupić ten przedmiot`,
                icon: "error",
                confirmButtonColor: '#d33',
                confirmButtonText: 'Ok',
            });

            return;
        }

        try {
            const clientData = await updateClientData();

            if(clientData.tradeUrl.includes(undefined)){
                Swal.fire({
                    title: "Aby kupić ten przedmiot",
                    html: `Dodaj <b>Trade Url</b> swojego konta!`,
                    icon: "error",
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                });

                return;
            }
        
            if(clientData.credits < price){
                Swal.fire({
                    title: "Nie masz wystarczająco kredytów",
                    html: `Żeby kupić przedmiot:<br/><b>${itemName}</b> za <b>${price} $</b>`,
                    icon: "error",
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                });

                return;
            }

            const result: SweetAlertResult<any> = await Swal.fire({
                title: "Jesteś pewien ?",
                html: `Że chcesz kupić przedmiot:<br/><b>${itemName}</b> za <b>${price} $</b>`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Tak!',
                cancelButtonText: 'Nie! Za drogie.'
            });

            if(result.isConfirmed){
                Swal.fire({
                    title: "Pomyślnie zakupiono",
                    html: `<b>${itemName}</b> za <b>${price} $</b><br>Wyczekuj oferty wymiany!</br>`,
                    icon: "success",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                })

                try {
                    const offer: AxiosResponse = await axios.get(`/api/trades/${data.steamId}&${itemId}&${price}`);
                } catch (error) {
                    Swal.fire({
                        title: "O nie!",
                        html: `Napotkaliśmy błąd przy zakupie :(<br/>Spróbuj ponownie później`,
                        icon: "error",
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'Ok :(',
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: "O nie!",
                html: `Napotkaliśmy błąd przy zakupie :(<br/>Spróbuj ponownie później`,
                icon: "error",
                confirmButtonColor: '#d33',
                confirmButtonText: 'Ok :(',
            });
        }
    }

    return buy;
}

export default useBuy