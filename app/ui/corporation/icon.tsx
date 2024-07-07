import InfoTileIcon from "@/app/ui/info-tile/icon";
export default function CorpIcon({
  id,
  size,
}: {
  id: number;
  size: 64 | 128 | 256;
}) {
  return (
    <InfoTileIcon
      alt="Corporation icon"
      src={`https://images.evetech.net/corporations/${id}/logo?tenant=tranquility&size=${size}`}
      size={size}
    />
  );
}
