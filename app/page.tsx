"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
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
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    setLineVisible(true);
  }, []);

  // 天気APIのエンドポイントとAPIキーを設定 APIを再度叩くときはコメントアウトを外す　ここから
  /*const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = process.env.WEATHER_API_KEY;
  // 名城大学の緯度経度
  const lat = 35.1356448;
  const lon = 136.97606831;
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        console.log(response.data);
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [new Date().getDate()]);*/
  //ここまで
  return (
    <main className=" p-24">
      <p className="font-medium ">Hey I'm</p>
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
      {weather && (
        <div className="py-10 bg-black text-white">
          <h2>本日の名城大学の天気</h2>
          <p>現在の気温: {Math.round(weather.main.temp - 273.15)}℃</p>
          <p>天気: {weather.weather[0].description}</p>
          <Image
            src="/image_1.png"
            alt="weather icon"
            width={100}
            height={100}
          />
        </div>
      )}
    </main>
  );
}
