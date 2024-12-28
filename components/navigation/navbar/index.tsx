import Image from "next/image";
import Link from "next/link";

import Theme from "./Theme";

function Navbar() {
  return (
    <nav
      className="flex-between background-light900_dark200
    fixed z-50 w-full p-6 shadow-light-300
    sm:px-12 dark:shadow-none"
    >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevFlow Logo"
        />
        <p className="h2-bold font-space text-dark-100 max-sm:hidden dark:text-light-900">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">
        <Theme />
      </div>
    </nav>
  );
}

export default Navbar;