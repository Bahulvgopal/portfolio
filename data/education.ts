type Education = {
  degree: string;
  institution: string;
  period: string;
  description?: string; // ✅ optional
  image?: string; // ✅ optional — institution logo, e.g. "/images/education/uckv.png"
};

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science",
    institution: "University College of Engineering Kariavattom",
    period: "2025 - 2028",
    image: "/images/education/ucek.jpg",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "NSS Polytechnic College, Pandalam",
    period: "2022 - 2024",
    image: "/images/education/nssptc.jpg",
  },
  {
    degree: "Higher Secondary Education",
    institution: "PSNM Peroorkada, TVM",
    period: "2020 - 2022",
    image: "/images/education/psnm.jpg",
  },
  {
    degree: "High School Education",
    institution: "St Mary's HSS Pattom, TVM",
    period: "2020",
    image: "/images/education/stmarys.jpg",
  },
];