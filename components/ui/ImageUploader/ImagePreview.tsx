"use client";

import Image from "next/image";
import { UploadedImage } from "./types";

interface Props {
  image: UploadedImage;
  onRemove: () => void;
}

export default function ImagePreview({
  image,
  onRemove,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-slate-700">
        {image?.url && (
          <Image
            src={image.url}
            alt="Preview"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        )}
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Remove Image
      </button>
    </div>
  );
}