export type Certificate = {
  title: string;
  issuer: string;

  // ISO date used for sorting
  date: string;

  // Date shown on the UI
  displayDate: string;

  category:
    | "Hackathon"
    | "Workshop"
    | "Internship"
    | "Course"
    | "Event"
    | "Volunteering";

  image?: string;
};

export const certificates: Certificate[] = [
  {
    title: "It Networking Fundamental For Complete Beginners",
    issuer: "Udemy",
    date: "2026-07-04",
    displayDate: "04 July 2026",
    category: "Course",
    image: "/images/certificates/itudemy.png",
  },

  {
    title: "General Networking - Networking and Security Course",
    issuer: "Infosys",
    date: "2026-06-25",
    displayDate: "25 June 2026",
    category: "Course",
    image: "/images/certificates/generalnet.png",
  },

  {
    title: "Zero to Hero in 6 Months by Offenso",
    issuer: "Offenso Hackers Academy",
    date: "2026-04-18",
    displayDate: "18 April 2026",
    category: "Course",
    image: "/images/certificates/Webinar1Offenso.png",
  },

  {
    title: "IEDC Startup Summit March 2026",
    issuer: "Kerala Startup Mission",
    date: "2026-03-07",
    displayDate: "07 March 2026",
    category: "Event",
    image: "/images/certificates/startupS.png",
  },

  {
    title: "Complete Unix & Linux Fundamentals",
    issuer: "Infosys",
    date: "2026-03-06",
    displayDate: "06 March 2026",
    category: "Course",
    image: "/images/certificates/infosys.jpg",
  },

  {
    title: "IEDC Cluster Level Hackathon 2026",
    issuer: "IEDC - KSUM",
    date: "2026-02-25",
    displayDate: "25 February 2026",
    category: "Hackathon",
    image: "/images/certificates/SS.jpg",
  },

  {
    title: "Cybersecurity Workshop",
    issuer: "Offenso Academy",
    date: "2025-10-10",
    displayDate: "10 October 2025",
    category: "Workshop",
    image: "/images/certificates/cyber.jpg",
  },

  {
    title: "The Joy of Computing using Python",
    issuer: "NPTEL",
    date: "2024-01-01",
    displayDate: "2024",
    category: "Course",
    image: "/images/certificates/nptel.jpg",
  },

  {
    title: "Configure And Deploy Web Server in Cloud",
    issuer: "Spectrum Solutions, Ernakulam",
    date: "2023-08-12",
    displayDate: "12 August 2023",
    category: "Workshop",
    image: "/images/certificates/web.jpg",
  },

  {
    title: "Industrial Java Development Workshop",
    issuer: "Spectrum Solutions, Ernakulam",
    date: "2023-06-29",
    displayDate: "29 June 2023",
    category: "Workshop",
    image: "/images/certificates/ijd.jpg",
  },

  {
    title: "MERN Stack",
    issuer: "Spectrum Solutions, Ernakulam",
    date: "2023-05-01",
    displayDate: "01 May 2023 - 05 June 2023",
    category: "Internship",
  },

    {
    title: "CompTIA Network+: Network Types",
    issuer: "Infosys",
    date: "2026-07-08",
    displayDate: "08 July 2026",
    category: "Course",
    image: "/images/certificates/comp2.png",
  },

  {
    title: "CompTIA Network+: Well-known Ports & Protocols",
    issuer: "Infosys",
    date: "2026-07-07",
    displayDate: "07 July 2026",
    category: "Course",
    image: "/images/certificates/comp.png",
  },

    {
    title: "Python for Machine Learning",
    issuer: "Great Learning",
    date: "2023-07-05",
    displayDate: "05 July 2023",
    category: "Course",
    image: "/images/certificates/python.jpg",
  },

    {
    title: "ChatGpt for Beginners",
    issuer: "Great Learning",
    date: "2023-07-07",
    displayDate: "07 July 2023",
    category: "Course",
    image: "/images/certificates/chatgpt.jpg",
  },
  
];
