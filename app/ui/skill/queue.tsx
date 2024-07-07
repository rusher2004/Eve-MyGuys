import { fetchSkillQueue } from "@/app/lib/esi/character";
import SkillQueueItem from "@/app/ui/skill/queue-item";

export default async function SkillQueue({
  params,
}: {
  params: { charID: string };
}) {
  const skillQueue = await fetchSkillQueue(params.charID);

  return (
    <ul>
      {skillQueue.map((skill) => (
        <SkillQueueItem
          key={skill.queue_position}
          finishDate={skill.finish_date}
          level={skill.finished_level}
          skillID={skill.skill_id}
        />
      ))}
    </ul>
  );
}
