type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  type?: string;
  skills?: string[];
};

export const experiences: Experience[] = [
  {
    role: "Technical Officer",
    company: "IEDC at UCEK",
    period: "2026 - Present",
    description:
      "Built responsive UI using React and improved performance of web applications.",
    type: "Leadership",
    skills: ["React", "UI/UX", "Performance"],
  },
  {
    role: "Treasure Hunt Program Coordinator",
    company: "University College",
    period: "2026",
    description:
      "Organized and managed events including treasure hunt and team coordination.",
    type: "Event",
    skills: ["Event Management", "Teamwork"],
  },
];