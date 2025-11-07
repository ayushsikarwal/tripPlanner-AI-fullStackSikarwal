import React from "react";
import Logo from "/TBOlogo.png";

export const JFooter = () => {
  return (
    <div>
      <div className="w-full font-helvetica py-20 px-28 mx-auto bg-slate-800 text-white p-8">
        <div className="flex justify-between gap-8 ">
          <div className="">
            <div className="flex mb-6">
              <img
                className="text-white  w-40 "
                src={Logo}
                alt="logo"
              />
            </div>
            <p className="text-sm text-gray-300">
              Urna ratione ante harum provident, eleifend, vulputate molestiae
              prom fringilla, <br />
              praesentium magna conubia at perferendis, pretium, aenean aut
              ultrices.
            </p>
          </div>

          <div className="">
            <h2 className="font-bold mb-4">CONTACT US</h2>
            <p className="text-sm mb-4">Feel free to contact and reach us !!</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">call</span>
                <span>+01(988) 256 203</span>
              </div>
              <div className="flex items-center gap-2">
                <span>3146 Koontz, California</span>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="font-bold mb-4">CONTACT US</h2>
            <p className="text-sm mb-4">Feel free to contact and reach us !!</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">call</span>
                <span>+01(988) 256 203</span>
              </div>
              <div className="flex items-center gap-2">
                <span>3146 Koontz, California</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};
