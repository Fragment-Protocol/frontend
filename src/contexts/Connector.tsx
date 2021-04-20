import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react';

import config from '../config';
import { rootStore } from '../store/store';
import MetamaskService from '../services/web3';

const connectorContext = createContext<any>({
  MetamaskService: {},
  connect: (): void => {},
});

@observer
class Connector extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new MetamaskService({
        testnetEth: 'rinkeby',
        isProduction: config.isProduction,
      }),
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    if (localStorage.fragment_metamask) {
      this.connect();
    }

    this.state.provider.chainChangedObs.subscribe({
      next({ network, err }: any) {
        rootStore.user.update({
          network,
          errMsg: err,
        });
      },
    });
  }

  connect = async () => {
    try {
      const { address, network } = await this.state.provider.connect();

      rootStore.user.update({
        address,
        network,
      });
      localStorage.fragment_metamask = true;
    } catch (error) {
      console.log(error, 'connect err');

      rootStore.modals.handleError('eth');
      this.disconnect();
    }
  };

  disconnect = () => {
    rootStore.user.update({
      address: '',
    });
    delete localStorage.fragment_metamask;
  };

  render() {
    return (
      <connectorContext.Provider
        value={{
          metamaskService: this.state.provider,
          connect: this.connect,
          disconnect: this.disconnect,
        }}
      >
        {this.props.children}
      </connectorContext.Provider>
    );
  }
}

export default Connector;

export function useConnectorContext() {
  return useContext(connectorContext);
}
