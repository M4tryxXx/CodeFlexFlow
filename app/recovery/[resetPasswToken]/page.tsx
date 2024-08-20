import { findUserResetToken } from "@/app/lib/myDb";
import PasswordResetForm from "@/app/ui/password-reset-form";
import AcmeLogo from "@/app/ui/acme-logo";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Params {
  resetPasswToken: string;
}

export default async function PasswordRecovery({ params }: { params: Params }) {
  const user = await findUserResetToken(params.resetPasswToken);
  if (!user) {
    return (
      <main className="flex min-h-screen flex-col p-6">
        <div className="mt-8 flex grow flex-col md:flex-row gap-4 ">
          <div className="relative mx-auto flex w-full max-w-[400px] justify-center items-center flex-col space-y-2.5 p-4 ">
            <div className="relative my-5 bg-sky-200 rounded-md border">
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
              <div className="rounded-md border border-blue-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
                The token expired or is invalid!
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  const now = Date.now();
  const tokenExp = Date.parse(`${user.resetTokenExpiry}`);
  if (now > tokenExp) {
    return (
      <main className="flex min-h-screen flex-col p-6">
        <div className="mt-8 flex grow flex-col md:flex-row gap-4 ">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
            <div className="flex h-20 w-full items-center justify-center rounded-lg bg-rose-500 dark:bg-emerald-900 p-3 md:h-36">
              <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
                <AcmeLogo />
              </div>
            </div>
            <div className="relative my-5 bg-sky-200 rounded-md border">
              <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-white" />
              <div className="rounded-md border border-blue-400 py-2 px-5 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
                Token expired!
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-8 flex grow flex-col md:flex-row gap-4 ">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
          <div className="flex h-20 w-full items-center justify-center rounded-lg bg-rose-500 dark:bg-emerald-900 p-3 md:h-36">
            <div className="flex h-20 shrink-0 items-center justify-between rounded-lg   p-2 md:h[30px]">
              <AcmeLogo />
            </div>
          </div>
          <PasswordResetForm userId={user.id} />
        </div>
      </div>
    </main>
  );
}
