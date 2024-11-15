"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || "/images/placeholder.png"}
      alt="Avatar"
      className="rounded-full"
      height={30}
      width={30}
    />
  );
};

export default Avatar;
