import { Skill } from "./definitions";

export async function fetchType(id: number) {
  try {
    const req = new Request(`https://ref-data.everef.net/types/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    const response = await fetch(req);

    if (!response.ok) {
      throw new Error(`Failed to fetch type: ${response.statusText}`);
    }

    return (await response.json()) as Skill;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch type", { cause: error });
  }
}
