import { Corporation } from "../definitions";

export async function fetchCorporation(id: number) {
  const params = new URLSearchParams({
    datasource: "tranquility",
  }).toString();

  const req = new Request(
    `https://esi.evetech.net/latest/corporations/${id}?${params}`,
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
    throw new Error(`Failed to fetch corporation: ${response.statusText}`);
  }

  return (await response.json()) as Corporation;
}
