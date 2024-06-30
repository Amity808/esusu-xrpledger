import Web3Authentication from "../../components/Web3Authentication";
import CreateEcrow from "../../components/CreateEscrow";
export default function Home() {
  // Client
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateEcrow />
      <Web3Authentication />
    </main>
  );
}
