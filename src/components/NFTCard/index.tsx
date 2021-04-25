import React from 'react';
import { Progress } from 'antd';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';

import InfoImg from '../../assets/img/icons/info.svg';
import StarImg from '../../assets/img/icons/star.svg';
import TokenImg from '../../assets/img/mock/token.jpg';
import { useConnectorContext } from '../../contexts/Connector';
import { useMst } from '../../store/store';
import config from '../../config';
import axios from '../../core/axios';
import web3Config from '../../services/web3/config';
import Button from '../Button';

import './NFTCard.scss';

interface INFTCarc {
  id: string | number;
  tokenId: string | number;
  name: string;
  totalSypply: number | string;
  sold: number | string;
  isWithdraw?: boolean;
  tokenAddress: string;
  me?: boolean;
  img?: string;
  url?: string;
  decimals: number;
  nftTokenAddress: string;
  owner: string;
}

const NFTCard: React.FC<INFTCarc> = observer(
  ({
    name,
    totalSypply,
    sold,
    isWithdraw,
    me,
    tokenAddress,
    img,
    url,
    decimals,
    id,
    nftTokenAddress,
    owner,
    tokenId,
  }) => {
    const { modals, user } = useMst();
    const connectContext = useConnectorContext();
    const [isLoading, setLoading] = React.useState(false);

    const handleDeposit = async () => {
      console.log(tokenAddress, decimals);
      if (user.address) {
        if (user.network !== config.networkBsc) {
          modals.handleError('bsc');
        } else {
          const isApproved = await connectContext.metamaskService.checkTokenAllowance(
            tokenAddress,
            'BEP',
            decimals,
            web3Config.BSC.ADDRESS,
          );
          modals.setDepositData(tokenAddress, decimals, name, +totalSypply);
          if (isApproved) {
            modals.changeVisible('deposit', true);
          } else {
            modals.changeVisible('approveDeposit', true);
          }
        }
      } else {
        modals.changeVisible('connect', true);
      }
    };

    const handleWithDraw = async () => {
      if (user.address) {
        if (user.network !== config.networkEth) {
          modals.handleError('eth');
        } else {
          try {
            setLoading(true);
            await connectContext.metamaskService.createTransaction('ETH', 'withdrawNft', [
              nftTokenAddress,
              id,
              owner,
            ]);
            await axios.post(`/locked_nft/${tokenId}/unlock/`);

            setLoading(false);
          } catch (err) {
            setLoading(false);
          }
        }
      } else {
        modals.changeVisible('connect', true);
      }
    };

    return (
      <div className="nft-card">
        {me ? <img src={StarImg} alt="me" className="nft-card__star" /> : ''}
        <a href={url} target="_blank" rel="noreferrer" className="nft-card__img">
          {img ? <img src={`http://${img}`} alt="" /> : <img src={TokenImg} alt="" />}
        </a>
        <div className="nft-card__content">
          <div className="nft-card__info">
            <div className="nft-card__info-item">
              <div className="nft-card__info-item-title text-gray text-sm text-upper">
                BEP-20 Token Name
              </div>
              <div className="text-md nft-card__info-item-content text-white">
                {name || 'Token Name'}
              </div>
            </div>
            {/* <div className="nft-card__info-item">
                <div className="nft-card__info-item-title text-gray text-sm text-upper">
                  Token price
                </div>
                <div className="text-md nft-card__info-item-content text-white">{price}</div>
              </div> */}
          </div>
          <div className="nft-card__progress">
            <div className="nft-card__progress-text text-upper text-sm text-gray">
              Liquid tokens currently in vault
            </div>
            <div className="nft-card__progress-content">
              <div className="text-md text-orange">
                {new BigNumber(sold).dividedBy(new BigNumber(10).pow(decimals)).toFixed()}
              </div>
              <div className="text-md text-white">
                {new BigNumber(totalSypply).dividedBy(new BigNumber(10).pow(decimals)).toFixed()}
              </div>
            </div>
            <Progress
              strokeColor={{
                '0%': '#EC774E',
                '100%': '#EC774E',
              }}
              percent={(+sold * 100) / +totalSypply}
            />
          </div>
          {!isWithdraw && (
            <>
              <div className="nft-card__text text-gray text-smm">
                <img src={InfoImg} alt="info" />
                <span>Deposit liquid tokens to unlock NFT</span>
              </div>
              <Button size="sm" className="nft-card__btn" onClick={handleDeposit}>
                Deposit
              </Button>
            </>
          )}
          {isWithdraw && (
            <Button
              size="sm"
              loading={isLoading}
              colorScheme="outline"
              className="nft-card__btn"
              onClick={handleWithDraw}
            >
              Withdraw NFT
            </Button>
          )}
        </div>
      </div>
    );
  },
);

export default NFTCard;
