import { AppRootProps } from '../../src/types'
import { useApp } from '../../src/hooks/useApp'
import { AppSection } from '../../src/ui/extension/AppSection'

export const Itheum = (props: AppRootProps) => {
  const app = useApp(props)

  const handleSubmit = () => {
    // app.requestProposalAction()
  }

  return (
    <div>
      <AppSection title="Custom Title">Custom content</AppSection>
    </div>
  )
}
