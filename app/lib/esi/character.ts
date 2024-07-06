import { Character } from "../definitions";

export async function fetchCharacter(id: string) {
  const params = new URLSearchParams({
    datasource: "tranquility",
  }).toString();

  console.log(
    "url",
    `https://esi.evetech.net/latest/characters/${id}?${params}`
  );

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
