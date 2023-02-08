import { AppConfig, AppRootProps } from '../src/types'

const defaultConfig: AppConfig = {
  network: 'devnet',
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
    address: 'erd1...',
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
    },
    level: 0,
    credits: null,
    callerRoles: [],
    parent: null,
    children: [],
    extra: [],
  },
}

export const Setup = {
  Config: defaultConfig,

  AppRootProps: {
    config: defaultConfig,
    onActionAddRequest: () => {},
  } as AppRootProps,
}
