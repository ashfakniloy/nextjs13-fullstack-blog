"use client";

import { useState } from "react";
import DeleteAccount from "@/components/Account/DeleteAccount";
import EmailChange from "@/components/Account/EmailChange";
import PasswordChange from "@/components/Account/PasswordChange";
import UsernameChange from "@/components/Account/UsernameChange";
import { useSession } from "next-auth/react";

function AccountSettingpage() {
  const { data: session } = useSession();
  const [menu, setMenu] = useState("");
  const accountMenus = [
    {
      name: "Username",
      info: session?.user.username,
      component: (
        <UsernameChange
          currentUsername={session?.user.username}
          setMenu={setMenu}
        />
      ),
    },
    {
      name: "Email",
      info: session?.user.email,

      component: (
        <EmailChange currentEmail={session?.user.email} setMenu={setMenu} />
      ),
    },
    {
      name: "Change Password",
      component: <PasswordChange setMenu={setMenu} />,
    },
    {
      name: "Delete Account",
      component: <DeleteAccount setMenu={setMenu} />,
    },
  ];

  const toggle = (name: string) => {
    // if (menu === name) {
    //   return setMenu("");
    // }

    setMenu(name);
  };

  return (
    <div className="">
      <div className="ml-1 mb-5 h-[50px] flex justify-between items-center">
        <h4 className=" text-3xl font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
          Change Account Setting
        </h4>
      </div>

      <div className="flex flex-col divide-y divide-gray-300/70 dark:divide-custom-gray2">
        {accountMenus.map((accountMenu, i) => (
          <div key={i}>
            <div
              className={`p-5  flex ${
                accountMenu.name === menu
                  ? "bg-gray-100 dark:bg-custom-gray2 shadow-md"
                  : "hover:bg-gray-100/50 dark:hover:bg-custom-gray2/50 cursor-pointer"
              }`}
              onClick={() =>
                accountMenu.name !== menu && toggle(accountMenu.name)
              }
            >
              <div className="text-lg flex-1 max-w-[200px]">
                {accountMenu.name}
              </div>

              <div className="">
                {accountMenu.info &&
                  (accountMenu.name !== menu ? (
                    <span className="flex-1">{accountMenu.info}</span>
                  ) : (
                    <span className="flex-1">
                      Current {accountMenu.name}:
                      <span className="ml-4">{accountMenu.info}</span>
                    </span>
                  ))}
                {accountMenu.name === menu && (
                  <div className="">{accountMenu.component}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountSettingpage;

// import DeleteAccount from "@/components/Account/DeleteAccount";
// import EmailChange from "@/components/Account/EmailChange";
// import PasswordChange from "@/components/Account/PasswordChange";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { getServerSession } from "next-auth";

// async function AccountSettingpage() {
//   const session = await getServerSession(authOptions);

//   return (
//     <div className="">
//       <div className="ml-1 mb-5 h-[50px] flex justify-between items-center">
//         <h4 className=" text-3xl font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
//           Change Account Setting
//         </h4>
//       </div>

//       <div className="space-y-10">
//         <EmailChange currentEmail={session?.user.email} />
//         <PasswordChange />
//         <DeleteAccount />
//       </div>
//     </div>
//   );
// }

// export default AccountSettingpage;
