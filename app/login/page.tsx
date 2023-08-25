"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/database/db";
import { useLoading } from "@/context/LoaderContext";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/components/loader";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();
  const { loading, setLoading } = useLoading();

  const signIn = async () => {
    setLoading(true);
    try {
      const signupResponse = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

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
                  Login to your account
                </h2>
              </div>
              <form className="mb-2 rounded bg-white px-8 pt-6 pb-4 shadow-2xl">
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
                    className="text-gray-700 focus:shadow-outline mb-3 w-full appearance-none rounded py-2 px-3 leading-tight shadow focus:outline-none"
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
                    onClick={signIn}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="pb-2">
                <span className="px-2 text-xs">
                  Don&apos;t have an account yet?{" "}
                  <Link
                    href="/register"
                    className="text-base font-semibold text-primary hover:underline"
                  >
                    {" "}
                    Signup
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
