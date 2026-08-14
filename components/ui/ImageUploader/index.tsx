"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

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
          className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
            isDragActive
              ? "border-blue-500 bg-blue-950"
              : "border-slate-700"
          }`}
        >
          <input {...getInputProps()} />

          <p className="text-slate-300">
            Drag & Drop an image here
          </p>

          <p className="mt-2 text-sm text-slate-500">
            or click to browse
          </p>
        </div>
      )}
    </div>
  );
}