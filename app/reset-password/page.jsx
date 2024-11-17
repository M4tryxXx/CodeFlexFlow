import CodeFlexFlow_Logo from "../ui/Global/CodeFlexFlow-Logo";
import ResetPasswordForm from "../ui/Global/Log_In/Password-reset-email-form";
import Footer from "../ui/Global/Footer/Footer";

export default function ResetPasswordPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col p-6">
        <div className="mt-8 flex grow flex-col md:flex-row gap-4 ">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
            <div className="flex h-20 w-full items-center justify-center rounded-lg bg-stone-100 dark:bg-emerald-900 p-3 md:h-36">
              <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
                <CodeFlexFlow_Logo />
              </div>
            </div>
            <ResetPasswordForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
