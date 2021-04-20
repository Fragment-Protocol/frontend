import React from 'react';
import { Modal as ModalAntd } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import CrossImg from '../../assets/img/icons/cross.svg';
import { useMst } from '../../store/store';

interface IModal {
  isVisible?: boolean;
  handleCancel?: () => void;
  className?: string;
  width?: string | number;
}

const ModalErr: React.FC<IModal> = observer(
  ({ children, handleCancel, className, width = 'fit-content' }) => {
    const { modals } = useMst();
    const onCancel = (): void => {
      modals.handleError('');
      if (handleCancel) {
        handleCancel();
      }
    };
    return (
      <ModalAntd
        title={false}
        visible={!!modals.errMsg}
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
  },
);

export default ModalErr;
