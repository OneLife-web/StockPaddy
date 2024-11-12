"use client";
import { useSideNav } from "@/contexts/SideNavContext";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileSideNav = () => {
  const pathName = usePathname();
  const { isMobileOpen } = useSideNav();

  return (
    <>
      {isMobileOpen && (
        <aside
          className={`fixed z-20 md:hidden overflow-y-scroll custom-scrollbar transition-transform ${
            isMobileOpen ? "animate-slide-in" : "animate-slide-out"
          } w-screen bg-white top-[60px] bottom-0 left-0 border-r border-gray-200`}
        >
          <div>
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
          </div>
        </aside>
      )}
    </>
  );
};

export default MobileSideNav;
