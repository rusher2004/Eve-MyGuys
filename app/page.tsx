import { headers } from "next/headers";
import SSOLink from "@/app/ui/esi/sso-link";

export default function Home() {
  const headersList = headers();
  const origin = headersList.get("x-current-origin");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SSOLink origin={origin!} />
    </main>
  );
}
