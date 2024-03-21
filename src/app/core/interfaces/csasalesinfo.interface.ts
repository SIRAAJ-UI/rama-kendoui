export interface AnticipatedUseCodes {
    anticipateD_USE_CD: number;
    usE_NAME: string;
};

export interface ConditionAtsales {
    cD_ID: string;
    cD_LONG_NAME: string;
}

export interface Comments {
    seQ_NUM: number;
    commenT_TEXT: string;
}

export interface BrokerInvolved {
    SUPRV_APPROVED_FL: string;
    SUPRV_APPROVED_FL_TEXT: string;
}

export interface BuyerSellerRelationship {
    BUY_SELL_REL_FL: string;
    BUY_SELL_REL_FL_TEXT: string;
}

export interface BenchMarkData {
    id: number;
    text: string;
}

export interface CsaDocument {
    doc_prefix: any;
    buyer_name: string;
    seller_name: string;
    event_ts: Date;
    apn: string;
    usecode: number;
    use: string;
    address: string;
    apncount: string;
    indpurprice: number;
    adjsalesprice: number;
    transtaxprice: number;
}


export interface CISalesinfo {
    anticipateD_USE_CD: number;
    benchmarK_RATE_CD: number;
    brokeR_INVOLVED_FL: string;
    buY_SELL_REL_DESC: string;                        
    buY_SELL_REL_FL: string;
    conD_AT_SALE_CD: number;
    csA_ID: number;
    csA_PROP_USE_CD: number;
    csA_PROP_USE_DETL: string;
    csA_TYPE: number;
    doC_PREFIX: number;
    doC_SERIES: number;
    entrY_TS: Date;
    entrY_USER: string;
    entrY_WORKER: string;
    fulL_EXPENSES_FL: string;
    oaR_FL: string;
    pcT_OWNER_OCCUP: number;
    predatE_CONT_DATE: Date;
    propertY_ID: number;
    puR_PREDATE_BY_OPT: string;
    puR_PRED_CONT_SALE: string;
    releasE_DT: Date;
    roW_CHANGE_TS: Date;
    shapE_CD: number;
    situS_CITY_NAME: string;
    suprV_APPROVED_FL: string;
    suprV_APPR_UPD_TS: Date;
    suprV_APPR_UPD_WKR: string;
    toT_BUILDING_AREA: number;
    toT_LOT_SIZE: number;
    toT_NET_RENT_AREA: number;
    updatE_TS: Date;
    updatE_USER: string;
    updatE_WORKER: string;
    usE_CD: number;
    zoninG_AGENCY_CD: number;
    zoninG_CD: number;
    prinT_PARCEL: string;
    address: string;
    situS_STATE: string;
    ziP_CD: string;
    doC_PARCEL_CNT: string;
    evenT_TS: Date;
    inD_PUR_PRICE: number;
    adJ_SALES_PRICE: number;
    traN_TAX_PRICE: number;
    usE_NAME: string;
    addr_id: number;
    stD_ADDR_CD: number;
    mailinG_NAME: string;
    carE_OF_NAME: string;
    attentioN_NAME: string;
}