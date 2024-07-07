import { fetchAlliance } from "@/app/lib/esi/alliance";
import AllianceIcon from "@/app/ui/alliance/icon";
import InfoTile from "@/app/ui/info-tile/info-tile";

export default async function AllianceInfoTile({ id: id }: { id: number }) {
  const alliance = await fetchAlliance(id);

  return (
    <InfoTile Icon={<AllianceIcon id={id} size={128} />} name={alliance.name} />
  );
}
