import React from 'react';
import { Modal as ModalAntd } from 'antd';
import classNames from 'classnames';

import CrossImg from '../../assets/img/icons/cross.svg';
import { useModalContext } from '../../contexts/ModalContext';

interface IModal {
  isVisible?: boolean;
  handleCancel?: () => void;
  className?: string;
  width?: string | number;
  name: string;
}

const Modal: React.FC<IModal> = ({
  children,
  handleCancel,
  name,
  className,
  width = 'fit-content',
}) => {
  const modalContext = useModalContext();
  const onCancel = (): void => {
    modalContext.handleChangeVisible(name, false);
    if (handleCancel) {
      handleCancel();
    }
  };
  return (
    <ModalAntd
      title={false}
      visible={modalContext[name]}
      footer={false}
      closable={false}
      onCancel={onCancel}
      centered
      width={width}
      className={classNames('modal', className)}
    >
      <div
        className="modal__close"
        onClick={onCancel}
        onKeyDown={onCancel}
        role="button"
        tabIndex={0}
      >
        <img src={CrossImg} alt="" />
      </div>
      {children}
    </ModalAntd>
  );
};

export default Modal;
