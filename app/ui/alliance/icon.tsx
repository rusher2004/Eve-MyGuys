import InfoTileIcon from "@/app/ui/info-tile/icon";

export default function AllianceIcon({
  id,
  size,
}: {
  id: number;
  size: 64 | 128;
}) {
  return (
    <InfoTileIcon
      alt="Corporation icon"
      src={`https://images.evetech.net/Alliance/${id}_${size}.png`}
      size={size}
    />
  );
}
