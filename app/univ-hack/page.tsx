"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const Page: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

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
    <div className="px-24 py-7">
      <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
        授業内開発
      </h1>
      <p className="mt-4">大学の授業内での開発経験について書いています。</p>
      <div className="mt-5 flex justify-center space-x-4">
        <Button>研究開発リテラシー</Button>
        <Button>PBL概論</Button>
      </div>
      <div className="mt-6">
        <h1 className="text-2xl underline">研究開発リテラシー🚀</h1>
        <div className="mt-10">
          <p className="font-bold">＜授業の概要＞</p>
          チームとしてソフトウェア開発をする際の基本的な事項について理解し実践できることを目的としている授業です。
          <br />
          <p>
            githubの基本的な使い方（コミット、プッシュ、プルリクエスト、マージ）や、HTMLとCSSとJavaScriptを用いたWebサイトの作り方を学びました。
            <br />
            最終成果物として、チームでWebサイトを作成しました。
          </p>
        </div>
        <div className="mt-7">
          <p className="font-bold">＜チーム開発について＞</p>
          私のチームは3人で構成されており、全員初対面の状態でした。
          <br />
          成果物のテーマが自由であったため、チームメンバーの意見を聞きながら、最終的には「大学生が作る猫に癒されるサイト」をテーマに決めました。
          当時の私は、Webサイトの作成経験がなかったため、チームメンバーで協力しながら作成しました。
          <div
            ref={imgRef}
            className={`mt-4 transition-opacity duration-500 flex justify-center ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/kekyu-dev.png"
              alt="cat Image"
              width={550}
              height={550}
              layout="intrinsic"
              className="mb-4 rounded-md shadow-md bg-black"
            />
          </div>
        </div>
        <div className="mt-7">
          <p className="font-bold">＜学んだこと＞</p>
          <p>
            ・githubの基本的な使い方---ブランチを切って開発することでmasterブランチを保護して開発を進める重要性を学びました。
          </p>
          <p>
            ・HTMLとCSSとJavaScriptを用いたWebサイトの作り方---普段何気なく見ているWebサイトがどのような構造でできているかを知ることができ、その後のWebアプリケーション開発においても役立ちました。
          </p>
          <p>
            ・チーム開発の進め方---チームで分担をして一つの成果物を作ることが非常に大変だということを学びました。
          </p>
          <div className="mt-8 flex justify-center items-center gap-4 ">
            <p>Git Repository</p>
            <br />
            <Link href="https://github.com/kameiryohei/group13">
              <Button>Click here</Button>
            </Link>
            <Link href="https://kameiryohei.github.io/group13/">
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
        <h1 className="text-2xl underline">PBL概論🌟</h1>
        <div className="mt-10">
          <p className="font-bold">＜授業の概要＞</p>
          チームとしてソフトウェア開発をする際の基本的な事項について理解し実践できることを目的としている授業です。
          <br />
          <p>
            githubの基本的な使い方（コミット、プッシュ、プルリクエスト、マージ）や、HTMLとCSSとJavaScriptを用いたWebサイトの作り方を学びました。
            <br />
            最終成果物として、チームでWebサイトを作成しました。
          </p>
        </div>
        <div className="mt-7">
          <p className="font-bold">＜チーム開発について＞</p>
          私のチームは3人で構成されており、全員初対面の状態でした。
          <br />
          成果物のテーマが自由であったため、チームメンバーの意見を聞きながら、最終的には「大学生が作る猫に癒されるサイト」をテーマに決めました。
          当時の私は、Webサイトの作成経験がなかったため、チームメンバーで協力しながら作成しました。
        </div>
        <div
          ref={pblImgRef}
          className={`mt-7 transition-opacity duration-500 flex justify-center ${
            isPblImageVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/pbl-photo.png"
            alt="PBL Image"
            width={550}
            height={550}
            layout="intrinsic"
            className="mb-4 rounded-md shadow-md bg-black"
          />
        </div>
        <div className="mt-7">
          <p className="font-bold">＜学んだこと＞</p>
          <p>
            ・githubの基本的な使い方---ブランチを切って開発することでmasterブランチを保護して開発を進める重要性を学びました。
          </p>
          <p>
            ・HTMLとCSSとJavaScriptを用いたWebサイトの作り方---普段何気なく見ているWebサイトがどのような構造でできているかを知ることができ、その後のWebアプリケーション開発においても役立ちました。
          </p>
          <p>
            ・チーム開発の進め方---チームで分担をして一つの成果物を作ることが非常に大変だということを学びました。
          </p>
          <div className="mt-8 flex justify-center items-center gap-4 ">
            <p>Git Repository</p>
            <br />
            <Link href="https://github.com/kameiryohei/pbl-t1-project">
              <Button>Click here</Button>
            </Link>
            <Link href="https://pbl-t1-project.vercel.app/">
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
    </div>
  );
};

export default Page;
