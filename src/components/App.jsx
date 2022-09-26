import { jsx } from 'hono/jsx'
import Layout from './Layout'
import Header from './Header'
import Footer from './Footer'
import { sentryIds, gaIds } from '../constants'

const App = (props) => {
  const { env, country } = props
  const sentryId = sentryIds[env]
  const gaId = gaIds[env]
  return (
    <Layout country={country} sentryId={sentryId} gaId={gaId}>
      <div class='content'>
        <Header />
        <Footer />
      </div>
    </Layout>
  )
}

export default App
