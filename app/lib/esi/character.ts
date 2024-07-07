import { cookies } from "next/headers";
import { Character, SkillQueueItem } from "../definitions";
import { getAccessOrRefreshToken } from "./sso";

export async function fetchCharacter(id: string) {
  const params = new URLSearchParams({
    datasource: "tranquility",
  }).toString();

  const req = new Request(
    `https://esi.evetech.net/latest/characters/${id}?${params}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  const response = await fetch(req);

  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.statusText}`);
  }

  return (await response.json()) as Character;
}

export async function fetchSkillQueue(id: string) {
  const token = await getOAuthToken(id);

  const params = new URLSearchParams({
    datasource: "tranquility",
    token: token,
  }).toString();

  const req = new Request(
    `https://esi.evetech.net/latest/characters/${id}/skillqueue?${params}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  const response = await fetch(req);

  if (!response.ok) {
    throw new Error(`Failed to fetch skill queue: ${response.statusText}`);
  }

  return (await response.json()) as SkillQueueItem[];
}

async function getOAuthToken(id: string): Promise<string> {
  try {
    const cookieStore = cookies();

    const esiCookie = cookieStore.get("esi_token_" + id);

    if (!esiCookie) {
      throw new Error("No ESI token cookie found");
    }

    const token = await getAccessOrRefreshToken(esiCookie.value);

    return token;
  } catch (error) {
    console.error("getOAuthToken error", error);
    throw new Error("Failed to get OAuth token", { cause: error });
  }
}
