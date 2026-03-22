export default function ResumePage() {
  return (
    <div className="container py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">Resume</h1>

      <iframe
        src="/resume.pdf"
        className="w-full h-[600px] border rounded-lg"
      />

      <a
        href="/resume.pdf"
        download
        className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg"
      >
        Download Resume
      </a>
    </div>
  );
}