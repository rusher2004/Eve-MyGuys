export default function InfoTile({
  Icon: icon,
  name: name,
}: {
  Icon: React.ReactElement;
  name: string;
}) {
  return (
    <div className="flex gap-1 items-center">
      {icon}
      <h4>{name}</h4>
    </div>
  );
}
