export interface anticipatedusecodes {
    anticipated_use_cd: number;
    use_name: string;
};

export interface conditionatsales {
    cd_id: string;
    cd_long_name: string;
}

export interface comments {
    csa_id: any;
        seq_num: any;
        comment_text: string;
        entry_ts: any;
        entry_worker: string;
        update_ts: any;
        row_change_ts: any;
        entry_user: string;
        update_user: string;
        update_worker: string;    
}

export interface brokerinvolved {
    broker_involved_fl: string;
    broker_involved_fl_text: string;
}

export interface BuyerSellerRelationship {
    buy_sell_rel_fl: string;
    buy_sell_rel_fl_text: string;
}
 

export interface propertyinfo { 
    use_id: number;
    address: string;
    ind_pur_price: number;
    adj_sales_price: number;
    trans_tax_price: number;
    doc_prefix: string;
    doc_series:number;
    buyer_name: string;
    seller_name: string;
    event_ts: Date;
    entry_ts:Date;
    entry_worker:string;
    entry_user:string;
    tot_building_area:number;
    tot_lot_size:number;
    tot_net_rent_area:number;
    situs_city_name: string;
    situs_state: string;
    zip_cd: string;
    property_id:number;
    row_change_ts:string;
    csa_id:number;
    csa_type:number;
    print_parcel: string;
    use_name: string;
    update_ts: Date;
    update_user: string;
    update_worker: string;

    doc_parcel_cnt: number;
      
}


export interface cisalesinfo {
    anticipated_use_cd: number;
    benchmark_rate_cd: number;
    broker_involved_fl: string;
    buy_sell_rel_desc: string;                        
    buy_sell_rel_fl: string;
    cond_at_sale_cd: number;
    csa_prop_use_cd: number;
    csa_prop_use_detl: string;
    full_expenses_fl: string;
    oar_fl: string;
    pct_owner_occup: number;
    predate_cont_date: Date;
    pur_predate_by_opt: string;
    pur_pred_cont_sale: string;
    release_dt: Date;
    shape_cd: number;
   
    suprv_approved_fl: string;
    suprv_appr_upd_ts: Date;
    suprv_appr_upd_wkr: string;
    update_ts: Date;
    update_user: string;
    update_worker: string;
    zoning_agency_cd: number;
    zoning_cd: number; 
    addr_id: number;
    std_addr_cd: number;
    mailing_name: string;
    care_of_name: string;
    attention_name: string;    
    use_id: number;
    situs_address: string;
    ind_pur_price: number;
    adj_sales_price: number;
    trans_tax_price: number;
    doc_prefix: string;
    doc_series:number;
    buyer_name: string;
    seller_name: string;
    event_ts: Date;
    entry_ts:Date;
    entry_worker:string;
    entry_user:string;
    tot_building_area:number;
    tot_lot_size:number;
    tot_net_rent_area:number;
    situs_city_name: string;
    situs_state: string;
    zip_cd: string;
    property_id:number;
    row_change_ts:string;
    csa_id:number;
    csa_type:number;
    print_parcel: string;
    use_name: string;
    tran_tax_price: number;   
    doc_parcel_cnt: number;
    property_info:propertyinfo;  
}