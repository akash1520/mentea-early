"use client"
import React, { useEffect } from "react";
import { getAvatarInitials } from "./utils";
import MobileNavbarMenuItem from "./MobileNavbarMenuItem";
import { mobileNavbarMenuItems } from "./constants/mobileNavbarMenuItems";
import Link from "next/link";
import { useAuthStore } from "@/store/AuthStore";

interface MobileNavbarProps {
  handleMobileMenuToggle: () => void;
}

const MobileNavbar = ({ handleMobileMenuToggle }: MobileNavbarProps) => {
  const [user, getCurrentUser, userData, logout] = useAuthStore((state) => [
    state.user,
    state.getCurrentUser,
    state.userData,
    state.logout,
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!user || !userData) {
      fetchUser();
    }
  }, [user, userData, getCurrentUser]);

  return (
    <>
      <div
        className="fixed bg-[#000] opacity-60 top-0 right-0 left-0 bottom-0 w-full z-20"
        onClick={handleMobileMenuToggle}
      />
      <div className="flex flex-col fixed top-0 transition ease-in-out h-[100vh] duration-3000 bg-[#feec01] text-[#191817] z-50 w-[65%] p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center ">
            <span className="text-[#191817] font-extrabold text-2xl">
              Mentea
            </span>
          </div>
          {user && (
            <div className="flex gap-2">
              <Link
                href={`/u/${userData?.username}`}
                className="btn p-1.5 bg-white"
              >
                <span>
                  {getAvatarInitials(
                    user.displayName?.split(" ")[0] || "",
                    user.displayName?.split(" ")[1] || ""
                  )}
                </span>
              </Link>

              <span className="font-semibold text-lg">
                {userData?.firstName} {userData?.lastName}
              </span>
            </div>
          )}
          {mobileNavbarMenuItems.map((item) => (
            <MobileNavbarMenuItem key={item.title} {...item} />
          ))}

          {!user? ( <><Link
            href={"/login"}
            className={
              "btn hover:font-semibold text-[18px] cursor-pointer bg-white"
            }
          >
            Signin
          </Link>
          <Link
            href={"/signup"}
            className={
              "btn hover:font-semibold text-[18px] cursor-pointer bg-white"
            }
          >
            Signup
          </Link></>):<button onClick={logout} className={
              "btn hover:font-semibold text-[18px] cursor-pointer bg-white"
            }>Logout</button>}
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
