"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-48 sm:h-64 md:h-80">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Scenic vacation spot"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
              Oops! Page Not Found
            </h1>
          </div>
        </div>
        <div className="p-6 sm:p-8 md:p-10">
          <p className="text-xl text-gray-600 mb-6 text-center">
            It seems like you&apos;ve wandered off the beaten path. Don&apos;t
            worry, even the best travelers get lost sometimes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <Button
              outline
              label="Go to Homepage"
              onClick={() => router.push("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
