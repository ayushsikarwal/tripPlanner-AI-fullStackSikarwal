import React from "react";

export const JDiscount = () => {
  return (
    <div>
      <div className="relative w-full  mx-auto h-[400px] overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
          alt="Italian coastal town"
          className="w-full h-full object-cover"
        />

        <div className="absolute font-helvetica px-28 inset-0 bg-black/40 flex flex-col justify-center">
          <span className="text-white/80  text-sm tracking-wider">
            DISCOUNT OFFER
          </span>

          <h1 className="text-white text-5xl font-bold mt-3 mb-4 leading-tight">
            GET SPECIAL DISCOUNT
            <br />
            ON SIGN UP !
          </h1>

          <p className="text-white/80  text-lg max-w-lg mb-8">
            Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec
            nemo, rutrum. Vestibulum cumque laudantm sit.
          </p>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-full w-fit transition-colors duration-200">
            Sign Up Now
          </button>
        </div>

        {/* <div className="absolute top-10 right-16 grid grid-cols-3 gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
            <img
              src="https://webcrumbs.cloud/placeholder"
              alt="Mountain logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
            <img
              src="https://webcrumbs.cloud/placeholder"
              alt="Camping logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
            <img
              src="https://webcrumbs.cloud/placeholder"
              alt="Peak logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
            <img
              src="https://webcrumbs.cloud/placeholder"
              alt="Deer logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200"></div>
        </div> */}
      </div>
    </div>
  );
};
