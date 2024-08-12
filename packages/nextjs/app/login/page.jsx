import Web3Authentication from "../../components/Web3Authentication";
import {useAuth} from "~~/context/AuthContext"
export default function Home() {
  // Client
  const { createEscrow, cancelEscrow, finishEscrow } = useAuth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Web3Authentication />
    </main>
  );
}
