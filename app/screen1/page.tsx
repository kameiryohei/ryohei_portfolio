"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { collection, getDocs, addDoc, DocumentData } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface Review {
  id: string;
  name: string;
  content: string;
  imageUrl: string | null;
}

const Page: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const { toast } = useToast();

  const handleImageChange = (file: File) => {
    setImage(file);
  };

  const uploadImage = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const addReview = async () => {
    try {
      if (!name.trim() || !content.trim()) {
        // タイトルもしくは説明が空の場合に失敗トーストを表示
        toast({
          title: "投稿失敗",
          description: "タイトルと説明は必須です!",
          action: <ToastAction altText="閉じる">OK</ToastAction>,
        });
        return;
      }
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
        setImageUrl(imageUrl);
      }

      const reviewsCollectionRef = collection(db, "reviews");
      await addDoc(reviewsCollectionRef, { name, content, imageUrl });

      setError("");
      setName("");
      setContent("");
      setImage(null);
      setImageUrl(null);

      // 投稿成功時のトースト
      toast({
        title: "投稿成功",
        description: "写真が正常に投稿されました!",
        action: <ToastAction altText="閉じる">OK</ToastAction>,
      });
    } catch (error) {
      console.error("Error adding review:", error);

      // その他のエラーの場合に失敗トーストを表示
      toast({
        title: "投稿失敗",
        description: "写真の投稿中にエラーが発生しました。",
        action: <ToastAction altText="閉じる">OK</ToastAction>,
      });
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollectionRef = collection(db, "reviews");
      const querySnapshot = await getDocs(reviewsCollectionRef);
      const reviewsData: Review[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        reviewsData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  const handlePostButtonClick = () => {
    addReview();
  };
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handlePostButtonClick();
  };

  return (
    <div className="px-24 min-h-screen py-2 mt-24">
      <p className="py-6 text-4xl bg-clip-text text-transparent bg-gradient-to-r font-bold from-red-500 to-yellow-500">
        Post any photo you like!
      </p>
      <div className="flex items-center justify-center">
        <p className="text-2xl mt-4 text-center">
          ここではあなたの好きな写真を投稿することができます！
          <br />
          素敵な写真をみんなと共有しましょう！
        </p>
        <motion.img
          src="/camera.jpg"
          alt="写真を投稿するイラスト"
          width={300}
          height={200}
          className="rounded-[30px] right-0 z-10"
          initial={{ opacity: 0, rotate: -60, x: -500 }}
          animate={{ opacity: 1, rotate: 0, x: 0 }}
          whileTap={{ scale: 2.8 }}
          transition={{ duration: 1 }}
        />
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="タイトル"
          className="mb-4 mt-8"
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="説明"
          className="mb-4"
        />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                handleImageChange(file);
              }
            }}
          />
        </div>

        <Button
          type="submit"
          className="mt-4"
          variant="outline"
          onClick={() => handlePostButtonClick()}
        >
          投稿する
        </Button>
      </form>
      <p className="text-3xl text-center mt-3">いままでの投稿</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
        {reviews.map((review) => (
          <div key={review.id} className="p-1">
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <div>
                  <p className="text-xl font-bold text-center">{review.name}</p>
                  <p className="mt-2 text-center">{review.content}</p>
                  {review.imageUrl && (
                    <div className="mt-4 flex items-center justify-center">
                      <Image
                        src={review.imageUrl}
                        alt="投稿された画像"
                        width={350}
                        height={350}
                        className="rounded-[30px]"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
