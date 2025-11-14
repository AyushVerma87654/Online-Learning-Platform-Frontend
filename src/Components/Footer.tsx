import { memo, FC } from "react";
import { AiFillLinkedin, AiFillGithub, AiOutlineGlobal } from "react-icons/ai";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="bg-linear-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 py-6 space-y-4 md:space-y-0">
        {/* Brand */}
        <p className="font-bold text-lg">AYUSH</p>

        {/* Social Icons */}
        <div className="flex space-x-4 text-2xl">
          <a
            href="https://www.linkedin.com/in/ayush-verma-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/AyushVerma87654"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://ayushvermaportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <AiOutlineGlobal />
          </a>
        </div>

        {/* Copyright / Powered By */}
        <p className="text-sm text-gray-200">Powered by Ayush</p>
      </div>
    </div>
  );
};

export default memo(Footer);
