type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  link?: string;
};

export const certificates: Certificate[] = [  // ✅ IMPORTANT
  {
    title: "MERN Stack",
    issuer: "Spectrum Solutions, Eranakulam",
    year: "01 May 2023 to 05 June 2023",
  },
  {
    title: "The Joy of Computing using Python",
    issuer: "Nptel",
    year: "2024",
    image: "/images/certificates/nptel.jpg",
  },
  {
    title: "Complete Unix & Linux Fundamentals",
    issuer: "Infosys",
    year: "06 March 2026",
    image: "/images/certificates/infosys.jpg",
    link: "https://example.com/certificate", // optional
  },
    {
    title: "IEDC Cluster Level Hackathon 2026",
    issuer: "IEDC - KSUM",
    year: "25 February 2026",
    image: "/images/certificates/SS.jpg",
    link: "https://example.com/certificate", // optional
  },
      {
    title: "Cybersecurity Workshop",
    issuer: "Offenso Academy",
    year: "10 October 2025",
    image: "/images/certificates/cyber.jpg",
    link: "https://example.com/certificate", // optional
  },
      {
    title: "Industrial Java Development Workshop",
    issuer: "Spectrum Solutions, Ernakulam",
    year: "29 June 2023",
    image: "/images/certificates/ijd.jpg",
    link: "https://example.com/certificate", // optional
  },
      {
    title: "Configure And Deploy Web Server in Cloud",
    issuer: "Spectrum Solutions, Ernakulam",
    year: "12 August 2023",
    image: "/images/certificates/web.jpg",
    link: "https://example.com/certificate", // optional
  },
        {
    title: "IEDC Startup Summit March 2026",
    issuer: "Kerala Startup Mission",
    year: "07 March 2026",
    image: "/images/certificates/startupS.png",
    link: "https://example.com/certificate", // optional
  },
  {
    title: "Zero to Hero in 6 Months by Offenso",
    issuer: "Offenso Hackers Academy",
    year: "18 April 2026",
    image: "/images/certificates/Webinar1Offenso.png",
    link: "https://example.com/certificate", // optional
  },
];
