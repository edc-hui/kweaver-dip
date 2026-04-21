import { buildBusinessNetworkPath } from '@/components/Sider/BusinessSider/menus'
import { BASE_PATH } from '@/utils/config'

const myAgentsBasePath = buildBusinessNetworkPath('/my-agents')
const squareBasePath = buildBusinessNetworkPath('/agent-square')
const decisionAgentPublicBasePath = '/decision-agent'

export const getDecisionAgentBasePath = (pathname: string): string =>
  pathname.startsWith(squareBasePath) ? squareBasePath : myAgentsBasePath

export const buildDecisionAgentRoutePath = (pathname: string, suffix = ''): string => {
  const basePath = getDecisionAgentBasePath(pathname)

  if (!suffix) {
    return basePath
  }

  if (suffix.startsWith('?')) {
    return `${basePath}${suffix}`
  }

  if (suffix.startsWith('/')) {
    return `${basePath}${suffix}`
  }

  return `${basePath}/${suffix}`
}

export const getDecisionAgentPublicAssetPath = (suffix = ''): string => {
  if (!suffix) {
    return decisionAgentPublicBasePath
  }

  if (suffix.startsWith('/')) {
    return `${decisionAgentPublicBasePath}${suffix}`
  }

  return `${decisionAgentPublicBasePath}/${suffix}`
}

export const normalizeDecisionAgentReturnPath = (path?: string | null): string => {
  if (!path) {
    return '/studio/home'
  }

  let normalizedPath = path

  if (normalizedPath.startsWith(BASE_PATH)) {
    normalizedPath = normalizedPath.slice(BASE_PATH.length) || '/'
  }

  if (!normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`
  }

  if (normalizedPath === '/business-network/vega') {
    return '/business-network/vega/ontology'
  }

  return normalizedPath
}
