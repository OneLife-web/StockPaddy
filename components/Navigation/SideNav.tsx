"use client";
import { useSideNav } from "@/contexts/SideNavContext";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathName = usePathname();
  const { isOpen } = useSideNav();

  return (
    <>
      {isOpen && (
        <aside
          className={`fixed max-md:hidden overflow-y-scroll custom-scrollbar transition-transform translate-x-[100%] ${
            isOpen ? "animate-slide-in" : "animate-slide-out"
          } md:w-[200px] lg:w-[300px] bg-white top-[60px] bottom-0 left-0 z-20 border-r border-gray-200`}
        >
          <div className="grid max-lg:px-[7%] px-[10%]">
            {navLinks.map((link) => (
              <div key={link.heading} className="py-7 border-b">
                <h4 className="heading3 mb-5">{link.heading}</h4>
                <div className="grid gap-2">
                  {link.body.map((item) => (
                    <Link
                      key={item.title}
                      href={item.link}
                      className={cn(
                        `flex gap-3 max-md:px-5 max-lg:px-3 px-5 py-3 items-center font-clashmd text-text-3 text-sm rounded-lg`,
                        {
                          "bg-orange-100 !text-orange-400":
                            pathName === item.link,
                        }
                      )}
                    >
                      {item.icon} <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </>
  );
};

export default SideNav;
