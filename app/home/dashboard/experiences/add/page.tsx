"use server";
import Breadcrumbs from "@/app/ui/Home/Experience/Breadcrumbs";
import AddExperienceForm from "@/app/ui/Home/Experience/Create-experience-form";
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
          { label: "Experience", href: "/home/dashboard/experiences" },
          {
            label: "Adauga Experiente",
            href: "/home/dashboard/experiences/add",
            active: true,
          },
        ]}
      />
      <AddExperienceForm id={session_user_id?.id || ""} />
    </main>
  );
}
