import { IProvider } from "@web3auth/base";
// import { Client, dropsToXrp } from "xrpl"
import { convertStringToHex, Payment, xrpToDrops, Client, dropsToXrp, Wallet } from 'xrpl'

export default class XrplRPC {
    private provider: IProvider;

    constructor(provider: IProvider) {
        this.provider = provider;
    }

    getAccounts = async (): Promise<any> => {
        try {
            const accounts = await this.provider.request<never, string[]>({
                method: "xrpl_getAccounts",
            });
            console.log(accounts, "accounts");
            
            if (accounts) {
                const accInfo = await this.provider.request({
                    method: "account_info",
                    params: [
                        {
                            account: accounts[0],
                            strict: false,
                            ledger_index: "current",
              queue: true,
                        },
                    ],
                });
                // const send = this
                return accInfo;
            }else {
                return "No account found, please report issues";
            }
        } catch (error) {
            console.error("Error", error);
            return error    
        }

    }

    getWalletSeed = async (): Promise<any> => {
        try {
          const accounts = await this.provider.request<never, string[]>({
            method: "xrpl_getAccounts",
          });
    
          if (accounts) {
            const accInfo = (await this.provider.request({
              method: "account_info",
              params: [
                {
                  account: accounts[0],
                  strict: false,
                  ledger_index: "current",
                  queue: true,
                },
              ],
            })) as Record<string, Record<string, string>>;
            return accInfo;
          } else {
            return "No accounts found, please report this issue.";
          }
        } catch (error) {
          console.error("Error", error);
          return error;
        }
      }

    getBalance = async (): Promise<any> => {
        try {
          const accounts = await this.provider.request<string[], never>({
            method: "xrpl_getAccounts",
          });
    
          if (accounts) {
            const accInfo = (await this.provider.request({
              method: "account_info",
              params: [
                {
                  account: accounts[0],
                  strict: true,
                  ledger_index: "current",
                  queue: true,
                },
              ],
            })) as Record<string, Record<string, string>>;
            return accInfo.account_data?.Balance;
          } else {
            return "No accounts found, please report this issue.";
          }
        } catch (error) {
          console.error("Error", error);
          return error;
        }
      };

      getAccountAddress = async (): Promise<any> => {
        try {
            const accounts = await this.provider.request<string[], never>({
              method: "xrpl_getAccounts",
            });
      
            if (accounts) {
              const accInfo = (await this.provider.request({
                method: "account_info",
                params: [
                  {
                    account: accounts[0],
                    strict: true,
                    ledger_index: "current",
                    queue: true,
                  },
                ],
              })) as Record<string, Record<string, string>>;
              return accInfo?.account;
            } else {
              return "No accounts found, please report this issue.";
            }
          } catch (error) {
            console.error("Error", error);
            return error;
          }
    }

    fundAccount = async (): Promise<any> => {
        try {
            // const client = new Client("wss://s.altnet.rippletest.net:51233");
            // const wallet = await this.getAccountAddress();
            // const walletSeed = Wallet.fromSeed(wallet);
            // const result = await client.fundWallet();
            // console.log(result);
            // console.log(walletSeed, "walletseed")
            // return walletSeed;
            const accounts = await this.provider.request<string[], never>({
                method: "xrpl_getAccounts",
              });

            //   const seed = accounts[0]?;
        
              if (accounts) {
                const accInfo = (await this.provider.request({
                  method: "account_info",
                  params: [
                    {
                      account: accounts[0],
                      strict: true,
                      ledger_index: "current",
                      queue: true,
                    },
                  ],
                })) as Record<string, Record<string, string>>;
                return accInfo?.account;
              } else {
                return "No accounts found, please report this issue.";
              }
        } catch (error) {
            
        }
    }

      signMessage = async (): Promise<any> => {
        try {
          const msg = "Hello world";
          const hexMsg = convertStringToHex(msg);
          const txSign = await this.provider.request< { signature: string }, never>({
            method: "xrpl_signMessage",
            params: {
              signature: hexMsg,
            },
          });
          return txSign;
        } catch (error) {
          console.log("error", error);
          return error;
        }
      };

      signAndSendTransaction = async (): Promise<any> => {
        try {
          const accounts = await this.provider.request<never, string[]>({
            method: "xrpl_getAccounts",
          });
    
          if (accounts && accounts.length > 0) {
            const tx: Payment = {
              TransactionType: "Payment",
              Account: accounts[0] as string,
              Amount: xrpToDrops(50),
              Destination: "rM9uB4xzDadhBTNG17KHmn3DLdenZmJwTy",
            };
            const txSign = await this.provider.request({
              method: "xrpl_submitTransaction",
              params: {
                transaction: tx,
              },
            });
            return txSign;
          } else {
            return "failed to fetch accounts";
          }
        } catch (error) {
          console.log("error", error);
          return error;
        }
      };
    
}