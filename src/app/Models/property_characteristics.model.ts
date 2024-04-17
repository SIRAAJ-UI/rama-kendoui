export class prop_char_tab_model {
  CSA_ID!: number;
  ZONING_AGENCY_CD!: number;
  ZONING_CD!: string;
  ZONING_NAME!: string;
  TOT_BUILDING_AREA!: number;
  TOT_NET_RENT_AREA!: number;
  TOT_LOT_SIZE!: number;
  SBE_CLASS_LOW!: string;
  SBE_CLASS_HI!: string;
  MVS_CLASS_LOW!: string;
  MVS_CLASS_HI!: string;
  BLDG_BUILT_YR_LOW!: number;
  BLDG_BUILT_YR_HI!: number;
  BLDG_EFF_YR_LOW!: number;
  BLDG_EFF_YR_HI!: number;
  PCT_BUILT_OUT_LOW!: number;
  PCT_BUILT_OUT_HI!: number;
  PCT_OFFICE_LOW!: number;
  PCT_OFFICE_HI!: number;
  NUM_BUILDINGS_LOW!: number;
  NUM_BUILDINGS_HI!: number;
  NUM_STORIES_LOW!: number;
  NUM_STORIES_HI!: number;
  AVG_ACTUAL_HT_LOW!: number;
  AVG_ACTUAL_HT_HI!: number;
  LAND_IMP_RATIO_LOW!: number;
  LAND_IMP_RATIO_HI!: number;
  FAR_LOW!: number;
  FAR_HI!: number;
  TOT_PARKING!: number;

  constructor(data: any) {
    // You can add any additional logic for initialization if needed
    Object.assign(this, data);
  }
}
