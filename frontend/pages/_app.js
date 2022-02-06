import '../styles/globals.scss'
import '../styles/layout.scss'
import '../styles/items.scss'
import '../styles/item.scss'

import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
