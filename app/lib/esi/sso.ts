import { get } from "@/app/lib/kv";
import { jwtDecode } from "jwt-decode";
import { JWTToken, OAuthGrantType, OAuthToken } from "@/app/lib/definitions";

const scopes = [
  "publicData",
  "esi-location.read_location.v1",
  "esi-location.read_ship_type.v1",
  "esi-skills.read_skills.v1",
  "esi-skills.read_skillqueue.v1",
  "esi-wallet.read_character_wallet.v1",
  "esi-wallet.read_corporation_wallet.v1",
  "esi-search.search_structures.v1",
  "esi-clones.read_clones.v1",
  "esi-universe.read_structures.v1",
  "esi-killmails.read_killmails.v1",
  "esi-assets.read_assets.v1",
  "esi-planets.manage_planets.v1",
  "esi-fittings.read_fittings.v1",
  "esi-markets.structure_markets.v1",
  "esi-characters.read_loyalty.v1",
  "esi-characters.read_chat_channels.v1",
  "esi-characters.read_medals.v1",
  "esi-characters.read_standings.v1",
  "esi-characters.read_agents_research.v1",
  "esi-industry.read_character_jobs.v1",
  "esi-markets.read_character_orders.v1",
  "esi-characters.read_blueprints.v1",
  "esi-location.read_online.v1",
  "esi-contracts.read_character_contracts.v1",
  "esi-clones.read_implants.v1",
  "esi-characters.read_fatigue.v1",
  "esi-wallet.read_corporation_wallets.v1",
  "esi-assets.read_corporation_assets.v1",
  "esi-corporations.read_blueprints.v1",
  "esi-contracts.read_corporation_contracts.v1",
  "esi-corporations.read_standings.v1",
  "esi-industry.read_corporation_jobs.v1",
  "esi-markets.read_corporation_orders.v1",
  "esi-industry.read_character_mining.v1",
  "esi-corporations.read_medals.v1",
  "esi-characters.read_titles.v1",
  "esi-characters.read_fw_stats.v1",
  "esi-corporations.read_fw_stats.v1",
  "esi-characterstats.read.v1",
];

export function charIDFromJWTSub(sub: string) {
  return sub.split(":")[2];
}

export function getLoginUrl(origin: string) {
  const redirectURI = origin + "/auth/callback";
  const clientID = process.env.ESI_CLIENT_ID;
  const scope = scopes.join(" ");
  const state = crypto.randomUUID();

  return `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${redirectURI}&client_id=${clientID}&scope=${scope}&state=${state}`;
}

export async function fetchOAuthToken(
  code: string,
  grantType: OAuthGrantType
): Promise<OAuthToken> {
  try {
    const clientID = process.env.ESI_CLIENT_ID;
    const clientSecret = process.env.ESI_SECRET_KEY;
    const params = new URLSearchParams({
      grant_type: grantType,
      // if grantType is Authorization, the payload needs the code property.  if grantType is Refresh,
      // the payload needs the refresh_token property
      ...(grantType === OAuthGrantType.Authorization && { code }),
      ...(grantType === OAuthGrantType.Refresh && { refresh_token: code }),
    });

    const req = new Request("https://login.eveonline.com/v2/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientID}:${clientSecret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "login.eveonline.com",
      },
      body: params,
    });

    const response = await fetch(req);

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    return (await response.json()) as OAuthToken;
  } catch (error) {
    console.error("fetchOAuthToken error", error);
    throw new Error("Failed to fetch token", { cause: error });
  }
}

/**
 * Returns the token if it is still valid, otherwise refreshes it using the refresh token
 * @param token JWT token
 * @returns JWT token
 */
export async function getAccessOrRefreshToken(token: string): Promise<string> {
  const decoded = jwtDecode(token) as JWTToken;
  const now = Math.floor(Date.now() / 1000);

  if (decoded.exp - now < 60) {
    return await refreshToken(decoded);
  }

  return token;
}

export async function refreshToken(token: JWTToken): Promise<string> {
  try {
    const { sub } = token;
    const charID = charIDFromJWTSub(sub);

    const kvToken = await get<OAuthToken>("esi_token_" + charID);
    if (!kvToken?.refresh_token) {
      throw new Error("No refresh token found");
    }

    const newToken = await fetchOAuthToken(
      kvToken.refresh_token,
      OAuthGrantType.Refresh
    );

    if (!newToken?.access_token) {
      throw new Error("No access token found in response");
    }

    return newToken.access_token;
  } catch (error) {
    console.error("refreshToken error", error);
    throw new Error("Failed to refresh token", { cause: error });
  }
}
