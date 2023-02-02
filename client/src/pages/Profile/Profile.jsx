import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

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
} from "../../assets/icons";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState(null);

  const location = useLocation().pathname;

  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await axios.get(`${apiUrl}/posts/user/${currentUser._id}`);
      if (posts.data.success) setPosts(posts.data.posts);
    };

    fetchData();
  }, [currentUser._id]);

  return (
    <div className="ml-0 md:ml-[72px] xl:ml-[244px] bg-secondaryBg">
      <main>
        <div className="pt-[30px] px-5 mx-5 w-full">
          <header className="mb-10 flex">
            <div className="mr-[30px]">
              <div className="mx-16 w-[150px] h-[150px]">
                <button className="w-full h-full">
                  <img
                    src={
                      currentUser.profilePicture
                        ? currentUser.profilePicture
                        : AvatarImage
                    }
                    className="w-full h-full rounded-full"
                    alt={`Avatar ${currentUser.username}`}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-normal">{currentUser.username}</h2>
                <div className="ml-5">
                  <Link
                    to={`/profile/${currentUser.username}/edit`}
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
                    {currentUser.followers.length}
                  </span>
                  người theo dõi
                </button>
                <button className="font-normal">
                  Đang theo giõi
                  <span className="mx-[6px] font-medium">
                    {currentUser.following.length}
                  </span>
                  người dùng
                </button>
              </div>
              <div>
                <p className="text-sm font-medium">{currentUser.fullname}</p>
              </div>
            </div>
          </header>

          <div className="border-t-[1px] border-separator flex items-center justify-center">
            <Link
              to={`/profile/${currentUser.username}`}
              className="py-5 mr-[60px] -mt-[1px] border-t-[1px] border-black"
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
                    !(location.includes("saved") || location.includes("tagged"))
                      ? "text-primaryText"
                      : "text-secondaryText"
                  }`}
                >
                  Bài viết
                </span>
              </div>
            </Link>
            <Link
              to={`/profile/${currentUser.username}/saved`}
              className="py-5 mr-[60px] -mt-[1px]"
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
            <Link
              to={`/profile/${currentUser.username}/tagged`}
              className="py-5 mr-[60px] -mt-[1px]"
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

          <div>Posts</div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
