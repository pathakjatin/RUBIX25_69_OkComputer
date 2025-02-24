import { FloatingDock } from "./floating-dock";
import { RiHome2Line, RiTerminalBoxLine, RiGitBranchLine, RiExchangeLine } from "react-icons/ri";
import { FiGithub, FiTwitter } from "react-icons/fi";

export function Footer() {
  const links = [
    {
      title: "Home",
      icon: <RiHome2Line className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Products",
      icon: <RiTerminalBoxLine className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Components",
      icon: <RiGitBranchLine className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: <img
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        alt="Aceternity Logo"
      />,
      href: "#",
    },
    {
      title: "Changelog",
      icon: <RiExchangeLine className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Twitter",
      icon: <FiTwitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "GitHub",
      icon: <FiGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
  ];

  return (
    <div className="flex items-center justify-center  h-[10rem] w-full">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </div>
  );
}
