import type { Request, Response, NextFunction } from 'express'

export const logger = (staticFiles: boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const isStatic = req.url.match(
      /\.(css|js|png|jpg|jpeg|ico|svg|woff|woff2|ttf|eot|mp4|webm|gif)$/
    )

    if (!staticFiles && isStatic) {
      return next()
    }

    const date = new Date()
    const methodColor = setColorMethod(req.method)
    const dayTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    const message = `${dayTime} --> ${setColorText(methodColor, req.method)} statusCode`

    res.on('finish', () => {
      const statusCodeColor = setColorStatusCode(res.statusCode)
      const url = `${req.protocol}://${req.get('host')}${req.originalUrl || req.url}`

      const finalMessage = message.replace(
        'statusCode',
        `| ${setColorText(statusCodeColor, `${res.statusCode}`)} | ${
          isStatic ? setColorText(colors.black, url) : setColorText(statusCodeColor, url)
        }`
      )

      console.log(finalMessage)
      console.log('\r')
    })

    next()
  }
}

export const setColorText = (color: string, text: string) => `${color}${text}${colors.reset}`

export const setColorStatusCode = (statusCode: number) => {
  if (statusCode >= 500) {
    return colors.red
  } else if (statusCode >= 400) {
    return colors.yellow
  } else if (statusCode >= 300) {
    return colors.cyan
  } else if (statusCode >= 200) {
    return colors.green
  } else {
    return colors.white
  }
}

export const setColorMethod = (method: string) => {
  if (method === 'GET') {
    return colors.blue
  } else if (method === 'POST') {
    return colors.magenta
  } else if (method === 'PUT') {
    return colors.cyan
  } else if (method === 'DELETE') {
    return colors.red
  } else {
    return colors.white
  }
}

export const colors = {
  reset: '\x1b[0m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
}
