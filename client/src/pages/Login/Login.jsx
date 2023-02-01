import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { apiUrl } from "../../api/constants";

import {
  InstagramTextLogin,
  FacebookLogo,
  ArrowIcon,
} from "../../assets/icons";
import GooglePlayLogo from "../../assets/images/GooglePlay-Logo.png";
import MicrosoftLogo from "../../assets/images/Microsoft-Logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/auth/signin`, {
        username,
        password,
      });
      console.log(res.data);
      if (res.data.success) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-secondaryBg">
      <div className="mb-11 flex justify-center">
        <div className="w-[350px] max-w-[350px] mt-3">
          <div className=" py-[10px] mb-[10px] bg-primaryBg border-[1px] border-separator flex flex-col justify-center">
            <div className=" mt-9 mb-3 flex justify-center">
              <InstagramTextLogin />
            </div>
            <div className="mb-[10px]">
              <form>
                <div className="mt-6 flex flex-col">
                  <div className=" mx-10 mb-[6px]">
                    <div className="border-[1px] border-separator rounded-sm focus-within:border-focusSeparator">
                      {/* <span className="absolute pointer-events-none left-2 top-1/2 -translate-y-1/2 text-xs text-secondaryText">
                          Tên người dùng
                        </span> */}
                      <input
                        onChange={(e) => setUsername(e.target.value)}
                        autoCapitalize="on"
                        type="text"
                        placeholder="Tên người dùng"
                        className="py-3 pl-2 w-full bg-secondaryBg outline-none text-primaryText text-xs placeholder:text-xs placeholder:text-secondaryText"
                      />
                    </div>
                  </div>
                  <div className=" mx-10 mb-[6px]">
                    <div className="border-[1px] border-separator rounded-sm focus-within:border-focusSeparator">
                      {/* <span className="absolute pointer-events-none left-2 top-1/2 -translate-y-1/2 text-xs text-secondaryText">
                          Mật khẩu
                        </span> */}
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        autoCapitalize="on"
                        type="password"
                        placeholder="Mật khẩu"
                        className="py-3 pl-2 w-full bg-secondaryBg outline-none text-primaryText text-xs placeholder:text-xs placeholder:text-secondaryText"
                      />
                    </div>
                  </div>
                  <div className="my-2 mx-10">
                    <button
                      onClick={handleLogin}
                      className="w-full py-[6px] px-4 bg-primaryButton rounded-lg text-white text-sm font-medium"
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <div className="mt-[10px] mx-10 mb-[18px] flex items-center">
                    <span className="h-[1px] bg-separator flex-1"></span>
                    <span className="uppercase mx-4 font-medium text-secondaryText text-sm">
                      Hoặc
                    </span>
                    <span className="h-[1px] bg-separator w-auto flex-1"></span>
                  </div>
                  <div className="mx-10 my-2">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="w-full flex items-center justify-center"
                    >
                      <span className="mr-2">
                        <FacebookLogo />
                      </span>
                      <span className="text-[#385185] text-sm font-medium">
                        Đăng nhập bằng Facebook
                      </span>
                    </button>
                  </div>
                </div>
                <Link
                  to="/accounts/passowrd/reset"
                  className="mt-3 block w-full text-linkText text-xs font-light text-center"
                  href=""
                >
                  Quên mật khẩu?
                </Link>
              </form>
            </div>
          </div>
          <div className="py-[10px] mb-[10px] bg-primaryBg border-[1px] border-separator">
            <div className="flex items-center">
              <p className="text-sm text-primaryText text-center w-full">
                Bạn chưa có tài khoản ư?
                <Link
                  to="/accounts/signup"
                  className="text-primaryButton text-sm ml-1"
                >
                  Đăng kí
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="my-[10px] mx-5 flex justify-center">
              <span className="text-sm font-normal">Tải ứng dụng.</span>
            </div>
            <div className="my-[10px] flex items-center justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DB1290D06-479D-4F44-A7BD-D1679857C377%26utm_content%3Dlo%26utm_medium%3Dbadge"
                target="_blank"
                className="mr-2"
              >
                <img
                  alt="Tải xuống từ Google Play"
                  src={GooglePlayLogo}
                  className="h-10"
                />
              </a>
              <a
                href="ms-windows-store://pdp/?productid=9nblggh5l9xt&amp;referrer=appbadge&amp;source=www.instagram.com&amp;mode=mini&amp;pos=0%2C0%2C1920%2C1020"
                target="_blank"
              >
                <img
                  alt="Tải xuống từ Microsoft"
                  src={MicrosoftLogo}
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="px-4">
        <div className="mb-14 flex flex-col justify-center items-center">
          <div className="mt-6">
            <div className="flex flex-wrap justify-center">
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Meta
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Giới thiệu
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Blog
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Việc làm
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Trợ giúp
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  API
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Quyền riêng tư
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Điều khoản
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Tài khoản liên quan nhất
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Instagram Lite
                </a>
              </span>
              <span className="mx-2 mb-3">
                <a
                  href=""
                  target="_blank"
                  className="text-secondaryText font-normal text-xs"
                >
                  Tải thông tin người liên hệ lên & người không phải người dùng
                </a>
              </span>
            </div>
            <div className="flex justify-center my-3">
              <p className="text-secondaryText font-normal text-xs flex items-center justify-center cursor-pointer">
                Tiếng Việt
                <span className="ml-1 rotate-180">
                  <ArrowIcon />
                </span>
              </p>
              <p className="ml-4 text-secondaryText font-normal text-xs">
                © 2023 Instagram from Meta
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
