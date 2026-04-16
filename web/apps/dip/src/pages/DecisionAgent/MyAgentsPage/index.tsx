import DecisionAgent from '@decision-agent/components/DecisionAgent'
import AgentConfig from '@decision-agent/components/AgentConfig'
import AgentDetail from '@decision-agent/components/AgentDetail'
import { ModeEnum } from '@decision-agent/components/DecisionAgent/types'
import AgentUsage from '@decision-agent/pages/my-agents/AgentUsage'
import type { BusinessComponentPageProps } from '@/pages/BusinessNetwork/page-registry'
import { useRoutes } from 'react-router-dom'
import AppShell from '../AppShell'

const MyAgentsPage = (_props: BusinessComponentPageProps) => {
  const element = useRoutes([
    {
      index: true,
      element: <DecisionAgent mode={ModeEnum.MyAgent} />,
    },
    {
      path: 'config',
      element: <AgentConfig />,
    },
    {
      path: 'usage',
      element: <AgentUsage />,
    },
    {
      path: 'detail/:id',
      element: <AgentDetail />,
    },
    {
      path: 'template-detail/:id',
      element: <AgentDetail isTemplate onlyShowPublishedVersion />,
    },
  ])

  return <AppShell>{element}</AppShell>
}

export default MyAgentsPage
