import React from "react";

const HomeBanner = () => {
  const bannerVideo =
    "https://v4.cdnpk.net/videvo_files/video/free/video0458/large_watermarked/_import_60c06347e51cf7.32144708_FPpreview.mp4";
  return (
    <div className="relative">
      {/* BANNER VIDEO */}
      <div className="overflow-x-hidden">
        <video
          className="md:h-[500px] h-[350px] w-full object-cover"
          src={bannerVideo}
          autoPlay
          muted
          loop
        ></video>
      </div>
      {/* OVERLY PART */}
      <div className="bg-[#ff084e] bg-opacity-20 absolute w-full top-0 text-white h-full flex items-center justify-center">
        <div className="w-1/2 text-center space-y-4">
          <span className="font-bold text-2xl md:text-3xl">Up To</span>
          <h1 className="text-8xl font-bold text-white">70% OFF</h1>
          <button className="border-2 border-white rounded px-2 md:px-5 py-1 md:py-2 font-bold hover:bg-[#ff084e] transition-all duration-200">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
