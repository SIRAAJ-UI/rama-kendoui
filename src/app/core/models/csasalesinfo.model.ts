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

export class CISalesinfo implements Interfaces.CISalesinfo{
    ANTICIPATED_USE_CD: number;
    PROP_USE_DETL: string;
    PCT_OWNER_OCCUP: string;
    BROKER_INVOLVED_FL: string;
    BUY_SELL_REL_FL: string;
    BUY_SELL_REL_DESC: string;
    PUR_PREDATE_BY_OPT: string;
    PREDATE_CONT_DATE: Date;
    PUR_PRED_CONT_SALE: string;
    COND_AT_SALE_CD: string;
    BENCHMARK_RATE_CD: string;
    SUPRV_APPROVED_FL: string;
  }


