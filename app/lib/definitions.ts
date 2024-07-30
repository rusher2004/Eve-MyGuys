export type Alliance = {
  creator_corporation_id: number;
  creator_id: number;
  date_founded: string;
  executor_corporation_id?: number;
  faction_id?: number;
  name: string;
  ticker: string;
};

export type Character = {
  alliance_id: number;
  birthday: string;
  bloodline_id: number;
  corporation_id: number;
  description: string;
  gender: string;
  name: string;
  race_id: number;
  security_status: number;
};

export type CharacterAffiliation = {
  alliance_id?: number;
  character_id: number;
  corporation_id: number;
  faction_id?: number;
};

export type Corporation = {
  alliance_id?: number;
  ceo_id: number;
  creator_id: number;
  date_founded?: string;
  description?: string;
  faction_id?: number;
  home_station_id?: number;
  member_count: number;
  name: string;
  shares?: number;
  tax_rate: number;
  ticker: string;
  url?: string;
  war_eligible?: boolean;
};

export type JWTToken = {
  scp: string[];
  jti: string;
  kid: string;
  sub: string;
  azp: string;
  tenant: string;
  tier: string;
  region: string;
  aud: string[];
  name: string;
  owner: string;
  exp: number;
  iat: number;
  iss: string;
};

export type OAuthToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

export enum OAuthGrantType {
  Authorization = "authorization_code",
  Refresh = "refresh_token",
}

export type SkillQueueItem = {
  finish_date?: string;
  finished_level: number;
  level_end_sp?: number;
  level_start_sp?: number;
  queue_position: number;
  skill_id: number;
  start_date?: string;
  training_start_sp?: number;
};
