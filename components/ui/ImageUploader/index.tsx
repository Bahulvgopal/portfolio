"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

import ImagePreview from "./ImagePreview";
import UploadProgress from "./UploadProgress";
import { ImageUploaderProps, UploadedImage } from "./types";

import {
  MAX_IMAGE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from "@/lib/upload";

export default function ImageUploader({
  folder,
  value,
  onChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG and WebP images are allowed.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Maximum image size is 5 MB.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      const image: UploadedImage = {
        url: data.url,
        publicId: data.publicId,
      };

      onChange(image);

      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      await uploadImage(acceptedFiles[0]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/*": [],
      },
    });

  return (
    <div className="space-y-4">
      <UploadProgress uploading={uploading} />

      {value ? (
        <ImagePreview
          image={value}
          onRemove={() => onChange(null)}
        />
      ) : (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
            isDragActive
              ? "border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
              : "border-white/20 bg-white/[0.03] backdrop-blur-xl hover:border-orange-500/50 hover:bg-white/[0.06]"
          }`}
        >
          <input {...getInputProps()} />

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-orange-400">
            <UploadCloud size={24} />
          </div>

          <p className="font-rajdhani text-sm font-bold text-stone-200">
            Drag & Drop image artifact here
          </p>

          <p className="mt-1 font-rajdhani text-xs font-semibold text-stone-400">
            or click to browse local files (JPG, PNG, WebP · Max 5MB)
          </p>
        </div>
      )}
    </div>
  );
}
