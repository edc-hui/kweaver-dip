import { App as AntdApp } from 'antd'
import { useEffect, useState } from 'react'
import { apis } from '@aishu-tech/components/dist/dip-components.min'
import { initAdMonacoEditor } from '@decision-agent/components/Editor/AdMonacoEditor/assitants'
import { setConfig } from '@decision-agent/utils/http'
import { LangType } from '@decision-agent/utils/http/types'
import { mapWorkbenchLanguage } from '@/pages/_shared/menu-workbench/isfUserContext'
import { useLanguageStore } from '@/stores/languageStore'
import { themeColors } from '@/styles/themeColors'
import { defaultRefreshToken, getAccessToken, httpConfig } from '@/utils/http/token-config'

const getCurrentPort = () => {
  if (window.location.port) {
    return Number(window.location.port)
  }

  return window.location.protocol === 'https:' ? 443 : 80
}

export const useDecisionAgentAppInit = () => {
  const { message } = AntdApp.useApp()
  const { language } = useLanguageStore()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(false)

    const theme = themeColors.primary
    const lang = mapWorkbenchLanguage(language) as LangType
    const getToken = () => getAccessToken()
    const refreshToken = async () => {
      const { accessToken } = await defaultRefreshToken()
      return {
        access_token: accessToken,
      }
    }
    const popupContainer = document.getElementById('dip-kweaver-root') || document.body
    const protocol = window.location.protocol
    const host = window.location.hostname
    const port = getCurrentPort()

    setConfig({
      protocol,
      host,
      port,
      lang,
      prefix: '',
      getToken,
      refreshToken,
      onTokenExpired: httpConfig.onTokenExpired,
      toast: message,
      theme,
      businessDomainID: 'bd_public',
    })

    apis.setup({
      protocol,
      host,
      port,
      lang,
      prefix: '',
      getToken,
      refreshToken,
      onTokenExpired: httpConfig.onTokenExpired,
      theme,
      popupContainer,
    })

    initAdMonacoEditor()

    setIsReady(true)
  }, [language, message])

  return isReady
}
