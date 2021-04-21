import BigNumber from 'bignumber.js/bignumber';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import config from './config';

declare global {
  interface Window {
    ethereum: any;
  }
}
interface INetworks {
  [key: string]: string;
}

interface IMetamaskService {
  testnetEth: 'ropsten' | 'kovan' | 'rinkeby';
  isProduction?: boolean;
}

const networks: INetworks = {
  mainnet: '0x1',
  ropsten: '0x3',
  kovan: '0x2a',
  rinkeby: '0x4',
  bnct: '0x61',
  bnc: '0x38',
};

export default class MetamaskService {
  public wallet;

  public web3Provider;

  private testnetEth: string;

  private testnetBnc = 'bnct';

  private isProduction: boolean;

  public walletAddress = '';

  public chainChangedObs: any;

  public usedNetworkEth: string;

  public usedChainEth: string;

  public usedChainBnc: string;

  public usedNetworkBnc: string;

  constructor({ testnetEth, isProduction = false }: IMetamaskService) {
    this.wallet = window.ethereum;
    this.web3Provider = new Web3(this.wallet);
    this.testnetEth = testnetEth;
    this.isProduction = isProduction;

    this.usedNetworkEth = this.isProduction ? 'mainnet' : this.testnetEth;
    this.usedChainEth = this.isProduction ? networks.mainnet : networks[this.testnetEth];

    this.usedNetworkBnc = this.isProduction ? 'bnc' : this.testnetBnc;
    this.usedChainBnc = this.isProduction ? networks.bnc : networks[this.testnetBnc];

    this.chainChangedObs = new Observable((subscriber) => {
      this.wallet.on('chainChanged', () => {
        const currentChain = this.wallet.chainId;

        if (currentChain !== this.usedChainEth && currentChain !== this.usedChainBnc) {
          subscriber.next({
            err: `Please choose ${this.usedNetworkEth} or binance smart testnet chain network in metamask wallet.`,
            network: '',
          });
        } else {
          subscriber.next({
            network: currentChain === this.usedChainEth ? this.usedNetworkEth : this.usedNetworkBnc,
            err: '',
          });
        }
      });
    });
  }

  ethRequestAccounts() {
    return this.wallet.request({ method: 'eth_requestAccounts' });
  }

  public connect() {
    const currentChain = this.wallet.chainId;

    return new Promise((resolve, reject) => {
      if (!this.wallet) {
        reject(new Error(`metamask wallet is not injected`));
      }

      if (!currentChain || currentChain === null) {
        this.wallet
          .request({ method: 'eth_chainId' })
          .then((resChain: any) => {
            if (resChain === this.usedChainEth || resChain === this.usedChainBnc) {
              this.ethRequestAccounts()
                .then((account: any) => {
                  [this.walletAddress] = account;
                  resolve({
                    address: account[0],
                    network:
                      resChain === this.usedChainEth ? this.usedNetworkEth : this.usedNetworkBnc,
                  });
                })
                .catch(() => reject(new Error('Not authorized')));
            } else {
              reject(
                new Error(
                  `Please choose ${this.usedNetworkEth} or binance smart testnet chain network in metamask wallet.`,
                ),
              );
            }
          })
          .catch(() => reject(new Error('Not authorized')));
      } else if (currentChain === this.usedChainEth || currentChain === this.usedChainBnc) {
        this.ethRequestAccounts()
          .then((account: any) => {
            [this.walletAddress] = account;
            resolve({
              address: account[0],
              network:
                currentChain === this.usedChainEth ? this.usedNetworkEth : this.usedNetworkBnc,
            });
          })
          .catch(() => reject(new Error('Not authorized')));
      } else {
        reject(
          new Error(
            `Please choose ${this.usedNetworkEth} or binance smart testnet chain network in metamask wallet.`,
          ),
        );
      }
    });
  }

  static calcTransactionAmount(amount: number, tokenDecimal: number) {
    return new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimal)).toString(10);
  }

  getContract(tokenAddress: string, abi: Array<any>) {
    return new this.web3Provider.eth.Contract(abi, tokenAddress);
  }

  static getMethodInterface(abi: Array<any>, methodName: string) {
    return abi.filter((m) => {
      return m.name === methodName;
    })[0];
  }

  encodeFunctionCall(abi: any, data: Array<any>) {
    return this.web3Provider.eth.abi.encodeFunctionCall(abi, data);
  }

  async totalSupply(tokenAddress: string, abi: any, tokenDecimals: number) {
    const contract = this.getContract(tokenAddress, abi);
    const totalSupply = await contract.methods.totalSupply().call();

    return +new BigNumber(totalSupply).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
  }

  public async approveToken(
    tokenAddress: string,
    contract: 'ETH' | 'BSC' | 'NFT',
    data: any,
    walletAddress?: string,
  ) {
    const approveMethod = MetamaskService.getMethodInterface(config[contract].ABI, 'approve');

    const approveSignature = this.encodeFunctionCall(approveMethod, data);

    return this.sendTransaction({
      from: walletAddress || this.walletAddress,
      to: tokenAddress,
      data: approveSignature,
    });
  }

  public createTransaction(
    contract: 'ETH' | 'BSC',
    method: string,
    data: Array<any>,
    walletAddress?: string,
    value?: any,
  ) {
    const transactionMethod = MetamaskService.getMethodInterface(config[contract].ABI, method);

    const approveSignature = this.encodeFunctionCall(transactionMethod, data);

    return this.sendTransaction({
      from: walletAddress || this.walletAddress,
      to: config[contract].ADDRESS,
      data: approveSignature,
      value: value || '',
    });
  }

  public async addToken(address: string, symbol: string, decimals: number | string) {
    await this.wallet.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
        },
      },
    });
  }

  signMsg(msg: string) {
    return this.web3Provider.eth.personal.sign(msg, this.walletAddress, '');
  }

  sendTransaction(transactionConfig: any) {
    return this.web3Provider.eth.sendTransaction({
      ...transactionConfig,
      from: this.walletAddress,
    });
  }
}
