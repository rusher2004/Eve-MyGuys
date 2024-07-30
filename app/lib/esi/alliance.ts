import { Alliance } from "../definitions";

export async function fetchAlliance(id: number) {
  const params = new URLSearchParams({
    datasource: "tranquility",
  }).toString();

  const req = new Request(
    `https://esi.evetech.net/latest/alliances/${id}?${params}`,
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
    throw new Error(`Failed to fetch alliance: ${response.statusText}`);
  }

  return (await response.json()) as Alliance;
}
