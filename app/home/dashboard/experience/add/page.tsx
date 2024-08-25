"use server";
import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import AddExperienceForm from "@/app/ui/experience/create-experience-form";
import { userData } from "@/app/lib/actions";

export default async function AddExperience() {
  const user = await userData();
  console.log(user.user.id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Experience", href: "/home/dashboard/experience" },
          {
            label: "Adauga Experiente",
            href: "/home/dashboard/education/add",
            active: true,
          },
        ]}
      />
      <AddExperienceForm id={user.user?.id || ""} />
    </main>
  );
}
