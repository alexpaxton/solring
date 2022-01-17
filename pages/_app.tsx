import { UserProvider } from '@auth0/nextjs-auth0'
import { AppWrapper } from 'components/AppWrapper'
import type { AppProps } from 'next/app'
import 'normalize.css'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </UserProvider>
  )
}

export default MyApp
