import * as Interfaces from '../interfaces/csasalesinfo.interface';
export class AnticipatedUseCodes implements Interfaces.AnticipatedUseCodes {
    anticipateD_USE_CD: number;
    usE_NAME: string;
};

export class ConditionAtsales implements Interfaces.ConditionAtsales {
    cD_ID: string;
    cD_LONG_NAME: string;
};

export class Comments implements Interfaces.Comments {
    comm_ID: number;
    comm_Text: string;
};

export class BrokerInvolved implements Interfaces.BrokerInvolved {
    id: number;
    text: string;
};

export class BuyerSellerRelationship implements Interfaces.BuyerSellerRelationship {
    id: number;
    text: string;
};


