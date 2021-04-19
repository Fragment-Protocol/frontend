import React, { createContext, useContext } from 'react';

const defaultValues = {
  deposit: false,
  address: false,
  token: false,
  end: false,
  connect: false,
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
}

class ModalContext extends React.Component<any, IState> {
  constructor(props: IState) {
    super(props);

    this.state = defaultValues;

    this.handleChangeVisible = this.handleChangeVisible.bind(this);
  }

  handleChangeVisible = (modalName: string, value: boolean): void => {
    this.setState<any>((state: IState) => {
      return {
        state,
        [modalName]: value,
      };
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
          handleChangeVisible: this.handleChangeVisible,
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
