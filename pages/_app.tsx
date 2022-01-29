import { UserProvider } from '@auth0/nextjs-auth0'
import { AppWrapper } from 'components/layout'
import { InspectorContextProvider, PortalContextProvider } from 'contexts'
import type { AppProps } from 'next/app'
import 'normalize.css'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PortalContextProvider>
      <InspectorContextProvider>
        <UserProvider>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </UserProvider>
      </InspectorContextProvider>
    </PortalContextProvider>
  )
}

export default MyApp
