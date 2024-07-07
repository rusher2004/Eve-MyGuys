export type Character = {
  alliance_id: number;
  birthday: Date;
  bloodline_id: number;
  corporation_id: number;
  description: string;
  gender: string;
  name: string;
  race_id: number;
  security_status: number;
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
  finish_date?: Date;
  finished_level: number;
  level_end_sp?: number;
  level_start_sp?: number;
  queue_position: number;
  skill_id: number;
  start_date?: Date;
  training_start_sp?: number;
};
