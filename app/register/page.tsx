"use client";
import { auth, db } from "@/database/db";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { useLoading } from "@/context/LoaderContext";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/components/loader";

export default function Register() {
  const [user, setUser] = useState({ email: "", password: "", userName: "" });
  const router = useRouter();
  const { loading, setLoading } = useLoading();

  const signUp = async () => {
    setLoading(true);
    try {
      const signUpResponse = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const userData = signUpResponse.user;
      const email = user.email;
      const userName = user.userName;
      await setDoc(doc(db, "users", userData.uid), {
        uid: userData.uid,
        email,
        userName,
      });

      router.push("/task");
    } catch (error) {
      setLoading(false);
      toast.error("Oops, something went wrong. Please try again later", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-sm">
              <div className="mb-10">
                <div className="flex justify-center">
                  <img
                    alt=""
                    className="h-14 w-14"
                    src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
                  />
                </div>
                <h2 className="text-gray-900 mt-6 text-center text-3xl font-extrabold">
                  Register your account
                </h2>
              </div>
              <form className="mb-2 rounded bg-white px-8 pt-6 pb-4 shadow-2xl">
                <div className="mb-4">
                  <label
                    className="text-gray-700 mb-2 block text-sm font-bold"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                    id="userName"
                    type="text"
                    placeholder="Username"
                    onChange={(event) =>
                      setUser({ ...user, userName: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="text-gray-700 mb-2 block text-sm font-bold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                    id="email"
                    type="text"
                    placeholder="Email"
                    onChange={(event) =>
                      setUser({ ...user, email: event.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="text-gray-700 mb-2 block text-sm font-bold"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="text-gray-700 focus:shadow-outline  mb-3 w-full appearance-none rounded py-2 px-3 leading-tight shadow focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="******************"
                    onChange={(event) =>
                      setUser({ ...user, password: event.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className=" group relative mb-3 flex w-full justify-center rounded-md border border-transparent bg-body-color py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    type="button"
                    onClick={signUp}
                  >
                    Signup
                  </button>
                </div>
              </form>
              <div className="pb-2">
                <span className="px-2 text-xs">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-base font-semibold text-primary hover:underline"
                  >
                    {" "}
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
