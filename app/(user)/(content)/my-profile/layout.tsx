import Image from "next/image";
import user1 from "@/public/images/user1.jpg";
import user2 from "@/public/images/user2.png";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import ProfileLink from "@/components/Profile/ProfileLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getProfile } from "@/prisma/find/getProfile";
import { getTimeDistance } from "@/utils/getTimeDistance";

async function MyProfileLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  // if(!userId) return

  const { profile } = await getProfile(userId);

  const profilePages = [
    {
      name: "Posts",
      link: "/my-profile",
    },
    {
      name: "Activity Log",
      link: "/my-profile/activity-log",
    },
    {
      name: "Edit Profile",
      link: "/my-profile/edit-profile",
    },
    {
      name: "Account Setting",
      link: "/my-profile/account-setting",
    },
  ];

  return (
    // <div>
    //   <div className="flex  gap-8">
    //     <div className="w-[250px] h-[250px] relative">
    //       <Image src={user1} alt="user" fill className="object-cover" />
    //     </div>
    //     <div className="flex-1 mt-3">
    //       <h4 className="text-3xl font-bold">Random Username</h4>
    //       <p className="text-gray-600 dark:text-gray-400 text-sm">
    //         Joined 01/01/2023
    //       </p>
    //       <p className="mt-5">
    //         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
    //         molestiae, dolor reprehenderit architecto voluptates ad rem
    //         cupiditate odio necessitatibus deleniti neque officiis accusantium
    //         aliquam, commodi laborum sed! Dignissimos quis nulla dolor suscipit
    //         veritatis optio harum, placeat, minima excepturi quibusdam mollitia
    //         dolorem minus? Fugit adipisci autem laborum corporis, soluta
    //         nesciunt eveniet?
    //       </p>
    //     </div>
    //   </div>

    //   <div className="mt-10 flex border-b border-gray-300 dark:border-gray-700  text-center font-medium">
    //     {profilePages.map((page, i) => (
    //       <ProfileLink key={i} page={page} />
    //     ))}
    //   </div>

    //   <div className="mt-7 flex justify-between items-start gap-5 relative">
    //     <div className="flex-1">{children}</div>
    //   </div>
    // </div>

    <div>
      <div className="flex justify-between items-start gap-5 relative">
        <div className="flex-1">
          <div className="flex border-b border-gray-300 dark:border-gray-700  text-center font-medium">
            {profilePages.map((page, i) => (
              <ProfileLink key={i} page={page} />
            ))}
          </div>
          <div className="mt-7">{children}</div>
        </div>

        <div className="w-[380px] space-y-5 sticky top-[92px]">
          <div className="bg-gray-100 dark:bg-custom-gray2 shadow-md p-6 flex flex-col">
            <div className="w-[330px] h-[300px] relative">
              {profile?.imageUrl ? (
                <Image
                  src={profile.imageUrl}
                  alt="user"
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/blankUser.jpg"
                  alt="user image"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <h4 className="mt-4 text-2xl font-bold">
              {profile?.user.username}
            </h4>
            <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
              Joined {getTimeDistance(profile!.createdAt)}
            </p>
            <p className="mt-4">{profile?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileLayout;
