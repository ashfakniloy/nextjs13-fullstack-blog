import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function UserAuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <h2 className="absolute text-3xl font-bold inset-x-0 flex justify-center top-5 lg:top-20">
        <Link href="/">logo</Link>
      </h2>
      <div className="min-h-screen flex justify-center items-center">
        {children}
      </div>
      {/* <div className="absolute bottom-0 inset-x-0">
        <p className="flex justify-center">footer</p>
      </div> */}
    </div>
  );
}

export default UserAuthLayout;
