import Image from "next/image";
import { getLoginUrl } from "@/app/lib/esi/sso";

export default function SSOLink() {
  return (
    <a href={getLoginUrl()}>
      <Image
        src="/esi/eve-sso-login-white-large.png"
        alt="Login with Eve Online"
        width={270}
        height={45}
      />
    </a>
  );
}
