import DecisionAgent from '@decision-agent/components/DecisionAgent'
import AgentConfig from '@decision-agent/components/AgentConfig'
import AgentDetail from '@decision-agent/components/AgentDetail'
import { ModeEnum } from '@decision-agent/components/DecisionAgent/types'
import AgentUsage from '@decision-agent/pages/my-agents/AgentUsage'
import AgentApiDocument from '@decision-agent/pages/square/AgentApiDocument'
import DolphinLanguageDoc from '@decision-agent/pages/square/DolphinLanguageDoc'
import type { BusinessComponentPageProps } from '@/pages/BusinessNetwork/page-registry'
import { Navigate, useRoutes } from 'react-router-dom'
import AppShell from '../AppShell'
import SquareTabsLayout from '../SquareTabsLayout'
import { DecisionAgentSquareTabKey } from '../types'

const SquarePage = (_props: BusinessComponentPageProps) => {
  const element = useRoutes([
    {
      path: '',
      element: <SquareTabsLayout />,
      children: [
        {
          index: true,
          element: <Navigate replace to={DecisionAgentSquareTabKey.DataAgent} />,
        },
        {
          path: DecisionAgentSquareTabKey.DataAgent,
          element: <DecisionAgent mode={ModeEnum.DataAgent} showBg={false} showHeader={false} />,
        },
        {
          path: DecisionAgentSquareTabKey.Template,
          element: <DecisionAgent mode={ModeEnum.AllTemplate} showBg={false} showHeader={false} />,
        },
        {
          path: DecisionAgentSquareTabKey.Api,
          element: <DecisionAgent mode={ModeEnum.API} showBg={false} showHeader={false} />,
        },
      ],
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
      path: 'dolphin-language-doc',
      element: <DolphinLanguageDoc />,
    },
    {
      path: 'detail/:id',
      element: <AgentDetail />,
    },
    {
      path: 'template-detail/:id',
      element: <AgentDetail isTemplate onlyShowPublishedVersion />,
    },
    {
      path: 'api-doc',
      element: <AgentApiDocument />,
    },
  ])

  return <AppShell>{element}</AppShell>
}

export default SquarePage
