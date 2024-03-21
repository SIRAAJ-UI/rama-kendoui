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
    seQ_NUM: number;
    commenT_TEXT: string;
};

export class BrokerInvolved implements Interfaces.BrokerInvolved {
    SUPRV_APPROVED_FL: string;
    SUPRV_APPROVED_FL_TEXT: string;
};

export class BuyerSellerRelationship implements Interfaces.BuyerSellerRelationship {
    BUY_SELL_REL_FL: string;
    BUY_SELL_REL_FL_TEXT: string;
};

export class BenchMarkData implements Interfaces.BenchMarkData {
    id: number;
    text: string;
};

export class CsaDocument implements Interfaces.CsaDocument {
    apn: string;
    usecode: string;
    use: string;
    address: string;
    apncount: string;
    indpurprice: string;
    adjsalesprice: string;
    transtaxprice: string;
    doc_prefix: string;
    buyer_name: string;
    seller_name: string;
    event_ts: Date;
};

export class CISalesinfo {
    doc_prefix: String;
    situs_city: String;
    broker_involved_fl: String;
    zoning_cd: String;
    buy_sell_rel_fl: String;
    buy_sell_rel_desc: String;
    pur_predate_by_opt: String;
    pur_pred_cont_sale: String;
    full_expenses_fl: String;
    entrY_WORKER: String;
    situs_state: String;
    update_worker: String;
    csa_prop_use_detl: String;
    benchmark_rate_cd_name: String;
    anticipated_use_cd: number;
    csa_id: number;
    csa_type: number;
    doc_series: number;
    property_id: number;
    benchmark_rate_cd: number;
    cond_at_sale_cd: number;
    csa_prop_use_cd: number;
    shape_cd: number;
    tot_building_area: number;
    tot_lot_size: number;
    tot_net_rent_area: number;
    use_cd: number;
    zoning_agency_cd: number;
    csa_net_rent_area: number;
    pct_owner_occup: number;
    event_ts: Date;
    entrY_TS: Date;
    entrY_USER: string;
    predate_cont_date: Date;
    release_dt: Date;
    update_ts: Date;
    print_parcel: String;
    buyer_name: String;
    seller_name: String;
    anticipated_use_cd_name: String;
    suprv_approved_fl: String;
    suprv_approved_fl_text: String;

}


