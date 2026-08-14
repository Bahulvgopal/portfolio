export interface UploadedImage {
  url: string;
  publicId: string;
}

export interface ImageUploaderProps {
  folder: string;
  value?: UploadedImage | null;
  onChange: (image: UploadedImage | null) => void;
}