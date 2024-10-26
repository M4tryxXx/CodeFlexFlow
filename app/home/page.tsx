import { myStyles } from "../styles";
import { getLoggedUser } from "../lib/actions";
import HomeSideNav from "../ui/Home/HomeSidenav";
import ExampleCard from "../ui/Home/ExampleCard";
import Footer from "../ui/Global/Footer/Footer";
import { auth } from "../../auth";

export default async function HomePage() {
  const session = await auth();
  const user = await getLoggedUser(session?.user?.email);

  const data = {
    title: "Code Flex Flow",
    description:
      "CodeFlexFlow allows users to create and send digital Curriculum Vitae (CV). Track your CV to see when and if it has been read, along with the exact date and time. Enhance your job application process with real-time insights and a streamlined digital experience.",
    dates: "August 2024",
  };

  const dataRomania = {
    title: "Code Flex Flow",
    description:
      "CodeFlexFlow permite utilizatorilor să creeze și să trimită CV-uri digitale. Urmărește CV-ul pentru a vedea când și dacă a fost citit, împreună cu data și ora exactă. Îmbunătățește procesul de aplicare pentru joburi cu informații în timp real și o experiență digitală simplificată.",
    dates: "August 2024",
  };

  if (user && user.lastLogin_from === "Bucharest") {
    // if user is from Romania

    return (
      <>
        <main className={`${myStyles.mainLayout}`}>
          <HomeSideNav user={user} />
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
              Bine ați venit pe CodeFlexFlow!
            </h1>
            <div className=" flex flex-col md:flex-row justify-between">
              <div className="md:w-[400px] p-4">
                <p className="indent-7">
                  <span className="text-4xl ">B</span>ine ai venit la
                  CodeFlexFlow! Platforma noastră îți permite să creezi și să
                  trimiți CV-uri digitale cu ușurință. Urmărește CV-ul tău
                  pentru a vedea când și dacă a fost citit, împreună cu data și
                  ora exactă. Îmbunătățește procesul de aplicare pentru joburi
                  cu informații în timp real și o experiență digitală
                  simplificată. Alătură-te nouă și preia controlul asupra
                  carierei tale chiar astăzi!
                </p>
              </div>
              <div className="flex-col md:flex-row w-full p-4  justify-center items-center flex flex-wrap gap-10">
                <ExampleCard data={dataRomania} delay={0.5} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 opacity-75">
          Welcome to CodeFlexFlow!
        </h1>
        <div className=" flex flex-col md:flex-row justify-between">
          <div className="md:w-[400px] p-4">
            <p className="indent-7">
              <span className="text-4xl ">W</span>elcome to CodeFlexFlow! Our
              platform empowers you to create and send digital Curriculum Vitae
              (CV) effortlessly. Track your CV to see when and if it has been
              read, along with the exact date and time. Enhance your job
              application process with real-time insights and a streamlined
              digital experience. Join us and take control of your career
              journey today!
            </p>
          </div>
          <div className="flex-col md:flex-row w-full p-4  justify-center items-center flex flex-wrap gap-10">
            <ExampleCard data={data} delay={0.5} />
          </div>
        </div>
      </div>
    </>
  );
}
