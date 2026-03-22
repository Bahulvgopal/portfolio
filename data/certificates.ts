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
    issuer: "Spectrum Solutions ,Eranakulam",
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
];