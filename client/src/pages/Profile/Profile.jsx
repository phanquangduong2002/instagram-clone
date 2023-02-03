import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import axios from "axios";
import { apiUrl } from "../../api/constants";

import AvatarImage from "../../assets/images/avatar.jpg";
import {
  OptionProfileIcon,
  PostIcon,
  PostActiveIcon,
  SavedIcon,
  SavedActiveIcon,
  TaggedIcon,
  TaggedActiveIcon,
  ArrowIcon,
} from "../../assets/icons";
import PostStorage from "../../components/PostStorage/PostStorage";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const [title, setTitle] = useState("Instagram");

  const location = useLocation().pathname;

  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`${apiUrl}/user/get/${username}`);

        const postsData = await axios.get(
          `${apiUrl}/posts/user/${userProfile.data.user._id}`
        );

        if (userProfile.data.success) {
          setUser(userProfile.data.user);
          setTitle(
            `${userProfile.data.user.fullname} @(${userProfile.data.user.username})`
          );
        }

        if (postsData.data.success) setPosts(postsData.data.posts);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, [currentUser, username]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="ml-0 md:ml-[72px] xl:ml-[244px] bg-secondaryBg">
        <main>
          <div className="pt-[30px] px-5 mx-5 w-full">
            <header className="mb-10 flex">
              <div className="mr-[30px]">
                <div className="mx-16 w-[150px] h-[150px]">
                  <button className="w-full h-full">
                    <img
                      src={
                        user?.profilePicture ? user.profilePicture : AvatarImage
                      }
                      className="w-full h-full rounded-full"
                      alt={`Avatar ${user?.username}`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center">
                  <h2 className="text-lg font-normal">{user?.username}</h2>
                  <div className="ml-5">
                    <Link
                      to={`/profile/${user?.username}/edit`}
                      className="py-2 px-4 bg-secondaryButton rounded-lg text-sm font-medium"
                    >
                      Chỉnh sửa trang cá nhân
                    </Link>
                  </div>
                  <div className="ml-[5px]">
                    <button className="p-2">
                      <OptionProfileIcon />
                    </button>
                  </div>
                </div>
                <div className="mb-5"></div>
                <div className="mb-5 flex">
                  <p className="mr-10 font-normal">
                    <span className="mr-[6px] font-medium">
                      {posts && posts.length}
                    </span>
                    bài viết
                  </p>
                  <button className="mr-10 font-normal">
                    <span className="mr-[6px] font-medium">
                      {user?.followers.length}
                    </span>
                    người theo dõi
                  </button>
                  <button className="font-normal">
                    Đang theo giõi
                    <span className="mx-[6px] font-medium">
                      {user?.following.length}
                    </span>
                    người dùng
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.fullname}</p>
                </div>
              </div>
            </header>

            <div className="border-t-[1px] border-separator flex items-center justify-center">
              <Link
                to={`/profile/${user?.username}`}
                className={`py-5 mr-[60px] -mt-[1px] border-t-[1px] ${
                  !(location.includes("saved") || location.includes("tagged"))
                    ? "border-black"
                    : "border-separator"
                }`}
              >
                <div className="flex items-center">
                  <span>
                    {!(
                      location.includes("saved") || location.includes("tagged")
                    ) ? (
                      <PostActiveIcon />
                    ) : (
                      <PostIcon />
                    )}
                  </span>
                  <span
                    className={`uppercase ml-[6px] text-xs font-medium tracking-wide ${
                      !(
                        location.includes("saved") ||
                        location.includes("tagged")
                      )
                        ? "text-primaryText"
                        : "text-secondaryText"
                    }`}
                  >
                    Bài viết
                  </span>
                </div>
              </Link>
              {username === currentUser.username && (
                <Link
                  to={`/profile/${user?.username}/saved`}
                  className={`py-5 mr-[60px] -mt-[1px] border-t-[1px] ${
                    location.includes("saved")
                      ? "border-black"
                      : "border-separator"
                  }`}
                >
                  <div className="flex items-center">
                    <span>
                      {location.includes("saved") ? (
                        <SavedActiveIcon />
                      ) : (
                        <SavedIcon />
                      )}
                    </span>
                    <span
                      className={`uppercase ml-[6px] text-xs font-medium tracking-wide ${
                        location.includes("saved")
                          ? "text-primaryText"
                          : "text-secondaryText"
                      }`}
                    >
                      Đã lưu
                    </span>
                  </div>
                </Link>
              )}
              <Link
                to={`/profile/${user?.username}/tagged`}
                className={`py-5 mr-[60px] -mt-[1px] border-t-[1px] ${
                  location.includes("tagged")
                    ? "border-black"
                    : "border-separator"
                }`}
              >
                <div className="flex items-center">
                  <span>
                    {location.includes("tagged") ? (
                      <TaggedActiveIcon />
                    ) : (
                      <TaggedIcon />
                    )}
                  </span>
                  <span
                    className={`uppercase ml-[6px] text-xs font-medium tracking-wide ${
                      location.includes("tagged")
                        ? "text-primaryText"
                        : "text-secondaryText"
                    }`}
                  >
                    Được gắn thẻ
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center">
              {location.includes("saved") ? (
                <div>SavedPosts</div>
              ) : location.includes("tagged") ? (
                <div>TaggedPosts</div>
              ) : (
                <div className="w-full flex flex-wrap justify-center gap-7">
                  {posts &&
                    posts.map((post) => (
                      <button key={post._id}>
                        <PostStorage post={post} />
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </main>
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
                    Tải thông tin người liên hệ lên & người không phải người
                    dùng
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
    </HelmetProvider>
  );
};

export default Profile;
