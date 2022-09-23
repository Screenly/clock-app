import { Hono } from 'hono'
// import { cache } from 'hono/cache'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/serve-static.module'
import { jsx } from 'hono/jsx'

import App from './components/App'

const app = new Hono()

app.use('*', logger())
app.use('/static/*', serveStatic({ root: './' }))

app.get('/', async (c) => {
  const env = c.env.ENV
  const userAgent = c.req.header('user-agent')
  const isScreenlyViewerReq = userAgent.includes('screenly-viewer')

  const country = c.req.cf.country

  const response = new Response(<App env={env} country={country} showCTA={!isScreenlyViewerReq} />, {
    status: 200,
    headers: {
      'Cache-Control': 'maxage=43200',
      'Content-Type': 'text/html; charset=UTF-8'
    }
  })
  
  return response
})

//app.get('*', cache({ cacheName: 'default', cacheControl: 'max-age=43200' }))

export default app