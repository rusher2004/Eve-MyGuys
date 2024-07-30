import Image from "next/image";

export default function CharacterPortrait({
  id,
  size,
}: {
  id: string;
  size: 64 | 128 | 256 | 512;
}) {
  return (
    <Image
      className="size-28 md:size-44 lg:size-48"
      src={`https://images.evetech.net/characters/${id}/portrait?tenant=tranquility&size=${size}`}
      alt="Character portrait"
      width={512}
      height={512}
    />
  );
}
