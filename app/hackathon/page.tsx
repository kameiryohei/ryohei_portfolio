"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hackathon: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  const pblImgRef = useRef(null);
  const [isPblImageVisible, setIsPblImageVisible] = useState(false);

  useEffect(() => {
    const pblObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPblImageVisible(true);
          pblObserver.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    if (pblImgRef.current) {
      pblObserver.observe(pblImgRef.current);
    }

    return () => {
      pblObserver.disconnect();
    };
  }, []);

  return (
    <div className="lg:p-24 p-8 mt-24">
      <h1 className="font-bold text-3xl bg-gradient-to-r from-green-300 to-pink-500 bg-clip-text text-transparent">
        課外活動（ハッカソン）
      </h1>
      <p className="mt-4">
        課外活動として参加したハッカソンについて書いています
      </p>
      <div className="mt-5 flex justify-center space-x-4">
        <Button>Hack Summer東海</Button>
        <Button>Hack U名城</Button>
      </div>
      <div className="mt-6">
        <h1 className="text-2xl underline">Hack Summer東海</h1>
        <div className="mt-10">
          <p className="font-bold">＜ハッカソンの概要＞</p>
          このハッカソンは２０２３年の夏に名古屋で開催されたオフライン型のハッカソンで、名古屋の学生エンジニアの方が主催されているものです
          <br />
          <p>
            このハッカソンは初心者向けのハッカソンで、参加者は26卒や27卒の方が多く、初めてのハッカソンに参加する人が多かったです。私もハッカソン初参加でした。
          </p>
        </div>
        <div className="mt-7">
          <p className="font-bold">＜参加しようと思った理由＞</p>
          当時の私は、研究開発リテラシーでHTMLとCSSとJavaScriptを用いた簡易的なWebサイトを作成した後であり、Webの世界に興味を持っていました。
          <br />
          自分の技術力を高めるためには、ハッカソンに参加することが一番良いと考え、参加しようと思いました。
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/hacksummer.jpg"
            alt="Hack Summer Image"
            width={250}
            height={550}
            className="mb-4 mt-4 rounded-md shadow-md bg-black mx-auto"
          />
        </motion.div>

        <div className="mt-7">
          <p className="font-bold">＜学んだこと＞</p>
          <p>
            ●モダンな技術を用いたWebアプリケーションの開発---私のチームはReactとFirebaseを用いてWebアプリケーションを開発しました。また、他のチームの成果物を見ることで、モバイルアプリ開発や、機械学習を用いた開発など、様々な技術を用いた開発を見ることができました。
          </p>
          <p>
            ●チーム開発の進め方---チーム内での分担（フロントエンド、バックエンド、デザイン）を行い、一つの成果物を作成することが非常に大変だということを学びました。
          </p>
          <div className="mt-8 flex justify-center items-center gap-4 ">
            <p>Git Repository</p>
            <br />
            <Link href="https://github.com/tsuki917/uni-life-admin">
              <Button>Click here</Button>
            </Link>
            <Link href="https://uni-life-admin.vercel.app/">
              <Image
                src="/git-icon.png"
                alt="git Image"
                width={100}
                height={100}
                className="mb-4 rounded-md shadow-md bg-black"
              />
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="">
        <h1 className="text-2xl underline">Hack U名城</h1>
        <div className="mt-10">
          <p className="font-bold">＜ハッカソンの概要＞</p>
          2023年11月から12月にかけてに名城大学で開催されたオフライン型型のハッカソンで、名城大学の学生なら誰でも参加できるものです。
          <br />
          <p>
            情報工学部だけでなく、文系の学生や他のキャンパスの学生も参加しており、非常に刺戟を受けました。
            <br />
            主催がLINEヤフーであったため、手厚いサポートを受けることが出来ました。
          </p>
        </div>

        <div className="mt-7">
          <p className="font-bold">＜参加理由など＞</p>
          去年、HackU名城が開催されているのを知っており、今年開催されるのであれば参加したいと思っていました。
          <br />
          私のチームは、私の友人1人と、情報工学科の3年生の方3人という構成でした。
        </div>
        <div
          ref={pblImgRef}
          className={`mt-7 transition-opacity duration-500 flex justify-center ${
            isPblImageVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/hacku.png"
            alt="PBL Image"
            width={350}
            height={550}
            layout="intrinsic"
            className="mb-4 rounded-md shadow-md bg-black"
          />
        </div>
        <div className="mt-7">
          <p className="font-bold">＜学んだこと＞</p>
          <p>
            ・複数人での開発---私のチームは、全員がエンジニア担当であったので開発の進捗を管理することが難しかったです。そのため、事前の役割分担と、開発の進捗を細かく管理することが重要だと学びました。
          </p>
          <p>
            ・初めて触れる技術の挑戦---Next.jsとFirebaseを使って実装したのですが、Next.jsは初めて触れた技術であったため、開発に時間がかかってしまいました。そのため、ハッカソンに参加する際は、事前に技術の勉強をしておくことが重要だと学びました。
          </p>
          <p>
            ・デザインの重要性---私のチームは、デザインを担当する人がいなかったため、開発に着手する作業に時間がかかりました。
          </p>
          <div className="mt-8 flex justify-center items-center gap-4 ">
            <p>Git Repository</p>
            <br />
            <Link href="https://github.com/IronRiver/gourmeijo">
              <Button>Click here</Button>
            </Link>
            <Link href="https://gourmeijo.vercel.app/">
              <Image
                src="/git-icon.png"
                alt="git Image"
                width={100}
                height={100}
                className="mb-4 rounded-md shadow-md bg-black"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-2xl font-bold">今後の展望</p>
        <div className="mt-6">
          <p>
            今後は、個人開発に力を入れて、何かしらの成果物を一つ作り上げたいと考えています。
          </p>
          <p>
            バックエンドの技術についても学ぶ。現在はFirebaseを用いた簡易的なバックエンドの構築しかできないため、バックエンドの仕組みに興味があります。
            具体的には、Kotlinを用いたサーバーサイドの処理を学びたいと考えています。
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hackathon;
