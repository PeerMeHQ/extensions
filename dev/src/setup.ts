import { ExtensionConfig } from '@peerme/extensions'

const DemoDaoScAddress = 'erd1qqqqqqqqqqqqqpgqg8t3yh3hr5vxpgsrwwqf3qh0v7e6ydd327rschchqc'

const defaultConfig = (dark: boolean, currentUserAddress: string | null): ExtensionConfig => ({
  network: 'devnet',

  dark,

  hasEarlyAccess: true,

  walletConfig: {
    Debug: true,
    ApiAddress: 'https://devnet-api.multiversx.com',
    Explorer: 'https://explorer.multiversx.com',
    WalletConnectProjectId: 'b5682bd383460cd7c5c99f21c07d40ed',
    ChainId: 'D',
  },

  searchConfig: {
    HostUrl: '',
    ApiKey: '',
    Indexes: {
      Users: 'users',
      Entities: 'entities',
      Proposals: 'proposals',
    },
  },

  entity: {
    address: currentUserAddress || DemoDaoScAddress,
    slug: 'my-dao',
    name: 'MyDAO',
    description: 'A DAO for testing purposes.',
    avatarUrl: '#',
    isAvatarNft: false,
    headerImageUrl: null,
    verified: false,
    private: false,
    justCreated: false,
    tags: [],
    socials: {} as any,
    features: [],
    governance: {
      plug: null,
      nft: false,
      owned: true,
      token: 'TEST-123456',
      tokenLocking: true,
      tokenName: 'MyToken',
      tokenDecimals: 18,
      minVoteWeight: null,
      minProposeWeight: null,
      quorum: null,
      votingPeriodMinutes: null,
      rolesRestrictPropose: [],
    },
    level: 0,
    credits: null,
    callerRoles: [],
    parent: null,
    children: [],
    extra: [],
  },
})

export const Setup = (dark: boolean, currentUserAddress: string | null) => ({
  Config: defaultConfig(dark, currentUserAddress),
})
