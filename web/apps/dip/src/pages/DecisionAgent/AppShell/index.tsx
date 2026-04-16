import '@aishu-tech/components/dist/dip-components.min.css'
import '@decision-agent/assets/graphIcons/iconfont.css'
import '@decision-agent/styles/main.less'
import { Spin } from 'antd'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'
import { useDecisionAgentAppInit } from '../useDecisionAgentAppInit'
import styles from './index.module.less'

const AppShell = ({ children }: PropsWithChildren) => {
  const isReady = useDecisionAgentAppInit()

  return (
    <div id="agent-web" className={classNames('DecisionAgentAppShell', styles.appShell)}>
      {isReady ? (
        children
      ) : (
        <div className={styles.loadingContainer}>
          <Spin />
        </div>
      )}
    </div>
  )
}

export default AppShell
