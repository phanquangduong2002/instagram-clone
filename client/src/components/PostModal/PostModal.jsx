import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { formatDistance } from "date-fns";

import { apiUrl } from "../../api/constants";
import { findPost } from "../../redux/postSlice";

import {
  CloseIcon,
  OptionIcon,
  NotificationIcon,
  CommentIcon,
  MessageIcon,
  RedHeartIcon,
  SaveIcon,
  EmojiIcon,
} from "../../assets/icons";
import TtImage from "../../assets/images/tt.jpg";
const PostModal = ({ setPosts, setIsShowPostModal }) => {
  const { currentPost } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);

  const [commentValue, setCommentValue] = useState("");

  const { username } = useParams();
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const formatDate = (date) => {
    return formatDistance(new Date(date), new Date());
  };

  const handlePostModal = (id) => {
    if (id !== currentPost.userId._id) setIsShowPostModal(false);
  };

  const isLike = () => {
    const isLikePost =
      currentPost &&
      currentPost.likes.some((like) => like._id === currentUser._id);
    return isLikePost;
  };

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const like = await axios.put(`${apiUrl}/posts/${currentPost._id}/like`, {
        id: currentUser._id,
      });
      if (location.includes("profile")) {
        const userProfile = await axios.get(`${apiUrl}/user/get/${username}`);

        const postsData = await axios.get(
          `${apiUrl}/posts/user/${userProfile.data.user._id}`
        );
        const [currentNewPost] = postsData.data.posts.filter(
          (post) => post._id === currentPost._id
        );
        dispatch(findPost(currentNewPost));
        setPosts(postsData.data.posts);
      } else {
        const postsData = await axios.get(
          `${apiUrl}/posts/timeline/${currentUser._id}`
        );
        const [currentNewPost] = postsData.data.posts.filter(
          (post) => post._id === currentPost._id
        );
        dispatch(findPost(currentNewPost));
        setPosts(postsData.data.posts);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const createComment = async (e) => {
    e.preventDefault();

    try {
      const comment = await axios.post(
        `${apiUrl}/posts/comment/${currentPost._id}`,
        {
          body: commentValue,
          userId: currentUser._id,
        }
      );
      setCommentValue("");
      if (location.includes("profile")) {
        const userProfile = await axios.get(`${apiUrl}/user/get/${username}`);

        const postsData = await axios.get(
          `${apiUrl}/posts/user/${userProfile.data.user._id}`
        );
        const [currentNewPost] = postsData.data.posts.filter(
          (post) => post._id === currentPost._id
        );
        dispatch(findPost(currentNewPost));
        setPosts(postsData.data.posts);
      } else {
        const postsData = await axios.get(
          `${apiUrl}/posts/timeline/${currentUser._id}`
        );
        const [currentNewPost] = postsData.data.posts.filter(
          (post) => post._id === currentPost._id
        );
        dispatch(findPost(currentNewPost));
        setPosts(postsData.data.posts);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-coatingBgModal z-[1000]">
      <span className="absolute top-3 right-3 z-[1001]">
        <button onClick={() => setIsShowPostModal(false)} className="p-2">
          <CloseIcon />
        </button>
      </span>
      <motion.div className="my-auto mx-20 w-full h-[530px]">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="w-[380px] max-w-[380px] h-full bg-black flex items-center justify-center">
            <img
              src={currentPost?.photos[0]}
              className="w-full object-cover object-center"
              alt=""
            />
          </div>
          <div className="w-[500px] h-full flex flex-col bg-primaryBg rounded-tr rounded-br">
            {/* 1 */}
            <div className="w-full flex items-center border-b-[1px] border-postSeparator">
              <div className="w-full flex items-center justify-center">
                <header className="pl-4 py-[14px] pr-[14px] flex items-center flex-1">
                  <div className="w-8 h-8">
                    <Link
                      to={`/profile/${currentPost?.userId?.username}`}
                      className="w-full h-full"
                    >
                      <img
                        src={currentPost?.userId?.profilePicture}
                        className="w-full h-full object-contain object-center rounded-full"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="ml-[14px] flex items-center">
                    <span className="text-primaryText text-[13px] hover:opacity-[0.5] font-semibold">
                      <Link to={`/profile/${currentPost?.userId?.username}`}>
                        {currentPost?.userId?.username}
                      </Link>
                    </span>
                  </div>
                </header>
                <div className="pr-2">
                  <button className="p-2 hover:opacity-[0.5]">
                    <OptionIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="pt-[5px] pr-4 pb-4">
                <div className="w-full flex items-start">
                  <div className="w-8 h-8 mr-[14px]">
                    <Link
                      to={`/profile/${currentPost?.userId?.username}`}
                      className="w-full h-full"
                    >
                      <img
                        src={currentPost?.userId?.profilePicture}
                        className="w-full h-full object-cover object-center rounded-full"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-primaryText text-[13px] hover:opacity-[0.5] font-semibold">
                      <Link to={`/profile/${currentPost?.userId?.username}`}>
                        {currentPost?.userId?.username}
                      </Link>
                    </h2>
                    <p className="text-sm text-primaryText font-normal pt-1">
                      {currentPost?.description}
                    </p>
                  </div>
                </div>
              </div>

              {currentPost.comments &&
                currentPost.comments.map((comment) => (
                  <ul key={comment?._id} className="mb-4">
                    <div className="w-full">
                      <div className="pt-3">
                        <div className="w-full flex items-start">
                          <div className="w-8 h-8 mr-[14px]">
                            <Link
                              onClick={() =>
                                handlePostModal(comment?.userId?._id)
                              }
                              to={`/profile/${comment?.userId?.username}`}
                            >
                              <img
                                src={comment?.userId?.profilePicture}
                                className="w-full h-full object-cover object-center rounded-full"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <h2 className="text-primaryText text-[13px] hover:opacity-[0.5] font-semibold">
                                <Link
                                  onClick={() =>
                                    handlePostModal(comment.userId._id)
                                  }
                                  to={`/profile/${comment.userId.username}`}
                                >
                                  {comment.userId.username}
                                </Link>
                              </h2>
                              <p className="text-sm text-primaryText font-normal pl-2">
                                {comment.body}
                              </p>
                            </div>
                            <div className="mt-2 mb-1 flex items-center justify-start">
                              <span className="mr-[12px] text-xs text-secondaryText font-normal">
                                {formatDate(comment.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                ))}
            </div>

            {/* 3 */}
            <div className="py-4 px-2 flex items-center border-t-[1px] border-postSeparator">
              <span className="hover:opacity-[0.6]">
                {isLike() ? (
                  <motion.button
                    onClick={handleLike}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1.3, 1] }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}
                    className="p-2"
                  >
                    <RedHeartIcon />
                  </motion.button>
                ) : (
                  <button onClick={handleLike} className="p-2">
                    <NotificationIcon />
                  </button>
                )}
              </span>
              <span className="hover:opacity-[0.6]">
                <button className="p-2">
                  <CommentIcon />
                </button>
              </span>
              <span className="hover:opacity-[0.6]">
                <button className="p-2">
                  <MessageIcon />
                </button>
              </span>
              <span className="ml-auto hover:opacity-[0.6]">
                <button className="p-2">
                  <SaveIcon />
                </button>
              </span>
            </div>
            {/* 4 */}
            {currentPost.likes && currentPost.likes.length >= 1 && (
              <div className="px-4 mb-1">
                <div className="w-full flex items-center">
                  <div className="mr-2 w-5 h-5">
                    <img
                      src={
                        currentPost.likes[currentPost.likes.length - 1]
                          ?.profilePicture
                      }
                      className="w-full h-full object-cover object-center rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="my-1 flex items-center text-primaryText font-normal text-sm">
                    <span className="font-medium pr-[3px]">
                      {
                        currentPost.likes[currentPost.likes.length - 1]
                          ?.username
                      }
                    </span>
                    {currentPost.likes.length >= 2 && (
                      <>
                        <span>và</span>
                        <span className="font-medium px-[3px]">
                          {currentPost.likes.length - 1} người khác
                        </span>
                      </>
                    )}
                    đã thích
                  </div>
                </div>
              </div>
            )}
            {/* 5 */}
            <div className="px-4 mb-4">
              <p className="text-secondaryText text-[10px] font-normal uppercase">
                {formatDate(currentPost?.createdAt)}
              </p>
            </div>
            {/* 5 */}
            <div className="pr-4 py-[6px] border-t-[1px] border-postSeparator">
              <form action="">
                <div className="flex items-center">
                  <div className="">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="py-2 px-4"
                    >
                      <EmojiIcon />
                    </button>
                  </div>
                  <input
                    onChange={(e) => setCommentValue(e.target.value)}
                    value={commentValue}
                    type="text"
                    className="flex-1 py-2 text-primaryText font-light text-sm outline-none"
                    placeholder="Thêm bình luận"
                  />
                  <button
                    onClick={createComment}
                    className={`font-semibold text-primaryButton text-sm ${
                      commentValue.length >= 1
                        ? "cursor-pointer opacity-1 hover:text-linkText"
                        : "cursor-default opacity-[0.5]"
                    }`}
                  >
                    Đăng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostModal;
