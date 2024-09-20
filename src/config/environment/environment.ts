import { AppEnv } from './app-env'

export type Environment = {
  app: AppEnv
  isDevelopment(): boolean
  isTesting(): boolean
  isProduction(): boolean
  isStaging(): boolean
}
