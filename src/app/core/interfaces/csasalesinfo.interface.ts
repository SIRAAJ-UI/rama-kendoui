export interface AnticipatedUseCodes {
    anticipateD_USE_CD: number;
    usE_NAME: string;
};

export interface ConditionAtsales {
    cD_ID: string;
    cD_LONG_NAME: string;
}

export interface Comments {
    comm_ID: number;
    comm_Text: string;
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

// export interface CISalesinfo {
//     doc_prefix:String;
// situs_city:String;
// broker_involved_fl:String;
// zoning_cd:String;
// buy_sell_rel_fl:String;
// buy_sell_rel_desc:String;
// pur_predate_by_opt:String;
// pur_pred_cont_sale:String;
// full_expenses_fl:String;
// entry_worker:String;
// situs_state:String;
// update_worker:String;
// csa_prop_use_detl:String;
// benchmark_rate_cd_name:String;
// anticipated_use_cd:number;
// csa_id:number;
// csa_type:number;
// doc_series:number;
// property_id:number;
// benchmark_rate_cd:number;
// cond_at_sale_cd:number;
// csa_prop_use_cd:number;
// shape_cd:number;
// tot_building_area:number;
// tot_lot_size:number;
// tot_net_rent_area:number;
// use_cd:number;
// zoning_agency_cd:number;
// csa_net_rent_area:number;
// pct_owner_occup:number;
// event_ts:Date;
// EntrY_TS:Date;
// predate_cont_date:Date;
// release_dt:Date;
// update_ts:Date;
// print_parcel:String;
// buyer_name:String;
// seller_name:String;
// anticipated_use_cd_name:String;
// suprv_approved_fl:String;
// suprv_approved_fl_text:String;
//   }