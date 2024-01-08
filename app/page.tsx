"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// 天気情報の型を定義
interface Weather {
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

export default function Home() {
  const [lineVisible, setLineVisible] = useState(false);
  const [weather1, setWeather1] = useState<Weather | null>(null);
  const [weather2, setWeather2] = useState<Weather | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    setLineVisible(true);
  }, []);

  // 天気APIのエンドポイントとAPIキーを設定 APIを再度叩くときはコメントアウトを外す　ここから
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  // 名城大学の緯度経度
  const lat1 = 35.1356448;
  const lon1 = 136.97606831;

  // 東京都千代田区の緯度経度（適切な値に変更してください）
  const lat2 = 35.6895;
  const lon2 = 139.6917;

  function getWeatherIconUrl(iconName: string): string {
    return `https://openweathermap.org/img/wn/${iconName}.png`;
  }

  // レスポンスからアイコンのURLを取得
  if (weather1) {
    const iconUrl = getWeatherIconUrl(weather1.weather[0].icon);
    console.log("アイコンのURL:", iconUrl);
  }
  if (weather2) {
    const iconUrl = getWeatherIconUrl(weather2.weather[0].icon);
    console.log("アイコンのURL:", iconUrl);
  }

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        // 名城大学の天気情報を取得
        const response1 = await axios.get(
          `${apiUrl}?lat=${lat1}&lon=${lon1}&appid=${apiKey}`
        );

        if (isMounted) {
          console.log("名城大学の天気:", response1.data);
          setWeather1(response1.data);
          setLineVisible(true);
        }

        // 東京都千代田区の天気情報を取得
        const response2 = await axios.get(
          `${apiUrl}?lat=${lat2}&lon=${lon2}&appid=${apiKey}`
        );

        if (isMounted) {
          console.log("東京都千代田区の天気:", response2.data);
          setWeather2(response2.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <main className=" p-24 mt-24">
      <p className="font-medium ">Hey I’m</p>
      <h1 className="py-4 text-8xl font-bold relative bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
        Ryohei Kamei
        <span
          className={`absolute bottom-0 left-0 w-full h-1 ${
            lineVisible
              ? "bg-gradient-to-r from-blue-400 to-pink-500"
              : "bg-transparent"
          }`}
          style={{
            animation: lineVisible ? "fadeInLine 1s ease-out" : "none",
          }}
        ></span>
      </h1>

      <p className="py-8 font-medium">
        私は愛知県在住で名城大学に所属しており、情報工学を専攻しています。
        <br />
        プログラミング学習歴は2024年1月時点で8ヶ月で、現在はWebアプリケーションのフロントエンド開発を中心に学習しています。
        <br />
        主に使用している言語はTypeScriptで、フレームワークはNext.jsを使用しています。
        <br />
        本サイトでは、私の活動や学んだことを紹介します。
      </p>
      <h2 className="py-10 text-3xl text-center">Acitivity</h2>
      <div className="flex gap-4 mt-8 text-white">
        <div className="flex-1 bg-black p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <div className="relative group">
            <div className="flex justify-center">
              <Image
                src="/teamhack.jpg"
                alt="Card Image"
                width={600}
                height={300}
                className="mb-4 rounded-md"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <h3 className="text-xl font-semibold text-white">
                In-class development
              </h3>
            </div>
          </div>
          <h1 className="font-bold">授業内開発</h1>
          <p className="mb-4">大学の授業内での開発経験について書いています</p>

          <div className="flex justify-center">
            <Link href="/univ-hack">
              <Button className="mx-auto">詳しく見る</Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 bg-black p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <div className="relative group">
            <div className="flex justify-center">
              <Image
                src="/hackon.png"
                alt="Card Image"
                width={600}
                height={300}
                className="mb-4 rounded-md"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <h3 className="text-xl font-semibold text-white">Hackathon</h3>
            </div>
          </div>
          <h1 className="font-bold">ハッカソン</h1>
          <p className="mb-4">課外活動での開発経験について書いています</p>

          <div className="flex justify-center">
            <Link href="/hackathon">
              <Button className="mx-auto">詳しく見る</Button>
            </Link>
          </div>
        </div>
      </div>
      <h2 className="py-10 text-3xl text-center">Today weather</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 100,
          }}
          whileTap={{ scale: 1.0, rotate: inView ? -360 : 0 }}
          transition={{ duration: 1 }}
        >
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-xl font-bold text-center">
                  本日の名城大学の天気⛅
                </p>
                {weather1 && (
                  <div className="mt-2 text-center">
                    <p>気温: {Math.round(weather1.main.temp - 273.15)}℃</p>
                    <p>天気: {weather1.weather[0].description}</p>
                    <img
                      src={getWeatherIconUrl(weather1.weather[0].icon)}
                      alt="天気アイコン"
                      width={50}
                      height={100}
                      className="rounded-[30px] mx-auto"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 100,
            rotate: inView ? 0 : 0,
          }}
          whileTap={{ scale: 1.0, rotate: 360 }}
          transition={{ duration: 1 }}
        >
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <div>
                <p className="text-xl font-bold text-center">
                  本日の東京都千代田区の天気⛅
                </p>
                {weather2 && (
                  <div className="mt-2 text-center">
                    <p>気温: {Math.round(weather2.main.temp - 273.15)}℃</p>
                    <p>天気: {weather2.weather[0].description}</p>
                    <img
                      src={getWeatherIconUrl(weather2.weather[0].icon)}
                      alt="天気アイコン"
                      width={50}
                      height={50}
                      className="rounded-[30px] mx-auto"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
