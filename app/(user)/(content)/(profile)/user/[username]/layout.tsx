import BackButton from "@/components/BackButton";
import UsersPopularPosts from "@/components/Post/UsersPopularPosts";
import { getProfileByUsername } from "@/prisma/find/getProfileByUsername";
import { getTimeDistance } from "@/utils/getTimeDistance";
import Image from "next/image";
import { notFound } from "next/navigation";

async function UserProfileLayout({
  params: { username },
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  const actualUsername = username.split("%20").join(" ");
  const { profile } = await getProfileByUsername(actualUsername);

  if (!profile) {
    notFound();
  }

  return (
    <div>
      <div className="mb-10">
        <BackButton />
      </div>
      <div className="flex  gap-8">
        <div className="w-[250px] h-[250px] relative">
          {profile.imageUrl ? (
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
        <div className="flex-1 mt-3">
          <h4 className="text-3xl font-bold">{profile.user.username}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Joined {getTimeDistance(profile.createdAt)}
          </p>
          <p className="mt-5">{profile.bio}</p>

          {/* <p className="mt-10 text-gray-600 dark:text-gray-400">
            No Biodata for random user
          </p> */}
        </div>
      </div>

      <div className="mt-20 flex justify-between items-start gap-5 relative">
        <div className="flex-1">{children}</div>

        <div className="w-[380px] space-y-5">
          {/* @ts-expect-error Server Component */}
          <UsersPopularPosts username={username} />
        </div>
      </div>
    </div>
  );
}

export default UserProfileLayout;
