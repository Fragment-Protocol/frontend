import React from 'react';
import { Button as BtnAntd } from 'antd';
import classNames from 'classnames';

export interface IColorScheme {
  colorScheme?: 'white' | 'outline' | 'black' | 'orange';
}

export interface ISize {
  size?: 'sm' | 'lg' | 'md' | 'smd';
}

export interface ButtonProps extends IColorScheme, ISize {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  link?: string;
  linkClassName?: string;
  shadow?: boolean;
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    children,
    className,
    size = 'md',
    colorScheme,
    onClick,
    disabled = false,
    loading = false,
    shadow,
    link,
    linkClassName,
  }) => {
    const Btn = (
      <BtnAntd
        onClick={onClick}
        disabled={disabled || loading}
        className={classNames(
          className,
          'text text-bold btn',
          `btn-${size}`,
          `${colorScheme ? `btn-${colorScheme}` : ''}`,
          {
            'box-shadow': shadow,
            'btn-loading': loading,
            'text-lg': size === 'md',
            'text-sm': size === 'sm',
          },
        )}
      >
        {loading ? 'Loading' : children}
      </BtnAntd>
    );
    if (link) {
      return (
        <a
          className={classNames('btn-link', linkClassName)}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {Btn}
        </a>
      );
    }
    return Btn;
  },
);

export default Button;
