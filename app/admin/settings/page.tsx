import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your portfolio settings.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}