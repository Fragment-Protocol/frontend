import React, { createContext, useContext } from 'react';

import MetamaskService from '../services/web3';
import config from '../config';

const connectorContext = createContext<any>({
  MetamaskService: {},
  connect: (): void => {},
  address: '',
  network: '',
});

class Connector extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new MetamaskService({
        testnetEth: 'kovan',
        isProduction: config.isProduction,
      }),
      address: '',
      network: '',
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    const self = this;
    if (localStorage.fragment_metamask) {
      this.connect();
    }

    this.state.provider.chainChangedObs.subscribe({
      next(chain: string) {
        self.setState({
          network: chain,
        });
      },
      error(err: string) {
        console.log(err, 'metamask');
      },
    });
  }

  connect = async () => {
    try {
      const { address, network } = await this.state.provider.connect();

      this.setState<any>({
        address,
        network,
      });
      localStorage.fragment_metamask = true;
      console.log(address, network, 'network');
    } catch (error) {
      console.log(error, 'connect err');

      this.disconnect();
    }
  };

  disconnect = () => {
    this.setState<any>({
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
          address: this.state.address,
          network: this.state.network,
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
