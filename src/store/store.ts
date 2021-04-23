import { createContext, useContext } from 'react';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { Modals } from './Modals';
import { User } from './User';
import { Cards } from './Cards';

const RootModel = types.model({
  modals: Modals,
  user: User,
  cards: Cards,
});
export const Store = RootModel.create({
  user: {
    address: '',
    network: '',
    errMsg: '',
  },
  cards: {
    items: [],
  },
  modals: {
    connect: false,
    disconnect: false,
    deposit: false,
    address: false,
    token: false,
    approveDeposit: false,
    approveLock: false,
    end: false,
    errMsg: '',
    nft: {
      address: '',
      id: '',
    },
    depositData: {
      tokenAddress: '',
      decimals: 0,
      tokenName: '',
    },
  },
});

export const rootStore = Store;

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
