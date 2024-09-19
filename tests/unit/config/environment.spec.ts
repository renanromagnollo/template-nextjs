import { buildEnvironment } from '@/config'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const mockEnv = {
  APP_NAME: 'test-app',
  NEXT_PUBLIC_APP_NAME: 'public_test-app',
  APP_ENV: 'testing',
  NEXT_PUBLIC_APP_ENV: 'testing',
}

describe('Environment', () => {
  beforeEach(() => {
    vi.stubGlobal('process', {
      env: mockEnv
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should return all defined environment variables', async () => {
    const environment = buildEnvironment()

    expect(environment.app.name).toBe(mockEnv.APP_NAME)
    expect(environment.app.env).toBe('testing')

    expect(environment.isTesting()).toBe(true)
    expect(environment.isDevelopment()).toBe(false)
    expect(environment.isProduction()).toBe(false)
    expect(environment.isStaging()).toBe(false)
  })

  it('should be able to determine if the environment is development', () => {
    vi.stubGlobal('process', {
      env: {
        ...mockEnv,
        APP_ENV: 'development',
      }
    })

    const environment = buildEnvironment()

    expect(environment.isDevelopment()).toBe(true)
  })

  it('should return the public app name provided environment when server is not visible/provided', () => {
    vi.stubGlobal('process', {
      env: {
        ...mockEnv,
        APP_NAME: undefined,
      }
    })

    const environment = buildEnvironment()

    expect(environment.app.name).toBe(mockEnv.NEXT_PUBLIC_APP_NAME)
  })

  it('should return the public app env provided environment when server is not visible/provided', () => {
    vi.stubGlobal('process', {
      env: {
        ...mockEnv,
        APP_ENV: undefined,
      }
    })

    const environment = buildEnvironment()

    expect(environment.app.env).toBe('testing')
  })
})
