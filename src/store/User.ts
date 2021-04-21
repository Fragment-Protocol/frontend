import { types } from 'mobx-state-tree';

/* eslint-disable no-param-reassign */
export const User = types
  .model({
    address: types.string,
    network: types.string,
    errMsg: types.string,
  })
  .actions((self) => ({
    update(data: { address?: string; network: string; errMsg?: string }) {
      self.address = data.address || self.address;
      self.network = data.network;
      self.errMsg = data.errMsg || self.errMsg;
    },
    disconnect() {
      self.address = '';
    },
  }));

/* eslint-disable no-param-reassign */
