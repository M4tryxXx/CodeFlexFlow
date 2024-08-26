import AcmeLogo from "@/app/ui/acme-logo";
import { myStyles } from "../styles";
import { userId } from "../lib/actions";
import HomeSideNav from "../ui/HomeSidenav";
import Card from "../ui/Card";

export default async function HomePage() {
  const user = (await userId()) || "";

  if (user && user.lastLoginFrom === "Bucharest") {
    // if user is from Romania

    return (
      <main className={`${myStyles.mainLayout}`}>
        <HomeSideNav user={user} />
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
            Bine ai venit pe CodeFlexFlow!
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main className={`${myStyles.mainLayout}`}>
      <HomeSideNav user={user} />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          Welcome to CodeFlexFlow!
        </h1>

        <div className="flex-col md:flex-row  p-4  justify-center items-center mt-20 flex flex-wrap gap-10">
          <Card
            title="Example"
            description="Here you can create and send a digital Curriculum Vitae, you will then
          be able to track it so you will know if the receiver has read it also
          you will know what date and time it was read!"
            delay={0.5}
            index={0}
          />
          <Card
            title="Example"
            description="Here you can create and send a digital Curriculum Vitae, you will then
          be able to track it so you will know if the receiver has read it also
          you will know what date and time it was read!"
            delay={0.5}
            index={1}
          />
          <Card
            title="Example"
            description="Here you can create and send a digital Curriculum Vitae, you will then
          be able to track it so you will know if the receiver has read it also
          you will know what date and time it was read!"
            delay={0.5}
            index={2}
          />
          <Card
            title="Example"
            description="Here you can create and send a digital Curriculum Vitae, you will then
          be able to track it so you will know if the receiver has read it also
          you will know what date and time it was read!"
            delay={0.5}
            index={3}
          />
        </div>
      </div>
    </main>
  );
}
