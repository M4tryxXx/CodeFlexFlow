import EditProfileForm from "../../../../ui/Home/Profile/MyCv/EditProfileForm";
import { selectUserFull } from "../../../../lib/myDb";

export default async function EditProfilePage(props) {
  const params = await props.params;
  const { profileId } = params;

  const user = await selectUserFull(profileId);

  return (
    <main>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800 my-5">
        <EditProfileForm user={user} />
      </div>
    </main>
  );
}
