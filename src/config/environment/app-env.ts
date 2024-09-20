import { ValueOf } from '@/types'

export enum AppEnvType {
  DEVELOPMENT = 'development',
  TESTING = 'testing',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

export type Env = ValueOf<typeof AppEnvType>
export const ALLOWED_APP_ENVS: Env[] = Object.values(AppEnvType) as Env[]

export type AppEnv = {
  name: string
  env: Env
}
