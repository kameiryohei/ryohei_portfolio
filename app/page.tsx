import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className=" p-24">
      <h2 className="font-medium text-2xl">
        ようこそ!Ryoのポートフォリオサイトへ🚀
      </h2>
      <p className="py-4">
        現在、名城大学情報工学部に所属する亀井涼平です。
        <br />
        このサイトでは私が大学生活で行った活動や、趣作成したものを紹介しています。
      </p>
      <div className="flex gap-4 items-center ">
        <Button>Click here</Button>
        <Button>Click here</Button>
      </div>
    </main>
  );
}
