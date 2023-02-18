import { ExtensionConfig, AppRootProps } from '../../src/types'

const defaultConfig = (dark: boolean): ExtensionConfig => ({
  network: 'devnet',

  dark,

  hasEarlyAccess: true,

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
    },
    level: 0,
    credits: null,
    callerRoles: [],
    parent: null,
    children: [],
    extra: [],
  },
})

export const Setup = (dark: boolean) => ({
  Config: defaultConfig(dark),

  AppRootProps: {
    config: defaultConfig(dark),
    onActionAddRequest: () => {},
  } as AppRootProps,
})
