// @ts-nocheck
import { lazy } from 'react';
import { ModeEnum } from '@decision-agent/components/DecisionAgent/types';
import { createRouteApp } from '@decision-agent/utils/qiankun-entry-generator';

const routeComponents = {
  DecisionAgent: lazy(() => import('@decision-agent/components/DecisionAgent')),
  AgentConfig: lazy(() => import('@decision-agent/components/AgentConfig')),
  AgentUsage: lazy(() => import('./AgentUsage')),
  AgentDetail: lazy(() => import('@decision-agent/components/AgentDetail')),
};

const routes = [
  {
    path: '/',
    element: <routeComponents.DecisionAgent mode={ModeEnum.MyAgent} />,
  },
  {
    path: '/config',
    element: <routeComponents.AgentConfig />,
  },
  {
    path: '/usage',
    element: <routeComponents.AgentUsage />,
  },
  {
    path: '/detail/:id',
    element: <routeComponents.AgentDetail />,
  },
  {
    path: '/template-detail/:id',
    element: <routeComponents.AgentDetail isTemplate={true} />,
  },
];

const { bootstrap, mount, unmount } = createRouteApp(routes);
export { bootstrap, mount, unmount };
