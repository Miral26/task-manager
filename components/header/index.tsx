import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "@/database/db";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LogoutModal from "./LogoutModal";
import Image from "next/image";
import { toast } from "react-toastify";

const Header = ({ userName }: { userName: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        toast.error(error, { position: "top-center" });
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="border-gray-200 dark:bg-gray-900 border-b-2 border-[##e1e1e1] bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <Image
              width={40}
              height={50}
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-black ">
              Task
            </span>
          </a>
          <div className="flex items-center md:order-2">
            <div className="flex items-center">
              <span className="mr-2 flex h-3 w-3 rounded-full bg-[green]"></span>
              <span className="text-gray-500 mr-6  text-lg hover:text-lg ">
                {userName}
              </span>
              <button
                onClick={openModal}
                className="block rounded-lg bg-primary  px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <LogoutModal closeModal={closeModal} logoutUser={logoutUser} />
      )}
    </>
  );
};

export default Header;
