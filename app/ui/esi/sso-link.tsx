import Image from "next/image";
import { getLoginUrl } from "@/app/lib/esi/sso";

export default function SSOLink({ origin }: { origin: string }) {
  return (
    <a href={getLoginUrl(origin)}>
      <Image
        src="/esi/eve-sso-login-white-large.png"
        alt="Login with Eve Online"
        width={270}
        height={45}
      />
    </a>
  );
}
