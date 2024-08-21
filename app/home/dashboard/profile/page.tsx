import { userId } from "@/app/lib/actions";
export default async function Profile() {
  const user = await userId();

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
//
