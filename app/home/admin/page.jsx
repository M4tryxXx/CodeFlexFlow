import { myStyles } from "../../styles";
import InvitesTable from "../../ui/Home/Dashboard/InvitesTable";
import { allInvites } from "../../lib/actions";
import {
  selectAllUsers as getUsers,
  getAllQualifications,
  getAllExperience,
} from "../../lib/myDb";

export default async function adminPage() {
  const invites = await allInvites();
  const users = await getUsers();
  const qualifications = await getAllQualifications();
  const experience = await getAllExperience();

  return (
    <main className={`${myStyles.main}`}>
      <div className="flex flex-col justify-center items-start w-full mb-5">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 opacity-75">
          Admin Summary
        </h1>
      </div>
      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          {`Invites sent ${invites.length}`}
        </h3>

        <InvitesTable invites={invites} role="admin" location="admin" />
      </div>
      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          Users Registered
          <br />
          <br />
          {users?.length}
        </h3>
      </div>
      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          Total Experiences added
          <br />
          <br />
          {experience?.length}
        </h3>
      </div>
      <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
      <div className="mb-10">
        <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          Total Qualifications added
          <br />
          <br />
          {qualifications?.length}
        </h3>
      </div>
    </main>
  );
}
