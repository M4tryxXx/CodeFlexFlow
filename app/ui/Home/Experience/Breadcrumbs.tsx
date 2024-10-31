"use client";
import { clsx } from "clsx";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import { usePathname } from "next/navigation";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs() {
  const pathName = usePathname();
  const pathNameArray = pathName.split("/");

  for (let i = 0; i < pathNameArray.length; i++) {
    // console.log(
    //   "Current Path: ",
    //   pathNameArray[i],
    //   "Previous path: ",
    //   pathNameArray[i - 1]
    // );

    switch (pathNameArray[i - 1]) {
      case "qualifications":
        if (pathNameArray[i].length > 10) {
          pathNameArray[i] = "Edit Qualification";
        } else {
          pathNameArray[i] = "Add Qualification";
        }
        break;
      case "experiences":
        if (pathNameArray[i].length > 10) {
          pathNameArray[i] = "Edit Experience";
        } else {
          pathNameArray[i] = "Add Experience";
        }
        break;
      case "abilities":
        if (pathNameArray[i].length > 10) {
          pathNameArray[i] = "Edit Ability";
        } else {
          pathNameArray[i] = "Add Ability";
        }
        break;
      case "edit":
        if (pathNameArray[i].length > 10) {
          pathNameArray[i] = "Edit User";
        } else {
          pathNameArray[i] = "User Details";
        }
        break;
      default:
        pathNameArray[i] = pathNameArray[i];
        break;
    }
  }

  const breadcrumbs = pathNameArray.map((path, index) => {
    const previousPath = pathNameArray.slice(
      index > 0 ? index - 1 : index,
      index
    );
    // console.log(previousPath);
    const href = pathNameArray.slice(0, index + 1).join("/");
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    const active = index === pathNameArray.length - 1;
    return { href, label, active };
  });

  return (
    <nav aria-label="Breadcrumb" className="block">
      <ol className={clsx(lusitana.className, "flex text-sm md:text-xl")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active
                ? "text-gray-900 dark:text-yellow-400"
                : "text-gray-500 dark:text-gray-200"
            )}
          >
            {index < breadcrumbs.length - 1 ? (
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-1 md:mx-2 inline-block">
                {index === 0 ? "" : ">"}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
