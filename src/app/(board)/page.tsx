import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="">
      <div className="flex justify-between px-4 pt-4 text-textGray font-bold border-b-[1px] border-borderGray">
        <Link
          className="pb-3 flex items-center border-b-4 border-b-iconBlue"
          href="/"
        >
          For you
        </Link>
        <Link className="pb-3 flex items-center " href="/">
          Following
        </Link>

        <Link className="hidden pb-3 md:flex items-center " href="/">
          React js
        </Link>

        <Link className="hidden pb-3 md:flex items-center " href="/">
          Next js
        </Link>
        <Link className="hidden pb-3 md:flex items-center " href="/">
          Tailwind
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default Homepage;
