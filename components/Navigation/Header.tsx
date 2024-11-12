import { DoubleArrowLeftIcon, TextAlignLeftIcon } from "@radix-ui/react-icons";
import Logo from "../Logo";
import { Bell } from "lucide-react";
import ProfileCard from "../ProfileCard";

const Header = () => {
  return (
    <header className="bg-white h-[60px] max-md:px-[3%] flex border-b border-gray-200 fixed right-0 left-0 top-0 z-20">
      <div className="max-md:basis-1/4 myFlex !justify-start md:hidden">
        <TextAlignLeftIcon className="icon-large" strokeWidth={1.3} />
      </div>
      <div className="max-md:basis-1/2 myFlex md:hidden">
        <Logo variant={1} width={100} height={250} />
      </div>

      <div className="min-w-[300px] border-r lg:flex items-center relative hidden">
        <Logo variant={1} width={300} height={250} />
        <div className="bg-orange-400 text-white size-7 rounded-full myFlex absolute right-[-5%]">
          <DoubleArrowLeftIcon />
        </div>
      </div>
      <div className="w-full max-md:basis-1/4 flex items-center justify-end gap-3">
        <button className="bg-orange-400 hidden md:block px-7 font-clashmd text-white py-2 rounded-full mr-10">
          POS
        </button>

        <div className="relative after:content-[''] mx-2 md:mx-4 cursor-pointer after:absolute after:size-[10px] after:bg-orange-400 after:rounded-full after:-top-1 after:right-1">
          <Bell className="text-text-1 size-6 md:size-7" strokeWidth={1.3} />
        </div>
        <ProfileCard />
      </div>
    </header>
  );
};

export default Header;
