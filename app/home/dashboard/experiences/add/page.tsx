"use server";
import AddExperienceForm from "@/app/ui/Home/Experience/Create-experience-form";
import { getLoggedUser } from "@/app/lib/actions";
import { getUserF } from "@/app/lib/get_items";
import { signOut, auth } from "@/auth";

export default async function AddExperience() {
  const session = await auth();
  const session_user_id = await getUserF(session?.user?.email ?? undefined);
  if (!session_user_id) {
    await signOut();
  }

  //console.log(user.user.id);
  return (
    <div>
      <AddExperienceForm id={session_user_id?.id || ""} />
    </div>
  );
}
