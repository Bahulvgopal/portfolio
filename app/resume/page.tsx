export default function ResumePage() {
  return (
    <div className="container pt-28 sm:pt-36 pb-24 text-center">
      <h1 className="text-3xl font-bold mb-6 text-stone-900">Resume</h1>

      <iframe
        src="/resume.pdf"
        className="w-full h-[600px] border border-stone-200 rounded-lg shadow-sm"
      />

      <a
        href="/resume.pdf"
        download
        className="mt-6 inline-block px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl shadow-md transition font-semibold text-sm"
      >
        Download Resume
      </a>
    </div>
  );
}
