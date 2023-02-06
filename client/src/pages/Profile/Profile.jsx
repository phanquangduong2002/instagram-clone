import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { AnimatePresence } from "framer-motion";

import axios from "axios";
import { apiUrl } from "../../api/constants";

import { updateCurrentUser } from "../../redux/userSlice";

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
  BlackArrowIcon,
  AddUserIcon,
  LargeOptionIcon,
} from "../../assets/icons";

import UserPosts from "../../components/UserPosts/UserPosts";
import TaggedPosts from "../../components/TaggedPosts/TaggedPosts";
import SavedPosts from "../../components/SavedPosts/SavedPosts";

import UserInteractionModal from "../../components/UserInteractionModal/UserInteractionModal";
import ChangeAvatarModal from "../../components/ChangeAvatarModal/ChangeAvatarModal";
import PostModal from "../../components/PostModal/PostModal";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const [title, setTitle] = useState("Instagram");

  const [isShowUserInteractionModal, setIsShowUserInteractionModal] =
    useState(false);
  const [isShowChangeAvatarModal, setIsShowChangeAavarModal] = useState(false);
  const [isShowPostModal, setIsShowPostModal] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation().pathname;

  const { username } = useParams();

  isShowUserInteractionModal || isShowPostModal || isShowChangeAvatarModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "visible");

  const isFollowing = () => {
    const isFollowing =
      user && user.followers.some((user) => user._id === currentUser._id);
    return isFollowing;
  };

  const FollowUser = async (e) => {
    e.preventDefault();
    try {
      const follow = await axios.put(
        `${apiUrl}/user/follow/${user._id}`,
        {
          id: currentUser._id,
        },
        {
          withCredentials: true,
        }
      );
      const userProfile = await axios.get(`${apiUrl}/user/get/${username}`);

      setUser(userProfile.data.user);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`${apiUrl}/user/get/${username}`);

        console.log(userProfile.data);

        const postsData = await axios.get(
          `${apiUrl}/posts/user/${userProfile.data.user._id}`
        );

        if (userProfile.data.success) {
          setUser(userProfile.data.user);
          setTitle(
            `${userProfile.data.user.fullname} (@${userProfile.data.user.username})`
          );
        }

        if (postsData.data.success) setPosts(postsData.data.posts);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchData();
  }, [currentUser, username]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {user === null ? (
        <div className="min-h-screen ml-0 md:ml-[72px] xl:ml-[244px] bg-secondaryBg flex flex-col text-center">
          User not found
        </div>
      ) : (
        <div className="min-h-screen ml-0 md:ml-[72px] xl:ml-[244px] bg-secondaryBg flex flex-col">
          <main className="flex-1">
            <div className="pt-[30px] px-5 mx-5">
              <header className="mb-10 flex">
                <div className="mr-[30px]">
                  <div className="mx-16 w-[150px] h-[150px]">
                    <button
                      onClick={() => setIsShowChangeAavarModal(true)}
                      className="w-full h-full"
                    >
                      <img
                        src={user?.profilePicture}
                        className="w-full h-full rounded-full"
                        alt={`Avatar ${user?.username}`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center">
                    <h2 className="text-lg font-normal">{user?.username}</h2>
                    {username === currentUser.username ? (
                      <>
                        <div className="ml-5">
                          <Link
                            to={`/accounts/edit`}
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
                      </>
                    ) : (
                      <>
                        <div className="ml-5 flex items-center justify-center">
                          <div className="ml-2">
                            {isFollowing() ? (
                              <button
                                onClick={() =>
                                  setIsShowUserInteractionModal(true)
                                }
                                className="py-[7px] px-4 rounded-lg flex items-center bg-secondaryButton hover:bg-secondaryButtonHover
                      "
                              >
                                <span className="text-[13px] font-semibold text-primaryText">
                                  Đang theo giõi
                                </span>
                                <span className="ml-[6px] rotate-180">
                                  <BlackArrowIcon />
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={FollowUser}
                                className="py-[7px] px-4 rounded-lg flex items-center bg-primaryButton hover:bg-primaryButtonHover
                      "
                              >
                                <span className="text-[13px] font-semibold text-white">
                                  Theo giõi
                                </span>
                              </button>
                            )}
                          </div>
                          <div className="ml-2">
                            <button
                              className="py-[7px] px-4 rounded-lg flex items-center bg-secondaryButton hover:bg-secondaryButtonHover
                      "
                            >
                              <span className="text-[13px] font-semibold text-primaryText">
                                Nhắn tin
                              </span>
                            </button>
                          </div>
                          <div className="ml-2">
                            <button
                              className="py-[7px] px-[10px] rounded-lg flex items-center bg-secondaryButton hover:bg-secondaryButtonHover
                      "
                            >
                              <AddUserIcon />
                            </button>
                          </div>
                        </div>
                        <div className="ml-[5px]">
                          <button className="p-2">
                            <LargeOptionIcon />
                          </button>
                        </div>
                      </>
                    )}
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
                  <div className="mb-2">
                    <p className="text-sm font-medium text-primaryText">
                      {user?.fullname}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-normal text-primaryText">
                      {user?.description}
                    </p>
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
                        location.includes("saved") ||
                        location.includes("tagged")
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
                  className={`py-5 -mt-[1px] border-t-[1px] ${
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

              <div className="flex items-center justify-center">
                {location.includes("saved") ? (
                  <SavedPosts />
                ) : location.includes("tagged") ? (
                  <TaggedPosts user={user} />
                ) : (
                  <UserPosts
                    user={user}
                    posts={posts}
                    setIsShowPostModal={setIsShowPostModal}
                    setPosts={setPosts}
                  />
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
      )}

      <AnimatePresence>
        <>
          {isShowUserInteractionModal && (
            <UserInteractionModal
              user={user}
              setUser={setUser}
              setIsShowUserInteractionModal={setIsShowUserInteractionModal}
            />
          )}

          {isShowPostModal && (
            <PostModal
              setPosts={setPosts}
              setIsShowPostModal={setIsShowPostModal}
            />
          )}
          {isShowChangeAvatarModal && (
            <ChangeAvatarModal
              user={user}
              setUser={setUser}
              setIsShowChangeAavarModal={setIsShowChangeAavarModal}
            />
          )}
        </>
      </AnimatePresence>
    </HelmetProvider>
  );
};

export default Profile;
