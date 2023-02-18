import { Alert } from '@peerme/web-ui'

const DocsUrl = 'https://github.com/PeerMeHQ/extensions'

export const DocsNotice = () => (
  <Alert type="info">
    To learn more about the Extensions framework, please refer to{' '}
    <a href={DocsUrl} target="_blank" rel="noopener">
      our documentation
    </a>
    .
  </Alert>
)
