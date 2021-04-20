import { types } from 'mobx-state-tree';

const Nft = types.model({
  address: types.string,
  id: types.string,
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
  })
  .actions((self) => ({
    changeVisible(
      name: 'connect' | 'disconnect' | 'deposit' | 'address' | 'token' | 'end',
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
  }));
/* eslint-disable no-param-reassign */
