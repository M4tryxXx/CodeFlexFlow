import { myStyles } from "@/app/styles";
import InvitationForm from "@/app/ui/dashboard/InviteForm";
import InvitesTable from "@/app/ui/dashboard/InvitesTable";
import { userData } from "@/app/lib/actions";
import LoadIndicator from "@/app/ui/dashboard/LoadIndex";
import { Link } from "@nextui-org/react";
import { firstToCapital } from "../../lib/utils";
import { list } from "postcss";

export default async function dashPage() {
  const user = await userData();
  let listItems = [];
  let expCheck = false;
  let qualiCheck = false;
  let infoExp = [];
  let infoQuali = [];
  let profileEdit = true;

  for (let [key, value] of Object.entries(user.user)) {
    if (
      key === "password" ||
      key === "role" ||
      key === "resetToken" ||
      key === "resetTokenExpiry" ||
      key === "verified" ||
      key === "verifiedAt" ||
      key === "verifyToken" ||
      key === "verifyTokenExpiry" ||
      key === "github" ||
      key === "website" ||
      key === "linkedin" ||
      key === "instagram" ||
      key === "facebook" ||
      key === "address2" ||
      key === "createdAt" ||
      key === "updatedAt" ||
      key === "lastLogin" ||
      key === "lastLoginAt" ||
      key === "lastLoginFrom" ||
      key === "id" ||
      key === "twitter" ||
      key === "avatar" ||
      key === "twitch" ||
      key === "discord" ||
      key === "youtube" ||
      key === "street" ||
      key === "house" ||
      value !== null
    ) {
      continue;
    }

    let newKey = firstToCapital(key);

    listItems.push(
      <li key={key} className="flex flex-row justify-between items-center">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
          {newKey}
        </span>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
          {`${value}`}
        </span>
      </li>
    );
  }

  if (listItems.length < 1) {
    profileEdit = false;
  }

  if (user && user.experience !== null) {
    if (user.experience.length < 1) {
      expCheck = true;
      listItems.push(
        <li
          key="experience"
          className="flex flex-row justify-between items-center"
        >
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
            Experience
          </span>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
            null
          </span>
        </li>
      );
    }
  }

  if (user && user.qualifications !== null) {
    if (user.qualifications.length < 1) {
      qualiCheck = true;
      listItems.push(
        <li
          key="qualifications"
          className="flex flex-row justify-between items-center"
        >
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
            Qualifications
          </span>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
            null
          </span>
        </li>
      );
    }
  }

  if (expCheck) {
    infoExp.push(
      <Link
        href={`/home/dashboard/experience/add`}
        className="text-md font-semibold text-blue-700 dark:text-blue-300 hover:underline dark:hover:text-blue-400 underline-offset-[3px]"
      >
        Add Experience!
      </Link>
    );
  }

  if (qualiCheck) {
    infoQuali.push(
      <Link
        href={`/home/dashboard/qualifications/add`}
        className="text-md font-semibold text-blue-700 dark:text-blue-300 hover:underline dark:hover:text-blue-400 underline-offset-[3px]"
      >
        Add Qualifications!
      </Link>
    );
  }

  const loaded = Math.floor((100 / 12) * (12 - listItems.length));

  return (
    <main className={`${myStyles.main}`}>
      <div className="flex flex-col md:flex-row md:justify-around">
        <div className="flex flex-col justify-center items-start w-full md:w-[45%] mb-5">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 opacity-75">
            Your Dashboard
          </h1>
          <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
          {listItems.length < 1 ? (
            <div className="w-full">
              <LoadIndicator number={listItems.length} />
              <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                You can send your CV now!
              </h3>
              <InvitationForm user={user.user} />
            </div>
          ) : (
            <>
              <LoadIndicator number={listItems.length} />

              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 opacity-75">
                You need to fill out the required fields to generate your CV!
              </h3>
              {profileEdit ? (
                <Link
                  href={`/home/dashboard/profile/${user.user.id}`}
                  className="text-md font-semibold text-blue-700 dark:text-blue-300 hover:underline dark:hover:text-blue-400 underline-offset-[3px]"
                >
                  Update your profile!
                </Link>
              ) : (
                <h3 className="text-md font-bold mb-4 text-gray-800 dark:text-gray-200 opacity-75">
                  Great job! You are almost there! Profile is up to date!
                </h3>
              )}

              {infoExp ? infoExp : ""}
              {infoQuali ? infoQuali : ""}
              <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4  " />
              <h5 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                Missing fields:
              </h5>
              <ul className="w-full">{listItems}</ul>
            </>
          )}
          <hr className="w-full border-[2px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
        </div>
        <div className="mb-10 md:ml-4 md:w-[45%]">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
            {user?.Invites?.length === 1
              ? `You have sent ${user?.Invites?.length} invite`
              : `You have sent ${user?.Invites?.length} invites`}
          </h3>

          <InvitesTable invites={user.Invites} location="dashboard" />
        </div>
      </div>
    </main>
  );
}
