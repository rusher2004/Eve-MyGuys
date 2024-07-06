import { fetchCharacter } from "@/app/lib/esi/character";
import Portrait from "@/app/ui/character/portrait";

export default async function Page({ params }: { params: { id: string } }) {
  // fetch character data from ESI
  const character = await fetchCharacter(params.id);

  return (
    <div>
      <Portrait id={params.id} size={512} />
      <h1>{character.name}</h1>
    </div>
  );
}
