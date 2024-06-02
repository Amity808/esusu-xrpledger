import Image from "next/image";
// import { xrplClient } from "@nice-xrpl/react-xrpl";
import { Client} from "xrpl"
import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider"
// import Web3Authentication from "@/components/Web3Authentication";
import Web3Authentication from "@/components/Web3Authentication";
export default function Home() {
  // Client
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Web3Authentication />
    </main>
  );
}
