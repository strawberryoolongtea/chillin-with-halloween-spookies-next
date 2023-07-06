import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (navigator.userAgent.match("KAKAOTALK")) {
      router.push(`kakaotalk://web/openExternal?url=${encodeURIComponent(window.location.href)}`);
    }
  }, [router])
  return <Component {...pageProps} />
}
