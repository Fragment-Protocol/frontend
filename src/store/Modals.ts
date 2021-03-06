import { types } from 'mobx-state-tree';

const Nft = types.model({
  address: types.string,
  id: types.string,
});

const Deposit = types.model({
  tokenAddress: types.string,
  decimals: types.number,
  tokenName: types.string,
  amount: types.number,
});
/* eslint-disable no-param-reassign */
export const Modals = types
  .model({
    connect: types.boolean,
    disconnect: types.boolean,
    deposit: types.boolean,
    address: types.boolean,
    token: types.boolean,
    end: types.boolean,
    errMsg: types.string,
    nft: Nft,
    depositData: Deposit,
    approveDeposit: types.boolean,
    approveLock: types.boolean,
  })
  .actions((self) => ({
    changeVisible(
      name:
        | 'connect'
        | 'disconnect'
        | 'deposit'
        | 'address'
        | 'token'
        | 'end'
        | 'approveDeposit'
        | 'approveLock',
      value: boolean,
    ) {
      self[name] = value;
    },
    handleError(msg: string) {
      self.errMsg = msg;
    },
    setNftData(address: string, id: string) {
      self.nft.address = address;
      self.nft.id = id;
    },
    setDepositData(tokenAddress: string, decimals: number, tokenName: string, amount: number) {
      self.depositData = {
        tokenAddress,
        decimals,
        tokenName,
        amount,
      };
    },
  }));
/* eslint-disable no-param-reassign */
