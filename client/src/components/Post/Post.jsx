import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import axios from "axios";
import { apiUrl } from "../../api/constants";

import AvatarImage from "../../assets/images/avatar.jpg";
import {
  NotificationIcon,
  CommentIcon,
  MessageIcon,
  OptionIcon,
  RedHeartIcon,
  SaveIcon,
} from "../../assets/icons";

const Post = ({ post, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("post: ", post);

  const isLike = () => {
    const isLikePost = post.likes.some((like) => like._id === currentUser._id);
    return isLikePost;
  };

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const like = await axios.put(`${apiUrl}/posts/${post._id}/like`, {
        id: currentUser._id,
      });

      const newData = await axios.get(
        `${apiUrl}/posts/timeline/${currentUser._id}`
      );

      if (newData.data.success) setData(newData.data.posts);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const dateStr = formatDistance(new Date(post.createdAt), new Date());

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between">
        <div className="flex-1">
          <header className="my-2 mx-1 flex items-center">
            <div>
              <Link to={`/profile/${post.userId.username}`}>
                <img
                  src={
                    post.userId.profilePicture
                      ? post.userId.profilePicture
                      : AvatarImage
                  }
                  className="w-8 h-8 rounded-full"
                  alt={`Avatar ${post.userId.username}`}
                />
              </Link>
            </div>
            <div className="ml-[10px] flex-1">
              <div className="flex items-center">
                <Link
                  to={`profile/${post.userId.username}`}
                  className="text-primaryText font-medium text-xs"
                >
                  {post.userId.username}
                </Link>
                <span className="flex items-center text-xs text-secondaryText font-normal">
                  <p className="mx-[6px]">•</p>
                  <p>{dateStr}</p>
                </span>
              </div>
            </div>
          </header>
        </div>
        <div>
          <button className="p-2">
            <OptionIcon />
          </button>
        </div>
      </div>

      <div></div>

      <div className="w-full">
        <section className="w-full mt-1 -mx-2 pb-[6px] flex items-center">
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
        </section>
        {post.likes.length >= 1 && (
          <section className="mb-[10px]">
            <div className="flex items-center">
              <Link
                to={`profile/${post.likes[post.likes.length - 1].username}`}
                className="text-xs font-semibold text-primaryText"
              >
                {post.likes[post.likes.length - 1].username}
              </Link>
              {post.likes.length >= 2 ? (
                <p className="ml-1 text-xs font-normal text-primaryText">
                  và những người khác đã thích
                </p>
              ) : (
                <p className="ml-1 text-xs font-normal text-primaryText">
                  đã thích
                </p>
              )}
            </div>
          </section>
        )}
        <div className="w-full flex flex-col">
          <div className="mb-2 text-xs font-semibold text-primaryText flex flex-wrap items-center">
            <Link
              to={`profile/${post.userId.username}`}
              className="text-xs font-semibold text-primaryText"
            >
              {post.userId.username}
            </Link>
            <p className="ml-2 text-sm font-normal text-primaryText">
              {post.description}
            </p>
          </div>
          <div className="mb-2 text-sm text-secondaryText font-normal">
            <button>
              Xem tất cả
              <span className="mx-[2px]">{post.comments.length}</span>
              bình luận
            </button>
          </div>
        </div>
        <section className="">
          <form action="">
            <input
              placeholder="Thêm bình luận…"
              className="outline-none placeholder:text-secondaryText placeholder:text-xs placeholder:font-normal bg-scroll-transperant"
            ></input>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Post;
