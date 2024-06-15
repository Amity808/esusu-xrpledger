import Web3Authentication from "../../components/Web3Authentication";
export default function Home() {
  // Client
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Web3Authentication />
    </main>
  );
}
