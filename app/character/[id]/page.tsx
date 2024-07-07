import {
  fetchCharacter,
  fetchCharacterAffiliation,
} from "@/app/lib/esi/character";
import CharacterPortrait from "@/app/ui/character/portrait";
import AllianceInfoTile from "@/app/ui/alliance/info-tile";
import CorpInfoTile from "@/app/ui/corporation/info-tile";
import SkillQueue from "@/app/ui/skill/queue";

export default async function Page({ params }: { params: { id: string } }) {
  // fetch character data from ESI
  const character = await fetchCharacter(params.id);
  const affiliation = await fetchCharacterAffiliation(params.id);

  return (
    <div>
      <header className="flex">
        <CharacterPortrait id={params.id} size={512} />
        <div className="flex flex-col gap-1">
          <h1>{character.name}</h1>
          <CorpInfoTile id={affiliation.corporation_id} />
          {affiliation.alliance_id && (
            <AllianceInfoTile id={affiliation.alliance_id} />
          )}
          {/* 
          {affiliation.faction_id && (
            <CorpInfoTile id={affiliation.faction_id} />
          )}
            TODO: figure out how to get faction name and icon 
           */}
        </div>
      </header>
      <SkillQueue params={{ charID: params.id }} />
    </div>
  );
}
