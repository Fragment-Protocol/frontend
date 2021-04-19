import React from 'react';
import { Input as AntdInput } from 'antd';
import classNames from 'classnames';

interface IInput {
  className?: string;
  placeholder?: string;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  value: string | number;
  type: string;
  id?: string;
}

const Input: React.FC<IInput> = ({ className, placeholder, onChange, value, type, id, onBlur }) => {
  const [isSmall, setSmall] = React.useState(false);
  const inputRef = React.useRef<any>();
  const handlePlaceholderClick = (): void => {
    inputRef.current.focus();
  };
  React.useEffect(() => {
    if (inputRef.current.input.clientWidth < 300) {
      setSmall(true);
    }
  }, []);
  return (
    <div className="input__wrapper">
      <div
        className={classNames('input__border', {
          small: isSmall,
        })}
      />
      <AntdInput
        id={id}
        ref={inputRef}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={type}
        className={classNames('input text-lg', className, {
          active: value,
          small: isSmall,
        })}
      />
      <div
        className="input__placeholder"
        role="button"
        tabIndex={0}
        onClick={handlePlaceholderClick}
        onKeyDown={handlePlaceholderClick}
      >
        {placeholder}
      </div>
    </div>
  );
};

export default Input;
