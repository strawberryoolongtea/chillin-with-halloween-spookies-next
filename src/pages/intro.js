import Link from "next/link";
import { Fragment, useEffect } from "react";
import "../styles/intro.module.css";
import Head from "next/head";

export default function IntroPage () {
  useEffect(() => {
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
        <title>Welcome To The Odd Camp 🏕️ 오드 산장에 어서오세요</title>
      </Head>
      <div className="intro">
        <div className="text">
        무더운 여름,<br />
        당신은 오래 전 이벤트를 응모했던<br />
        모 회사에서 봉투를 하나 전달 받는다.<br />
        봉투 안에는 친구 2명과 함께<br />
        {`<오드 산장>`}에 4박 5일 동안<br />
        묵을 수 있는 초대권이 들어 있었고,<br />
        친구들과 함께<br />
        산장으로 떠나게 된다.
        </div>
        <Link href="/question">
          <div className="intro-btn">
            <button>출발하기</button>
          </div>
        </Link>
      </div>
    </Fragment>
  )
}