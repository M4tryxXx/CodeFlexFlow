import NavLinksAdmin from "./Nav-links-admin";

export default function SideNavAdmin({ user }) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex flex-row justify-between">
        <NavLinksAdmin />
      </div>
    </div>
  );
}
