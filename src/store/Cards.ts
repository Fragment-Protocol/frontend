import { types, flow, applySnapshot } from 'mobx-state-tree';

import axios from '../core/axios';
/* eslint-disable no-param-reassign */

const BepToken = types.model({
  id: types.number,
  created_from: types.string,
  current_balance: types.string,
  name: types.string,
  tokenAddress: types.string,
  total: types.string,
  decimals: types.number,
});

const Nft = types.model({
  id: types.number,
  nftAddress: types.string,
  nftId: types.number,
  image_url: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  permalink: types.maybeNull(types.string),
  owner: types.string,
  ready_to_withdraw: types.boolean,
  bep20: types.maybeNull(BepToken),
});

export const Cards = types
  .model({
    items: types.optional(types.array(Nft), []),
  })
  .actions((self) => {
    const update = (items: any) => {
      applySnapshot(self.items, items);
    };

    const getItems = flow(function* getItems() {
      try {
        const { data } = yield axios.get('/locked_nft/');

        update(data);
      } catch (err) {
        console.log(err, 'get items');
      }
    });
    return { getItems, update };
  });
