import server from './app/app.js'
import { apiConfig } from './config/apiConfig.js'

server.listen(apiConfig.PORT, () => {
  const text = `Server running in: ${apiConfig.API_URL}`
  console.log(text)
})
