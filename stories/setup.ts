import { AppRootProps } from '../src/types'

export const Setup = {
  AppRootProps: {
    config: {
      network: 'devnet',
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
    },
    onActionAddRequest: () => {},
  } as AppRootProps,
}
