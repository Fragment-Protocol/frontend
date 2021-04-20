export default {
  NFT: {
    ABI: [
      {
        inputs: [
          { internalType: 'string', name: '_name', type: 'string' },
          { internalType: 'string', name: '_symbol', type: 'string' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
          { indexed: true, internalType: 'address', name: 'approved', type: 'address' },
          { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
          { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
          { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'from', type: 'address' },
          { indexed: true, internalType: 'address', name: 'to', type: 'address' },
          { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'baseURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: '_to', type: 'address' },
          { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
          { internalType: 'string', name: '_tokenURI', type: 'string' },
        ],
        name: 'mintUniqueTokenTo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'bytes', name: '_data', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'operator', type: 'address' },
          { internalType: 'bool', name: 'approved', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
  ETH: {
    ADDRESS: '0x4D505B66D83E9A7d8DAFa8e5938330A2477813Af',
    ABI: [
      {
        inputs: [{ internalType: 'address', name: '_back', type: 'address' }],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: 'address', name: 'owner', type: 'address' },
          { indexed: false, internalType: 'address', name: 'nftAddress', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'nftId', type: 'uint256' },
        ],
        name: 'DepositNFT',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: 'address', name: 'nftAddress', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'nftId', type: 'uint256' },
          { indexed: false, internalType: 'address', name: 'to', type: 'address' },
        ],
        name: 'WithdrawNFT',
        type: 'event',
      },
      {
        inputs: [{ internalType: 'address', name: '_back', type: 'address' }],
        name: 'changeBackAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'nftAddress', type: 'address' },
          { internalType: 'uint256', name: 'nftId', type: 'uint256' },
        ],
        name: 'depositNft',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        name: 'deposits',
        outputs: [
          { internalType: 'address', name: 'tokenAddress', type: 'address' },
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'bool', name: 'sent', type: 'bool' },
          { internalType: 'bool', name: 'locked', type: 'bool' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'bytes', name: '', type: 'bytes' },
        ],
        name: 'onERC721Received',
        outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'nftAddress', type: 'address' },
          { internalType: 'uint256', name: 'nftId', type: 'uint256' },
        ],
        name: 'unlock',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'nftAddress', type: 'address' },
          { internalType: 'uint256', name: 'nftId', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
        ],
        name: 'withdrawNft',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
  BSC: {
    ADDRESS: '0x0FE043805fB2610A4Ce3Dd2091A65a00417F6e6F',
    ABI: [
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: 'address', name: 'tokenAddress', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
          { indexed: false, internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
        ],
        name: 'DepositBEP20',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: 'address', name: 'tokenAddress', type: 'address' },
        ],
        name: 'IsReadyToWithdraw',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: 'address', name: 'tokenAddress', type: 'address' },
        ],
        name: 'TokenCreated',
        type: 'event',
      },
      {
        inputs: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'uint8', name: 'decimals', type: 'uint8' },
          { internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
          { internalType: 'address', name: 'issuer', type: 'address' },
        ],
        name: 'deployNewToken',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'tokenAddress', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'returnTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
};
