"use client";

import { useState } from "react";

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null);

  async function upload() {
    if (!file) return;

    const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "projects");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);
    alert(data.url);
  }

  return (
    <div className="p-10 space-y-5">
      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={upload}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Upload
      </button>
    </div>
  );
}