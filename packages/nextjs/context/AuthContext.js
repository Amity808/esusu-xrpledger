"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getXrplChainConfig } from "@web3auth/base";
import { CHAIN_NAMESPACES, IProvider, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { XrplPrivateKeyProvider } from "@web3auth/xrpl-provider";
import useLoading from "~~/hooks/useLoading";
import RPC from "~~/utils/xrpl/xrpIRPC";

const Web3AuthContext = createContext();

const clientId = "BIBFs1xB8C0HKGdr86Iuq_zZuREdOgJ0S8lu6kQwB7wLC9uRaLVm6Kys6iHr9k1OdtTr7ixoPkqEP2qnu8HlxDs";

export const AuthContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loginIn, setLoginIn] = useState(null);
  const [balance, setBalance] = useState("");
  const [addressXRLedger, setAddressXRLedger] = useState("");

  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const init = async () => {
      startLoading();
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
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          setIsAuthenticated(false)
        }
        stopLoading();
      } catch (error) {
        stopLoading();
        console.error(error);
      }
    };

    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    init();
  }, []);

  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    try {
      const webauthProvider = await web3auth.connect();

      router.push("/");
      setProvider(webauthProvider);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.log(error);
    }
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
    // localStorage.removeItem('token')
    setIsAuthenticated(false);
    setProvider(null);
    localStorage.removeItem("isAuthenticated");
  };
  const getBalance = async () => {
    if (!provider) {
      return;
    }

    const rpc = new RPC(provider);
    const userBalance = rpc.getBalance();
    setBalance(userBalance);
  };
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    setAddressXRLedger(userAccount);
    uiConsole("Accpuint info: ", userAccount);
  };

  const createEscrow = async ({destination, cancelTime, amount}) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }

    const rpc = new RPC(provider);
    const escrow = await rpc.createEscrow(destination, cancelTime, amount)
    console.log(escrow)
    uiConsole("Escrow Created")
  }
  const finishEscrow = async ({sequence}) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }

    const rpc = new RPC(provider);
    const escrow = await rpc.escrowFinshed(sequence)
    console.log(escrow)
    uiConsole("Escrow Status")
  }
  const cancelEscrow = async ({sequence}) => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }

    const rpc = new RPC(provider);
    const escrow = await rpc.cancelEscrow(sequence)
    console.log(escrow)
    uiConsole("Escrow Canceled")
  }

  return (
    <Web3AuthContext.Provider value={{ login, logout, getUserInfo, isAuthenticated, balance, addressXRLedger, createEscrow, finishEscrow, cancelEscrow }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export default Web3AuthContext;

export const useAuth = () => {
  return useContext(Web3AuthContext);
};
