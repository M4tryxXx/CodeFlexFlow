"use client";

//import dependencies
import CodeFlexFlow_Logo from "./ui/Global/CodeFlexFlow-Logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeSwitch from "./ui/ThemeSwitch";
import ExampleCard from "./ui/Home/ExampleCard";
import Footer from "./ui/Global/Footer/Footer";
import { getUserLocation } from "./lib/client-actions";

//export default function Page with a conditional statement
export default function Page() {
  const location = getUserLocation();
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

  if (location === "Bucharest") {
    // if user is from Romania
    return (
      <>
        <main className="flex min-h-screen flex-col items-center p-6 ">
          <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
            <CodeFlexFlow_Logo />
          </div>
          <div className="mt-4 flex grow flex-col gap-2">
            <div className="mt-4 flex grow gap-4 justify-start flex-row mx-10">
              <Link
                href="/register"
                className="flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:underline hover:underline-offset-[3px]"
              >
                <span>Creați cont</span>{" "}
                <ArrowRightIcon className="w-5 md:w-6" />
              </Link>
              <Link
                href="/login"
                className="flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:underline hover:underline-offset-[3px]"
              >
                <span>Conectați-vă</span>{" "}
                <ArrowRightIcon className="w-5 md:w-6" />
              </Link>

              <div className="flex w-25 items-center gap-5 self-start justify-between rounded-lg bg-gray-50 text-sm font-medium text-black transition-colors hover:bg-rose-400 md:text-base dark:bg-emerald-900 dark:hover:bg-emerald-700 dark:text-white">
                <ThemeSwitch />
              </div>
            </div>

            <article className="flex flex-col gap-4 p-4">
              <h1 className="text-3xl font-bold mb-6 md:mx-10 text-gray-800 dark:text-gray-200 opacity-75">
                Bine ați venit!
              </h1>
              <div className=" flex flex-col md:flex-row justify-between">
                <section className="md:w-[50%] p-4">
                  <p className="indent-7">
                    <span className="text-4xl ">B</span>ine ai venit la
                    CodeFlexFlow! Platforma noastră îți permite să creezi și să
                    trimiți CV-uri digitale cu ușurință. Urmărește CV-ul tău
                    pentru a vedea când și dacă a fost citit, împreună cu data
                    și ora exactă. Îmbunătățește procesul de aplicare pentru
                    joburi cu informații în timp real și o experiență digitală
                    simplificată. Alătură-te nouă și preia controlul asupra
                    carierei tale chiar astăzi!
                  </p>
                </section>
                <div className="flex-col md:flex-row p-4  justify-center items-center flex flex-wrap gap-3">
                  <ExampleCard data={dataRomania} delay={0.5} />
                </div>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  // if user is not from Romania
  else {
    return (
      <>
        <main className="flex min-h-screen flex-col items-center p-6 ">
          <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
            <CodeFlexFlow_Logo />
          </div>
          <div className="mt-4 flex grow flex-col gap-2">
            <div className="mt-4 flex grow gap-4 justify-start flex-row mx-10">
              <Link
                href="/register"
                className="flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:underline hover:underline-offset-[3px]"
              >
                <span>Register</span> <ArrowRightIcon className="w-5 md:w-6" />
              </Link>
              <Link
                href="/login"
                className="flex flex-col h-8 md:h-7 items-center justify-center rounded-md bg-gray-50 p-1 md:p-2 text-md font-medium hover:bg-rose-200 hover:text-rose-900 dark:hover:text-yellow-300 dark:bg-emerald-950 dark:hover:bg-emerald-800 hover:underline hover:underline-offset-[3px]"
              >
                <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
              </Link>

              <div className="flex w-25 items-center gap-5 self-start justify-between rounded-lg bg-gray-50 text-sm font-medium text-black transition-colors hover:bg-rose-400 md:text-base dark:bg-emerald-900 dark:hover:bg-emerald-700 dark:text-white">
                <ThemeSwitch />
              </div>
            </div>

            <section className="flex flex-col gap-4 p-4">
              <h1 className="text-3xl font-bold mb-6 md:mx-10 text-gray-800 dark:text-gray-200 opacity-75">
                Welcome to CodeFlexFlow!
              </h1>
              <div className=" flex flex-col md:flex-row justify-between">
                <article className="md:w-[50%] p-4">
                  <p className="indent-7">
                    <span className="text-4xl ">W</span>elcome to CodeFlexFlow!
                    Our platform empowers you to create and send digital
                    Curriculum Vitae (CV) effortlessly. Track your CV to see
                    when and if it has been read, along with the exact date and
                    time. Enhance your job application process with real-time
                    insights and a streamlined digital experience. Join us and
                    take control of your career journey today!
                  </p>
                </article>
                <div className="flex-col md:flex-row p-4  justify-center items-center flex flex-wrap gap-3">
                  <ExampleCard data={data} delay={0.5} />
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
