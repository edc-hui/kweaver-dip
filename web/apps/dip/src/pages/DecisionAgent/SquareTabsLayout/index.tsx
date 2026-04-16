import GradientContainer from '@decision-agent/components/GradientContainer'
import classNames from 'classnames'
import { Tabs, type TabsProps } from 'antd'
import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { buildBusinessNetworkPath } from '@/components/Sider/BusinessSider/menus'
import { DecisionAgentSquareTabKey } from '../types'
import styles from './index.module.less'

const squareBasePath = buildBusinessNetworkPath('/agent-square')

const SquareTabsLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const tabHeaderRef = useRef<HTMLDivElement | null>(null)
  const [tabHeaderHeight, setTabHeaderHeight] = useState(0)

  const items = useMemo<TabsProps['items']>(
    () => [
      { key: DecisionAgentSquareTabKey.DataAgent, label: '决策智能体' },
      { key: DecisionAgentSquareTabKey.Template, label: '模板' },
      { key: DecisionAgentSquareTabKey.Api, label: 'API' },
    ],
    []
  )

  const activeKey = useMemo(() => {
    if (location.pathname.includes(`/${DecisionAgentSquareTabKey.Template}`)) {
      return DecisionAgentSquareTabKey.Template
    }
    if (location.pathname.includes(`/${DecisionAgentSquareTabKey.Api}`)) {
      return DecisionAgentSquareTabKey.Api
    }
    return DecisionAgentSquareTabKey.DataAgent
  }, [location.pathname])

  const layoutStyle = useMemo(
    () =>
      ({
        ['--decision-agent-tab-header-height' as string]: `${tabHeaderHeight}px`,
      }) as CSSProperties,
    [tabHeaderHeight]
  )

  const isDataAgentTab = activeKey === DecisionAgentSquareTabKey.DataAgent

  useEffect(() => {
    const tabHeaderElement = tabHeaderRef.current

    if (!tabHeaderElement) {
      return
    }

    const updateTabHeaderHeight = () => {
      setTabHeaderHeight(tabHeaderElement.getBoundingClientRect().height)
    }

    updateTabHeaderHeight()

    const resizeObserver = new ResizeObserver(() => {
      updateTabHeaderHeight()
    })

    resizeObserver.observe(tabHeaderElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const handleChange = (key: string) => {
    navigate(`${squareBasePath}/${key}`)
  }

  return (
    <GradientContainer className={styles.squareTabsLayout} style={layoutStyle}>
      <div ref={tabHeaderRef} className={styles.tabHeader}>
        <Tabs activeKey={activeKey} items={items} onChange={handleChange} />
      </div>
      <div
        className={classNames(styles.tabContent, {
          [styles.dataAgentTabContent]: isDataAgentTab,
        })}
      >
        <Outlet />
      </div>
    </GradientContainer>
  )
}

export default SquareTabsLayout
