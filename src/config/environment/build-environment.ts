import { AppEnvType } from './app-env'
import { Environment } from './environment'

export function buildEnvironment(): Environment {
  const appEnv = (process.env.APP_ENV || process.env.NEXT_PUBLIC_APP_ENV) as AppEnvType

  return {
    app: {
      name: (process.env.APP_NAME || process.env.NEXT_PUBLIC_APP_NAME) as string,
      env: appEnv,
    },
    isDevelopment(): boolean {
      return appEnv === AppEnvType.DEVELOPMENT
    },
    isTesting(): boolean {
      return appEnv === AppEnvType.TESTING
    },
    isProduction(): boolean {
      return appEnv === AppEnvType.PRODUCTION
    },
    isStaging(): boolean {
      return appEnv === AppEnvType.STAGING
    },
  }
}
