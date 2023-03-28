import { useContext } from 'react'
import { AppContextValue } from '../types'
import { AppContext } from '../contexts/AppContext'

export const useApp = (): AppContextValue => {
  const app = useContext(AppContext)

  if (!app) {
    throw new Error('AppContext is not available')
  }

  return app
}
