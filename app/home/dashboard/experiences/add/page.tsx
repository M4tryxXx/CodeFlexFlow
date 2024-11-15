"use server";
import AddExperienceForm from "@/app/ui/Home/Experience/Create-experience-form";
import { signOut, auth } from "@/auth";
import { UserData } from "@/app/lib/get_user_full";

export default async function AddExperience() {
  const session_user_id = await UserData();
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
