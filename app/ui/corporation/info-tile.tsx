import { fetchCorporation } from "@/app/lib/esi/corporation";
import CorpIcon from "@/app/ui/corporation/icon";
import InfoTile from "@/app/ui/info-tile/info-tile";

export default async function CorpInfoTile({ id: id }: { id: number }) {
  const corporation = await fetchCorporation(id);

  return (
    <InfoTile Icon={<CorpIcon id={id} size={128} />} name={corporation.name} />
  );
}
