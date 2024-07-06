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

export type OAuthToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};
