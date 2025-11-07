import React, { useState } from "react";

import Logo from "/TBOlogo.png";
import HomeImg from "/HomeImage.jpg";
import HomeVid from "/bg-video.mp4";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@/hooks/use-toast.js";

export const JHero2 = () => {
  const [signUp, setSignUp] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const signIn = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserInfo(tokenResponse),
    onError: (error) => console.log(error),
    flow: "implicit", // Make sure this is correct for your setup
    // redirect_uri: "https://sikarwalstripplanner.vercel.app/", // Ensure this matches your Google Console config
  });

  const getUserInfo = (tokenResponse) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        const userData = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // Update user state
        setSignUp(false);
        toast.success("Signed up successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Sign-up failed. Please try again.");
      });
  };

  const logOut = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Clear user state
    toast.info("Logged out successfully.");
  };

  return (
    <div>
      <div className="w-full font-helvetica">
        <header className="relative">
          <nav className="absolute top-0 w-full z-50 bg-black/20 backdrop-blur-sm">
            <div className=" mx-auto max-w-7xl cursor-pointer px-8 py-2">
              <img
                className="text-white mx-auto w-40 gap-2"
                src={Logo}
                alt="logo"
              />
            </div>
          </nav>
          <div className="relative h-screen">
            {/* <img
              src={HomeImg}
              className="w-full h-full object-cover"
              alt="Scenic coastal view"
            /> */}
            <video className="w-full h-full object-cover"   autoPlay loop muted>
              <source src={HomeVid} type="video/mp4" />
              
            </video>

            <div className="absolute  inset-0 bg-black/60 flex flex-col items-center justify-center text-center">
              <h1 className="text-white mt-20 uppercase text-7xl font-bold mb-6">
                Say Hi! To Your Own AI <br /> Trip Planner
              </h1>
              <p className="text-white  text-lg max-w-2xl mb-8">
                Your personal trip planner and travel curator, custom
                itineraries tailored to your interests and budget
              </p>

              <div className="p-3 flex items-center justify-between">
                <Dialog className="w-6 rounded" open={signUp}>
                  <DialogContent className="rounded max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-2 mx-auto">
                        Sign up to proceed
                      </DialogTitle>
                      <DialogDescription>
                        <h2 className="text-center">
                          Please sign up to continue
                        </h2>
                        <button
                          className="flex w-full text-center justify-center items-center gap-2 p-3 mt-5 rounded-3xl bg-slate-900 text-white"
                          onClick={signIn}
                        >
                          <FcGoogle />
                          Sign in with Google
                        </button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                {!user ? (
                  <div>
                    <button
                      onClick={() => setSignUp(true)}
                      className="bg-blue-600 uppercase rounded-full text-white px-8 py-3  hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <a href="/create-trip">
                      <button
                        variant="outline"
                        className="bg-blue-600 uppercase rounded-full text-white px-8 py-3  hover:bg-blue-700 transition-colors"
                      >
                        Create New Trip
                      </button>
                    </a>
                    <a href="/my-trips">
                      <button
                        variant="outline"
                        className="bg-transparent uppercase rounded-full border-2 border-white text-white px-8 py-3  hover:bg-white hover:text-black transition-colors"
                      >
                        My Trips
                      </button>
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <img
                          className="bg-transparent uppercase w-12 rounded-full border-2 border-white text-white p-1 hover:bg-white hover:text-black transition-colors"
                          src={user.picture}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={logOut}>
                          <a href="/">Log Out</a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
