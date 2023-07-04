import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import "../styles/main.module.css";

export default function Home() {
  const [isSupportedShare, setIsSupportedShare] = useState();
  const [isSupportedClipboard, setIsSupportedClipboard] = useState();

  async function mobileShare() {
    await navigator.share({
      title: '내 안에 숨어있는 공포 영화 속 빌런 찾기!',
      text: '내 안에 숨어있는 공포 영화 속 빌런 본캐를 찾아보세요!',
      url: window.location.href
    })
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(window.location.href);
    alert('링크를 복사했어요!\n공포 영화 속 본캐 빌런이 궁금한 친구들에게\n테스트를 공유해 보세요 :)');
  }
  
  const handleClickShare = async () => {
    if (isSupportedShare) {
      await mobileShare();
    } else if (isSupportedClipboard) {
      await copyToClipboard();
      return;
    } else {
      const textArea = document.createElement('textarea');
      document.body.appendChild(textArea);
      textArea.value = window.location.href;
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('링크를 복사했어요!\n공포 영화 속 본캐 빌런이 궁금한 친구들에게\n테스트를 공유해 보세요 :)');
    }
  }
  useEffect(() => {
    setIsSupportedShare(!!navigator.share);
    setIsSupportedClipboard(!!navigator.clipboard);
    window.scrollTo(0, 0);
    (function(d) {
      var config = {
        kitId: 'ecp2fsx',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  }, [])
  return (
    <Fragment>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Chillin With Halloween Spookies" />
        <meta property="og:title" content="Chillin With Halloween Spookies" />
        <meta property="og:description" content="내 안에 숨어있는 공포 영화 속 빌런을 찾으러 GO" />
        <meta property="og:image" content="/images/readme/thumbnail.jpg" />
        <meta property="og:url" content="https://www.odd-scythe.com/" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="Chillin With Halloween Spookies" />
        <meta property="twitter:title" content="Chillin With Halloween Spookies" />
        <meta property="twitter:description" content="내 안에 숨어있는 공포 영화 속 빌런을 찾으러 GO" />
        <meta property="twitter:image" content="/images/readme/thumbnail.jpg" />
        <meta property="twitter:url" content="https://www.odd-scythe.com/" />
        <title>Chillin With Halloween Spookies 🎃 내 안에 숨어있는 공포 영화 속 빌런을 찾으러 GO</title>
      </Head>
      <div className="container">
        <div className="title-wrapper">
          <div className="title"><Image src="/images/title.png" alt="chillin with halloween spookies" fill /></div>
          <h2 className="subtitle">내 안에 숨어있는 공포 영화 속 빌런</h2>
        </div>
        <div className="btns-wrapper">
          <Link href="/intro">
            <button className="main-btns btn-red">본캐 찾으러 GO</button>
          </Link>
          {/* <button className="main-btns btn-gray" onClick={handleClickShare}>주변에 알리기</button> */}
          {
            !isSupportedShare && !isSupportedClipboard ? null :
            <button className="main-btns btn-gray" onClick={handleClickShare}>주변에 알리기</button>
          }
        </div>
      </div>
    </Fragment>
  )
}
