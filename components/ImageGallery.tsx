"use client";

import { useState } from "react";

export default function ImageGallery({ images }: any) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        {images.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            onClick={() => setActive(img)}
            className="rounded-lg cursor-pointer hover:scale-105 transition"
          />
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img src={active} className="max-h-[90%] rounded-lg" />
        </div>
      )}
    </>
  );
}