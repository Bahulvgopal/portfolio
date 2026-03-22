type Education = {
  degree: string;
  institution: string;
  period: string;
  description?: string; // ✅ optional
};

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science",
    institution: "University College of Engineering Kariavattom",
    period: "2025 - 2028",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "NSS Polytechnic College, Pandalam",
    period: "2022 - 2024",
  },
  {
    degree: "Higher Secondary Education",
    institution: "PSNM Peroorkada, TVM",
    period: "2020 - 2022",
  },
  {
    degree: "High School Education",
    institution: "St Mary's HSS Pattom, TVM",
    period: "2020",
  },
];