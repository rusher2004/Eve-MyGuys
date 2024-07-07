import { fetchCharacter, fetchSkillQueue } from "@/app/lib/esi/character";
import Portrait from "@/app/ui/character/portrait";

export default async function Page({ params }: { params: { id: string } }) {
  // fetch character data from ESI
  const character = await fetchCharacter(params.id);
  const skillQueue = await fetchSkillQueue(params.id);

  return (
    <div>
      <Portrait id={params.id} size={512} />
      <h1>{character.name}</h1>
      <ul>
        {skillQueue.map((skill) => (
          <li key={skill.queue_position}>
            <div>
              <h3>{skill.skill_id}</h3>
              <sub>{skill.finished_level}</sub>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
