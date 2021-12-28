import 'normalize.css'
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper } from 'components/AppWrapper'
import { UserProvider } from '@auth0/nextjs-auth0'

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
