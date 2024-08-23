export default async function CvPage({
  params,
}: {
  params: { invitationId: string };
}) {
  const { invitationId } = params;

  return (
    <main className="bg-black h-[100vh] w-[100vw] m-0">
      <div className="rounded-md  p-4 md:p-6">
        <h1 className="my-3 mx-3">Comming Soon</h1>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden"></div>
              {invitationId}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
