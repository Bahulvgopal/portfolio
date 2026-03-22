export default function Skills() {
  const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 90 },
    { name: "Java Script", level: 70 },
    { name: "Python", level: 60 },
    { name: "Next.js", level: 80 },
    { name: "React", level: 85 },
    { name: "MongoDB", level: 70 },
    { name: "Node.js", level: 75 },
  ];

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl -mt-[9rem] font-bold mb-10 text-center">
        Skills
      </h2>

      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}