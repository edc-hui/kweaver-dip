import { BASE_PATH } from '@/utils/config'
import type { MenuWorkbenchLeafItem } from './types'

export const resolveMicroWidgetMenuNameAlias = (microWidgetName: string): string => {
  if (microWidgetName === 'agent-web-dataagent') return 'agent-square'
  if (microWidgetName === 'my-agent-list') return 'decision-agent-list'
  return microWidgetName
}

/** 从菜单叶子中按 micro-app 的 app.name 解析主应用下的完整 base path */
export async function getMenuWorkbenchBasePathByMicroWidgetName(
  leafMenuItems: MenuWorkbenchLeafItem[],
  microWidgetName: string,
): Promise<string> {
  const newName = resolveMicroWidgetMenuNameAlias(microWidgetName)

  const routeComponentKeyMap: Record<string, string> = {
    'agent-square': 'decision-agent-square',
    'decision-agent-list': 'decision-agent-list',
  }

  const item = leafMenuItems.find((menuItem) => {
    if (menuItem.page?.type === 'micro-app') {
      return menuItem.page.app.name === newName
    }

    if (menuItem.page?.type === 'component') {
      const expectedComponentKey = routeComponentKeyMap[newName]
      return Boolean(expectedComponentKey) && menuItem.page.componentKey === expectedComponentKey
    }

    return false
  })

  if (!item) return ''
  return `${BASE_PATH}${item.path}`
}
