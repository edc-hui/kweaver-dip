// @ts-nocheck
import { createContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { businessLeafMenuItems, buildBusinessNetworkPath } from '@/components/Sider/BusinessSider/menus'
import { createNavigateToMicroWidgetHandler } from '@/pages/_shared/menu-workbench/navigateToMicroWidget'
import {
  buildMicroWidgetUserInfoPayload,
  mapWorkbenchLanguage,
} from '@/pages/_shared/menu-workbench/isfUserContext'
import { getMenuWorkbenchBasePathByMicroWidgetName } from '@/pages/_shared/menu-workbench/getBasePathByMicroWidgetName'
import { useLanguageStore, useUserInfoStore } from '@/stores'
import { useGlobalLayoutStore } from '@/stores/globalLayoutStore'
import { themeColors } from '@/styles/themeColors'
import { getFullPath } from '@/utils/config'
import { defaultRefreshToken, getAccessToken, getRefreshToken, httpConfig } from '@/utils/http/token-config'

export const MicroWidgetContext = createContext(null)

const myAgentsBasePath = buildBusinessNetworkPath('/my-agents')
const squareBasePath = buildBusinessNetworkPath('/agent-square')
const decisionAgentRouteMap: Record<string, string> = {
  'my-agent-list': myAgentsBasePath,
  'agent-square': squareBasePath,
  'agent-web-dataagent': squareBasePath,
}

const useMicroWidgetProps = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const { userInfo } = useUserInfoStore()

  return useMemo(() => {
    const currentBasePath = location.pathname.startsWith(squareBasePath) ? squareBasePath : myAgentsBasePath
    const mappedLanguage = mapWorkbenchLanguage(language)
    const theme = themeColors.primary
    const userInfoPayload = buildMicroWidgetUserInfoPayload(userInfo ?? undefined)
    const fallbackNavigateToMicroWidget = createNavigateToMicroWidgetHandler(
      businessLeafMenuItems,
      navigate,
      currentBasePath
    )
    const navigateToMicroWidget = (params) => {
      const targetBasePath = decisionAgentRouteMap[params.name]
      if (!targetBasePath) {
        fallbackNavigateToMicroWidget(params)
        return
      }

      const targetPath = targetBasePath + (params.path || '')
      if (params.isNewTab) {
        const url = `${window.location.origin}${getFullPath(targetPath)}`
        window.open(url, '_blank', 'noopener,noreferrer')
        return
      }

      if (targetBasePath === currentBasePath) {
        navigate(targetPath)
        navigate(0)
        return
      }

      navigate(targetPath)
    }

    return {
      businessDomainID: 'bd_public',
      userid: userInfo?.id ?? '',
      userInfo: userInfoPayload,
      theme,
      navigate,
      toggleSideBarShow: (show: boolean) => {
        useGlobalLayoutStore.getState().setBusinessSiderHidden(!show)
      },
      changeCustomPathComponent: (param: { label: string } | null) => {
        useGlobalLayoutStore.getState().setBusinessHeaderCustomBreadcrumbLabel(param?.label ?? null)
      },
      config: {
        systemInfo: {
          location: window.location,
        },
        getTheme: {
          normal: theme,
        },
        userInfo: userInfoPayload,
      },
      language: {
        getLanguage: mappedLanguage,
      },
      token: {
        getToken: {
          get access_token() {
            return getAccessToken()
          },
          get refresh_token() {
            return getRefreshToken()
          },
        },
        refreshOauth2Token: async () => {
          const { accessToken } = await defaultRefreshToken()
          return {
            access_token: accessToken,
          }
        },
        onTokenExpired: httpConfig.onTokenExpired,
      },
      history: {
        getBasePath: getFullPath(currentBasePath),
        getBasePathByName: async (microWidgetName: string) => {
          const targetBasePath = decisionAgentRouteMap[microWidgetName]
          if (targetBasePath) {
            return getFullPath(targetBasePath)
          }

          return getMenuWorkbenchBasePathByMicroWidgetName(businessLeafMenuItems, microWidgetName)
        },
        navigateToMicroWidget,
      },
    }
  }, [language, location.pathname, navigate, userInfo])
}

export default useMicroWidgetProps
