import Image from "next/image";

export default function Portrait({ id, size }: { id: string; size: number }) {
  return (
    <Image
      src={`https://images.evetech.net/characters/${id}/portrait?tenant=tranquility&size=${size}`}
      alt="Character portrait"
      width={512}
      height={512}
    />
  );
}
