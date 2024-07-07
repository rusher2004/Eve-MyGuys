import { fetchType } from "@/app/lib/eve-ref/type";

function formatFinishDate(d: string) {
  return new Date(d).toLocaleString();
}

export default async function SkillQueueItem({
  finishDate,
  level,
  skillID,
}: {
  finishDate?: string;
  level: number;
  skillID: number;
}) {
  const skill = await fetchType(skillID);
  const romanNumerals = ["I", "II", "III", "IV", "V"];

  return (
    <li>
      <div className="flex flex-col gap-1">
        <h3>
          {skill.name.en} {romanNumerals[level - 1]}
        </h3>
        {finishDate && <sub>{formatFinishDate(finishDate)}</sub>}
        {/* <sub>{skill.description.en}</sub> */}
      </div>
    </li>
  );
}
