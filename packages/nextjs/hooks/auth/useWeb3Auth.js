'use client'
import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider"
import { Web3Auth } from "@web3auth/modal";
import { getXrplChainConfig } from "@web3auth/base";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK,IProvider } from "@web3auth/base";
import RPC from "~~/utils/xrpl/xrpIRPC"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import React, { useEffect, useState} from 'react'
import useLoading from "../useLoading";


const clientId = "BIBFs1xB8C0HKGdr86Iuq_zZuREdOgJ0S8lu6kQwB7wLC9uRaLVm6Kys6iHr9k1OdtTr7ixoPkqEP2qnu8HlxDs";
const useWeb3Auth = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const { isLoading, startLoading, stopLoading } = useLoading();

  
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
          startLoading()
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
              const token = await web3auth.authenticateUser()
              localStorage.setItem('token', token.idToken)
              setLoggedIn(true);
            }
            stopLoading()
          } catch (error) {
            stopLoading()
            console.error(error);
          }
        };
    
        init();
      }, []);


      return { isLoading, web3auth, setProvider, loggedIn, setLoggedIn}
    

}

export default useWeb3Auth;