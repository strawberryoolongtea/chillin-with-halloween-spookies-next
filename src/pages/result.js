import { Fragment, useEffect, useState } from "react"
import Link from "next/link";
import { results } from "@/data/result";
import Head from "next/head";
import styles from "../styles/result.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Result ({character}) {
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
    alert('링크를 복사했어요!\n공포 영화 속 본캐 빌런이 궁금한 친구들에게\n결과를 공유해 보세요 :)');
  }

  const handleClickShare = async () => {
    if (isSupportedShare) {
      await mobileShare();
    } else if (isSupportedClipboard) {
      await copyToClipboard();
    } else {
      const textArea = document.createElement('textarea');
      document.body.appendChild(textArea);
      textArea.value = window.location.href;
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('링크를 복사했어요!\n공포 영화 속 본캐 빌런이 궁금한 친구들에게\n결과를 공유해 보세요 :)');
    }
  }

  const handleClickSave = () => {
    const anchorElement = document.createElement('a');
    document.body.appendChild(anchorElement);
    anchorElement.href = `/images/results/chillin-with-${character.name}.png`;
    anchorElement.download = `chillin-with-${character.name}.png`;

    anchorElement.click();

    document.body.removeChild(anchorElement);

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
        <meta property="og:title" content={character?.ogtitle} />
        <meta property="og:description" content={character?.ogScript} />
        <meta property="og:image" content={character?.ogImg} />
        <meta property="og:url" content={character?.ogUrl} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="Chillin With Halloween Spookies" />
        <meta property="twitter:title" content={character?.ogtitle} />
        <meta property="twitter:description" content={character?.ogScript} />
        <meta property="twitter:image" content={character?.ogImg} />
        <meta property="twitter:url" content={character?.ogUrl} />
        <title>Chillin With Halloween Spookies 🤡 내 안에 숨어있는 공포 영화 속 빌런은 누구일까요?</title>
      </Head>
      <div className={styles.mbti_result}>
        <section className={styles.result_description}>
          <div className={styles.character_name}>
            <Image src={character?.nameImg} alt={`chillin-with-${character?.name}`} fill priority />
          </div>
          <p className={styles.character_script} dangerouslySetInnerHTML={{__html: character?.script}}></p>
          <div className={styles.character_img}>
            <Image src={character?.img} alt={character?.name} fill priority />
          </div>
          <h2>공포 영화 속에서 당신은...</h2>
          <h1 className={styles.character_title} dangerouslySetInnerHTML={{__html: character?.title}}></h1>
          <h2>영화 속에서 {character?.krname}는...</h2>
          <p className={styles.character_description}>
            {character?.description}
          </p>
          <h2>{character?.krname}를 고른 당신의 해시태그는...</h2>
          <ul className={styles.character_hashtag}>
            {character?.hashtags?.map((hashtag) => {
              return (
                <li key={hashtag}>{`#${hashtag}`}</li>
              )
            })}
          </ul>
          <h2>팀 사이드가 만드는 호러 매거진 오드 2호를<br /> 소장하고 싶다면?</h2>
          <div className={styles.tumblebug}>
            <div className={styles.character_img}>
              <Image src="/images/cover-mockup.png" alt={character?.name} fill priority />
            </div>
            <Link href="https://link.tumblbug.com/LGcIBfuceBb">
              <button>오드 2호 펀딩하러 GO</button>
            </Link>
          </div>
        </section>
        <section className={styles.result_btns}>
          <button className={styles.btn_red} onClick={handleClickShare}>결과 공유하기</button>
          <button className={styles.btn_red} onClick={handleClickSave}>이미지 저장하기</button>
          <Link href="/">
            <button className={styles.btn_gray}>다시 테스트하기</button>
          </Link>
        </section>
      </div>
    </Fragment>
  )
}

export const getServerSideProps = async ({query}) => {
  const character = results.filter(result => result.type === query.type)[0]
  return {
    props: { character },
  };
};