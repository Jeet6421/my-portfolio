import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Footer = ({ isDarkMode }) => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <Image
          src={isDarkMode ? assets.logo_dark : assets.logo}
          alt=""
          className="w-36 mx-auto mb-2"
        />

        <div className="flex w-max items-center gap-2 mx-auto">
          <Image
            src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon}
            alt=""
            className="w-6"
          />
          jeetdemouser@gmail.com
        </div>
      </div>

      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <p>Copyright ©2025 Jitendra Choudhary. All rights reserved.</p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          <li>
            <a target="_blank" href="https://github.com/Jeet6421">
              <Image
                src={
                  isDarkMode
                    ?  assets.github_icon
                    : assets.github_icon_dark
                }
                alt="github_mark"
                className="w-8"
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/jitendrachoudhary1137/"
            >
              <Image
                src={
                  isDarkMode
                    ?  assets.linkdin_icon
                    : assets.linkdin_icon
                }
                alt="linkdin_icon"
                className="w-8"
              />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/yayjeetz?t=IYjsvY5tVGmVf5OMgrhiRg&s=09"
            >
              <Image
                src={
                  isDarkMode
                    ?  assets.twitter_icon_dark
                    : assets.twitter_icon
                }
                alt="twitter_icon"
                className="w-8"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
