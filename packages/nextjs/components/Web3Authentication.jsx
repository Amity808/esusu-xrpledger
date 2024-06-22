'use client'
import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider"
import { Web3Auth } from "@web3auth/modal";
import { getXrplChainConfig } from "@web3auth/base";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK,IProvider } from "@web3auth/base";
import RPC from "~~/utils/xrpl/xrpIRPC"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import React, { useEffect, useState} from 'react'
import Auth from "../middleware/Auth"
import useWeb3Auth from "~~/hooks/auth/useWeb3Auth";

const clientId = "BIBFs1xB8C0HKGdr86Iuq_zZuREdOgJ0S8lu6kQwB7wLC9uRaLVm6Kys6iHr9k1OdtTr7ixoPkqEP2qnu8HlxDs";
const Web3Authentication = () => {

  const { isLoading, setLoggedIn: setlogIN, setProvider: provide, web3auth: web3auths, loggedIn } = useWeb3Auth()

  
    const chainConfig = {
      chainNamespace: CHAIN_NAMESPACES.XRPL,
      chainId: "0x2",
      // Avoid using public rpcTarget & wsTarget in production.
      // Use services like Infura, Quicknode etc
      rpcTarget: "https://s.altnet.rippletest.net:51234/",
      wsTarget: "wss://s.altnet.rippletest.net:51233/",
      ticker: "XRP",
      tickerName: "XRPL",
      displayName: "xrpl testnet",
      blockExplorerUrl: "https://devnet.xrpl.org/",
    };


    
    function uiConsole(...args) {
      const el = document.querySelector("#console>p");
      if (el) {
        el.innerHTML = JSON.stringify(args || {}, null, 2);
      }
    }


      const login = async () => {
        if(!web3auths) {
            uiConsole("web3auth not initialized yet");
            return;    
        }
        try {
          const webauthProvider = await web3auths.connect();
          
        provide(webauthProvider);
        setlogIN(true);
        } catch (error) {
          console.log(error)
        }
      } 
      const getUserInfo = async () => {
        if (!web3auths) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        const user = await web3auths.getUserInfo();
        uiConsole(user);
      };

      const logout = async () => {
        if (!web3auths) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        await web3auths.logout();
        localStorage.removeItem('token')
        provide(null);
        setlogIN(false);
      };

    

      const loggedInView = (
        <>
          <div className="flex-container">
            {/* <div>
              <button onClick={getUserInfo} className="card">
                Get User Info
              </button>
            </div>
            <div>
              <button onClick={authenticateUser} className="card">
                Get ID Token
              </button>
            </div>
            <div>
              <button onClick={getAccountAddress} className="card">
                Address
              </button>
            </div>
            <div>
              <button onClick={getWalletSeed} className="card">
                Seed
              </button>
            </div>
            <div>
              <button onClick={getAccounts} className="card">
                Get Accounts
              </button>
            </div>
            <div>
              <button onClick={getBalance} className="card">
                Get Balance
              </button>
            </div>
            <div>
              <button onClick={signMessage} className="card">
                Sign Message
              </button>
            </div>
            <div>
              <button onClick={sendTransaction} className="card">
                Send Transaction
              </button>
            </div>
            <div> */}
              <button onClick={logout} className="card">
                Log Out
              </button>
              <div>
              <button onClick={getUserInfo} className="card">
                Get User Info
              </button>
            </div>
            {/* </div> */}
          </div>
          <div>
            login now

          </div>
          <div id="console" style={{ whiteSpace: "pre-line" }}>
            <p style={{ whiteSpace: "pre-line" }}></p>
          </div>
        </>
      );

      const unloggedInView = (
        <button onClick={login} className="card">
          Login
        </button>
      );
    
  return (
    <div>
         <div className="container">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/modal" rel="noreferrer">
          Esusu{" "}
        </a>
        Solution by Amityclev Lab Solution
      </h1>
      <p>Secure Your Feature With Your Savings</p>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        
      </footer>
    </div>
    </div>
    
  )
}

export default Web3Authentication