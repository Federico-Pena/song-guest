import supertest from 'supertest'
import { afterAll, describe, expect, test, vi } from 'vitest'
import app from '../../src/app/app.js'
import { apiConfig } from '../../src/config/apiConfig.js'
import {
  colors,
  setColorMethod,
  setColorStatusCode,
  setColorText
} from '../../src/middlewares/logger.js'

const apiUrl = apiConfig.API_ROUTES.someRoutes.route1

describe('Logger Middleware', () => {
  const logSpy = vi.spyOn(console, 'log')

  test('should log request details to the console', async () => {
    const { statusCode, request }: { statusCode: number; request: any } =
      await supertest(app).get(apiUrl).expect(200)
    const date = new Date()
    const methodColor = setColorMethod(request.method)
    const statusCodeColor = setColorStatusCode(statusCode)

    const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} -->`
    const methodString = setColorText(methodColor, request.method)
    const statusCodeString = setColorText(statusCodeColor, `${statusCode}`)
    const urlString = setColorText(statusCodeColor, request.url)

    const consoleMessage = `${dateString} ${methodString} | ${statusCodeString} | ${urlString}`

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(consoleMessage))
  })

  afterAll(() => {
    logSpy.mockRestore()
  })
})
