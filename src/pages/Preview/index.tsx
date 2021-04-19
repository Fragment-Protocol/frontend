import React from 'react';

import LogoImg from '../../assets/img/icons/logo.svg';

import './Preview.scss';

const Preview: React.FC = () => {
  return (
    <main className="preview">
      <img src={LogoImg} alt="fragment" />
    </main>
  );
};

export default Preview;
