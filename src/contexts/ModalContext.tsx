import React, { createContext, useContext } from 'react';

const defaultValues = {
  deposit: false,
  address: false,
  token: false,
  end: false,
  connect: false,
  disconnect: false,
  errMsg: '',
  nft: {
    address: '',
    id: '',
  },
};

const Context = createContext<any>({
  ...defaultValues,
  handleChangeVisible: (): void => {},
});

interface IState {
  deposit: boolean;
  address: boolean;
  token: boolean;
  end: boolean;
  connect: boolean;
  disconnect: boolean;
  errMsg: string;
  nft: any;
}

class ModalContext extends React.Component<any, IState> {
  constructor(props: IState) {
    super(props);

    this.state = defaultValues;

    this.handleChangeVisible = this.handleChangeVisible.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSetNft = this.handleSetNft.bind(this);
  }

  handleChangeVisible = (modalName: string, value: boolean): void => {
    this.setState<any>((state: IState) => {
      return {
        state,
        [modalName]: value,
      };
    });
  };

  handleError = (value: string): void => {
    this.setState<any>((state: IState) => {
      return {
        state,
        errMsg: value,
      };
    });
  };

  handleSetNft = (address: string, id: string) => {
    this.setState({
      nft: {
        address,
        id,
      },
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          deposit: this.state.deposit,
          address: this.state.address,
          token: this.state.token,
          end: this.state.end,
          connect: this.state.connect,
          disconnect: this.state.disconnect,
          errMsg: this.state.errMsg,
          nft: this.state.nft,
          handleChangeVisible: this.handleChangeVisible,
          handleError: this.handleError,
          handleSetNft: this.handleSetNft,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ModalContext;

export function useModalContext() {
  return useContext(Context);
}
