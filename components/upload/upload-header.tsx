import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[2px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <div className="flex px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-50 transition-colors duration-200">
          <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600 capitalize">
            AI Powered Content Creation
          </p>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDF'S</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </h1>
      <p className="text-lg leading-8 text-gray-600 max-w-2xl text-center">
        Upload your PDF and let our AI do the magic! ✨
      </p>
    </div>
  );
}
