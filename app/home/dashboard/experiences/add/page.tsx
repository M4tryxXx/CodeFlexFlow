"use server";
import Breadcrumbs from "@/app/ui/experience/breadcrumbs";
import AddExperienceForm from "@/app/ui/experience/create-experience-form";
import { getLoggedUser } from "@/app/lib/actions";
import { signOut } from "@/auth";

export default async function AddExperience() {
  const session_user_id = await getLoggedUser();
  if (!session_user_id) {
    await signOut();
  }

  //console.log(user.user.id);
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
      <AddExperienceForm id={session_user_id?.id || ""} />
    </main>
  );
}
