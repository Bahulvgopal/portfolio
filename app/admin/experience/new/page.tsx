import ExperienceForm from "@/components/experience/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Experience</h1>
        <p className="text-muted-foreground">
          Add a new work experience, internship, leadership role, or volunteer experience.
        </p>
      </div>

      <ExperienceForm mode="create" />
    </div>
  );
}