import React, { FC } from "react";
import { Gold, Accepted, Canceled, Pending } from "../../utils/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faClock, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
    Wrapper,
    Field
} from "./style";
import TradeStatus from "../../utils/status";

const getStatus = ( status: TradeStatus ): Status => {
    switch(status){
        case TradeStatus.Accepted: return { color: Accepted, icon: faCheck };
        case TradeStatus.Canceled: return { color: Canceled, icon: faTimes };
        case TradeStatus.Pending: return { color: Pending, icon: faClock };
    }
}

const HistoryCard: FC<HistoryCardProps> = ({ trade }) => {
    return(
        <Wrapper>
            <Field 
                fieldColor="black" 
                fieldBgColor={Gold}
                fieldWidth="15%"
                fieldRightBorder
            >
                {trade.tradeId}
            </Field>
            <Field 
                fieldRightBorder 
                fieldWidth="29%"
            >
                {trade.steamID}
            </Field>
            <Field fieldWidth="29%" fieldRightBorder>
                {trade.itemName}
            </Field>
            <Field 
                fieldWidth="17%"
                fieldColor={Canceled}
                fieldRightBorder
            >
                -${trade.price}$
            </Field>
            <Field 
                fieldBgColor={getStatus(trade.status).color}
                fieldWidth="10%"
            >
                <FontAwesomeIcon icon={getStatus(trade.status).icon}/>
            </Field>
        </Wrapper>
    );
}

type HistoryCardProps = {
    trade: any
}

type Status = {
    color: string, 
    icon: IconDefinition
}

export default HistoryCard;