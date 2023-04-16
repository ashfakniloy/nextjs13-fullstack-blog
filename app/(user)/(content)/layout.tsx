import Navbar from "@/components/Layout/Navbar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getProfile } from "@/prisma/find/getProfile";
import { getServerSession } from "next-auth";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  // console.log("session", session);
  const { profile } = await getProfile(userId);

  // const profile: ProfileProps = data?.profile;

  return (
    <div className="container">
      <Navbar
        session={session}
        imageUrl={profile?.imageUrl}
        username={profile?.user.username}
      />
      <div className="my-5 ">{children}</div>
    </div>
  );
}

export default UserLayout;
