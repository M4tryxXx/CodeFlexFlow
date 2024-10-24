import { myStyles } from "@/app/styles";
import InvitationForm from "@/app/ui/Home/Dashboard/InviteForm";
import InvitesTable from "@/app/ui/Home/Dashboard/InvitesTable";
import { userData } from "@/app/lib/actions";
import LoadIndicator from "@/app/ui/Home/Dashboard/LoadIndex";
import { Link } from "@nextui-org/react";
import { firstToCapital } from "../../lib/utils";

export default async function dashPage() {
  const user = await userData();
  //console.log(user);
  let listItems = [];
  let noExperience = false;
  let noQualification = false;
  let infoExp = [];
  let infoQuali = [];
  let profileEdit = true;
  let loaded = 0;

  if (!user) {
    throw new Error("No user found");
  }

  //console.log("This is user", user);

  if (user.personal_info) {
    for (let [key, value] of Object.entries(user["personal_info"])) {
      if (
        key === "id" ||
        key === "user_id" ||
        key === "created_at" ||
        key === "updated_at" ||
        key === "zip" ||
        key === "image" ||
        key === "country"
      ) {
        continue;
      }

      let newKey = firstToCapital(key);

      if (!value) {
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
    }
  }

  if (listItems.length < 1) {
    profileEdit = false;
  }

  if (user.experiences.length < 1) {
    noExperience = true;
    listItems.push(
      <li
        key="experiences"
        className="flex flex-row justify-between items-center"
      >
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
          Experiences
        </span>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 opacity-75">
          null
        </span>
      </li>
    );
  }

  if (user.qualifications.length < 1) {
    noQualification = true;
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

  if (noExperience) {
    infoExp.push(
      <Link
        href={`/home/dashboard/experiences/add`}
        className="text-md font-semibold text-blue-700 dark:text-blue-300 hover:underline dark:hover:text-blue-400 underline-offset-[3px]"
      >
        Add experiences!
      </Link>
    );
  }

  if (noQualification) {
    infoQuali.push(
      <Link
        href={`/home/dashboard/qualifications/add`}
        className="text-md font-semibold text-blue-700 dark:text-blue-300 hover:underline dark:hover:text-blue-400 underline-offset-[3px]"
      >
        Add qualifications!
      </Link>
    );
  }

  loaded = Math.floor((100 / 13) * listItems.length);

  return (
    <main className={`${myStyles.main}`}>
      <div className="flex flex-col md:flex-row md:justify-around">
        <div className="flex flex-col justify-start items-start w-full md:w-[45%] mb-5">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 opacity-75">
            Your Dashboard
          </h1>
          <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-4" />
          {listItems.length < 1 && user.personal_info ? (
            <div className="w-full">
              <LoadIndicator number={listItems.length} />
              <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
                You can send your CV now!
              </h3>
              <InvitationForm user={user} />
            </div>
          ) : (
            <>
              <LoadIndicator number={listItems.length} />

              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 opacity-75">
                You need to fill out the required fields to generate your CV!
              </h3>
              {profileEdit ? (
                <Link
                  href={`/home/dashboard/profile/${user.id}`}
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
            {user?.invites?.length === 1
              ? `You have sent ${user?.invites?.length} invite`
              : `You have sent ${user?.invites?.length} invites`}
          </h3>

          <InvitesTable invites={user.invites} location="dashboard" />
        </div>
      </div>
    </main>
  );
}
