import { Fragment, useEffect, useState } from "react";
import { questions } from "@/data/question";
import styles from "../styles/question.module.css";
import Image from "next/image";
import Head from "next/head";

export default function Question () {
  const [number, setNumber] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [count, setCount] = useState({
    i: 0,
    e: 0,
    s: 0,
    n: 0,
    t: 0,
    f: 0,
    j: 0,
    p: 0,
  })
  let message = "내 안에 숨어있는 공포 영화 속 빌런은 누구일까요?"
  const handleChangeNumber = (e) => {
    let result = "";
    if (count.i < count.e) {
      result = result + "e";
    } else {
      result = result + "i";
    }

    if (count.s < count.n) {
      result = result + "n";
    } else {
      result = result + "s";
    }
    
    if (count.t < count.f) {
      result = result + "f";
    } else {
      result = result + "t";
    }

    if (count.j < count.p) {
      result = result + "p";
    } else {
      result = result + "j";
    }

    // message += ` ${result}`;
    if (questions.length === number + 1) {
      if (window.confirm(message)) {
        switch (result) {
          case "istj" :
          case "intj" :
            window.location = "/result?type=1";
            break;
          case "isfj" :
          case "isfp" :
          case "infp" :
            window.location = "/result?type=2";
            break;
          case "infj" :
            window.location = "/result?type=3";
            break;
          case "istp" :
          case "entp" :
          case "enfj" :
            window.location = "/result?type=4";
            break;
          case "intp" :
          case "estj" :
          case "entj" :
            window.location = "/result?type=5";
            break;
          case "estp" :
          case "esfp" :
            window.location = "/result?type=6";
            break;
          case "enfp" :
            window.location = "/result?type=7";
            break;
          case "esfj" :
            window.location = "/result?type=8";
            break;
          default : window.location = "/result?type=0";
        }
      }
    } else {
      setNumber((prev) => prev + 1);
      setCount({...count, [e.target.id]: count[e.target.id] + 1});
    }
  }

  useEffect(() => {
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

  useEffect(() => {
    setQuestion(questions[number]);
  }, [number, count])
  return (
    <Fragment>
      <Head>
        <title>Chillin With Halloween Spookies 👻 내 안에 숨어있는 공포 영화 속 빌런 찾기</title>
      </Head>
      <div className={styles.question}>
        <div className={styles.question_progress}>
          <span style={{width: `calc((100% / 12) * ${number + 1})`}}></span>
        </div>
        <div className={styles.question_wrapper}>
          <h1 className={styles.question_title}><Image src={question.imgUrl} alt={question.alt} width={70} height={70} /></h1>
          <h2 className={styles.question_text} dangerouslySetInnerHTML={{__html: question.question}}></h2>
          <ul className={styles.question_list}>
            {question.options.map((option) => {
              return (
                <li className={styles.question_item} id={option.value} key={option.value}>
                  <button id={option.value} onClick={handleChangeNumber} dangerouslySetInnerHTML={{__html: option.text}}></button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  )
}