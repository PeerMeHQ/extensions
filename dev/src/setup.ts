import { AppNetwork, UserPrivate } from '@peerme/core-ts'
import { ExtensionConfig } from '@peerme/extensions'

const DemoDaoScAddress = 'erd1qqqqqqqqqqqqqpgqg8t3yh3hr5vxpgsrwwqf3qh0v7e6ydd327rschchqc'

const DefaultNetwork: AppNetwork = {
  name: 'multiversx',
  displayName: 'MultiversX',
  env: 'devnet',
  urls: {
    api: 'https://devnet-api.multiversx.com',
    explorer: 'https://devnet-explorer.multiversx.com',
  },
  chainId: 'D',
  blockTimeMs: 6000,
}

const defaultConfig = (dark: boolean, currentUserAddress: string | null): ExtensionConfig => ({
  network: DefaultNetwork,

  dark,

  hasEarlyAccess: true,

  searchConfig: {
    HostUrl: '',
    ApiKey: '',
    Indexes: {
      Users: () => 'users',
      Entities: () => 'entities',
      Proposals: () => 'proposals',
    },
  },

  entity: {
    address: currentUserAddress || DemoDaoScAddress,
    slug: 'my-dao',
    name: 'MyDAO',
    description: 'A DAO for testing purposes.',
    avatarUrl: '#',
    headerImageUrl: null,
    verified: false,
    private: false,
    template: 'default',
    specialization: null,
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
      restrictedNonces: [],
    },
    leaders: 1,
    level: 0,
    credits: null,
    callerRoles: [],
    parent: null,
    children: [],
    pipeline: null,
    favorited: false,
    network: DefaultNetwork,
    kyc: null,
  },

  user: {
    address: currentUserAddress,
    username: null,
    name: 'Alice',
    email: null,
    hasVerifiedEmail: false,
    hasProfileImage: false,
    profileImageUrl: '',
    connections: {} as any,
    power: 0,
    country: null,
    timezone: null,
    justCreated: false,
    boosterUntil: null,
    experience: {
      level: 0,
      levelUpperLimit: '100',
      levelProgressPercent: 0,
    },
    trust: 1,
    affiliate: null,
  } as UserPrivate,
})

export const Setup = (dark: boolean, currentUserAddress: string | null) => ({
  Config: defaultConfig(dark, currentUserAddress),
})
