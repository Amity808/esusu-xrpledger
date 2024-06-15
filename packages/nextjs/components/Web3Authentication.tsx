'use client'
import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider"
import { Web3Auth } from "@web3auth/modal";
import { getXrplChainConfig } from "@web3auth/base";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK,IProvider } from "@web3auth/base";
import RPC from "~~/utils/xrpl/xrpIRPC"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import React, { useEffect, useState} from 'react'


const clientId = "BIBFs1xB8C0HKGdr86Iuq_zZuREdOgJ0S8lu6kQwB7wLC9uRaLVm6Kys6iHr9k1OdtTr7ixoPkqEP2qnu8HlxDs";
const Web3Authentication = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  
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


    useEffect(() => {
        const init = async () => {
          try {
            const xrplProvider = new XrplPrivateKeyProvider({
              config: {
                chainConfig: getXrplChainConfig(0x2),
              },
            });
    
            console.log(xrplProvider.config, "xrplProvider.config");
    
            const web3auth = new Web3Auth({
              clientId,
              // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
              // Please remove this parameter if you're on the Base Plan
              uiConfig: {
                appName: "W3A",
                // appLogo: "https://web3auth.io/images/web3authlog.png", // Your App Logo Here
                theme: {
                  primary: "red",
                },
                mode: "dark",
                logoLight: "https://web3auth.io/images/web3authlog.png",
                logoDark: "https://web3auth.io/images/web3authlogodark.png",
                defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
                loginGridCol: 3,
                primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
                uxMode: UX_MODE.REDIRECT,
              },
              web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
              privateKeyProvider: xrplProvider,
            });
    
            const openloginAdapter = new OpenloginAdapter({
              loginSettings: {
                mfaLevel: "optional",
              },
              adapterSettings: {
                uxMode: "redirect", // "redirect" | "popup"
                whiteLabel: {
                  logoLight: "https://web3auth.io/images/web3authlog.png",
                  logoDark: "https://web3auth.io/images/web3authlogodark.png",
                  defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
                  // dark: false, // whether to enable dark mode. defaultValue: false
                },
                mfaSettings: {
                  deviceShareFactor: {
                    enable: true,
                    priority: 1,
                    mandatory: true,
                  },
                  backUpShareFactor: {
                    enable: true,
                    priority: 2,
                    mandatory: true,
                  },
                  socialBackupFactor: {
                    enable: true,
                    priority: 3,
                    mandatory: true,
                  },
                  passwordFactor: {
                    enable: true,
                    priority: 4,
                    mandatory: true,
                  },
                },
              },
            });
            web3auth.configureAdapter(openloginAdapter);
    
            setWeb3auth(web3auth);
    
            await web3auth.initModal();
    
            if (web3auth.connected) {
              setProvider(web3auth?.provider);
              setLoggedIn(true);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        init();
      }, []);


      const login = async () => {
        if(!web3auth) {
            uiConsole("web3auth not initialized yet");
            return;    
        }
        const webauthProvider = await web3auth.connect();
        setProvider(webauthProvider);
        setLoggedIn(true);
      } 

      const authenticateUser = async () => {
        if (!web3auth) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        const idToken = await web3auth.authenticateUser();
        uiConsole(idToken);
      };
    
      const getUserInfo = async () => {
        if (!web3auth) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        const user = await web3auth.getUserInfo();
        uiConsole(user);
      };
    
      const logout = async () => {
        if (!web3auth) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        await web3auth.logout();
        setProvider(null);
        setLoggedIn(false);
      };
    
      const getAccounts = async () => {
        if (!provider) {
          uiConsole("provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const userAccount = await rpc.getAccounts();
        uiConsole("Accpuint info: ", userAccount);
      };
    
      const getBalance = async () => {
        if (!provider) {
          uiConsole("provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const balance = await rpc.getBalance();
        uiConsole("Balance", balance);
      };
    
      const sendTransaction = async () => {
        if (!provider) {
          uiConsole("provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const result = await rpc.signAndSendTransaction();
        uiConsole(result);
      };
    
      const signMessage = async () => {
        if (!provider) {
          uiConsole("provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const result = await rpc.signMessage();
        uiConsole(result);
      };
      const getAccountAddress = async () => {
        if (!provider) {
          uiConsole("provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const result = await rpc.getAccountAddress();
        uiConsole(result);
      };
      const getWalletSeed = async () => {
        if (!provider) {
          uiConsole("provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const result = await rpc.getWalletSeed();
        console.log(result, "result: " )
        uiConsole(result);
      };

      function uiConsole(...args) {
        const el = document.querySelector("#console>p");
        if (el) {
          el.innerHTML = JSON.stringify(args || {}, null, 2);
        }
      }


      const loggedInView = (
        <>
          <div className="flex-container">
            <div>
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
            <div>
              <button onClick={logout} className="card">
                Log Out
              </button>
            </div>
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
          Web3Auth{" "}
        </a>
        & ReactJS XRPL Example
      </h1>
      <p>We are currently talking to the Web3 dev on our to get the private for the account generated through auth login but we have not get the reply that in the github discussion group</p>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        
      </footer>
    </div>
    </div>
    
  )
}

export default Web3Authentication