import React from 'react';
import { Progress } from 'antd';

import InfoImg from '../../assets/img/icons/info.svg';
import StarImg from '../../assets/img/icons/star.svg';
import TokenImg from '../../assets/img/mock/token.jpg';
import { useModalContext } from '../../contexts/ModalContext';
import Button from '../Button';

import './NFTCard.scss';

interface INFTCarc {
  name: string;
  price: string | number;
  totalSypply: number;
  sold: number;
  isWithdraw?: boolean;
  star?: boolean;
}

const NFTCard: React.FC<INFTCarc> = ({ name, price, totalSypply, sold, isWithdraw, star }) => {
  const modalContext = useModalContext();

  const handleDeposit = (): void => {
    modalContext.handleChangeVisible('deposit', true);
  };

  return (
    <div className="nft-card">
      {star ? <img src={StarImg} alt="star" className="nft-card__star" /> : ''}
      <div className="nft-card__img">
        <img src={TokenImg} alt="" />
      </div>
      <div className="nft-card__content">
        <div className="nft-card__info">
          <div className="nft-card__info-item">
            <div className="nft-card__info-item-title text-gray text-sm text-upper">NFT name</div>
            <div className="text-md nft-card__info-item-content text-white">{name}</div>
          </div>
          <div className="nft-card__info-item">
            <div className="nft-card__info-item-title text-gray text-sm text-upper">
              Token price
            </div>
            <div className="text-md nft-card__info-item-content text-white">{price}</div>
          </div>
        </div>
        <div className="nft-card__progress">
          <div className="nft-card__progress-text text-upper text-sm text-gray">
            Liquid tokens currently in vault
          </div>
          <div className="nft-card__progress-content">
            <div className="text-md text-orange">{sold}</div>
            <div className="text-md text-white">{totalSypply}</div>
          </div>
          <Progress
            strokeColor={{
              '0%': '#EC774E',
              '100%': '#EC774E',
            }}
            percent={(sold * 100) / totalSypply}
          />
        </div>
        {!isWithdraw && (
          <div className="nft-card__text text-gray text-smm">
            <img src={InfoImg} alt="info" />
            <span>Deposit liquid tokens to unlock NFT</span>
          </div>
        )}
        <Button size="sm" className="nft-card__btn" onClick={handleDeposit}>
          Deposit
        </Button>
        {isWithdraw && (
          <Button size="sm" colorScheme="outline" className="nft-card__btn">
            Withdraw NFT
          </Button>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
