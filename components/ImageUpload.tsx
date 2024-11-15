"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  return (
    <CldUploadButton
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess={(result: any) => {
        onChange(result.info.secure_url);
      }}
      options={{
        maxFiles: 1,
      }}
      uploadPreset="airbnb-clone"
    >
      <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 p-20 flex flex-col justify-center items-center gap-4 text-neutral-600">
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        {value && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              alt="Upload"
              src={value}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}
      </div>
    </CldUploadButton>
  );
};

export default ImageUpload;
