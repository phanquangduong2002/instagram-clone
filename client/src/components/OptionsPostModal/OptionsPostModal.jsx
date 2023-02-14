import React from "react";
import { motion } from "framer-motion";

import axios from "axios";
import { apiUrl } from "../../api/constants";
import { useSelector } from "react-redux";

const OptionsPostModal = ({ post, setData, setIsOptionsPostModal }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`${apiUrl}/posts/${post._id}`);

      const postsData = await axios.get(
        `${apiUrl}/posts/timeline/${currentUser._id}`
      );
      setData(postsData.data.posts);
      setIsOptionsPostModal(false);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-coatingBgModal z-[2000]">
      <motion.div className="my-auto mx-20 w-[400px] bg-primaryBg rounded-xl overflow-hidden">
        <div className="w-full flex flex-col">
          <button
            onClick={handleDeletePost}
            className="p-3 text-sm text-error font-bold hover:bg-secondaryButton"
          >
            Xóa
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Chỉnh sửa
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Ẩn lượt thích
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Tắt tính năng bình luận
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Đi tới bài viết
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Chia sẻ lên...
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Sao chép liên kết
          </button>
          <button className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton">
            Nhúng
          </button>
          <button
            onClick={() => setIsOptionsPostModal(false)}
            className="p-3 border-t-[1px] border-separator text-sm text-primaryText font-normal hover:bg-secondaryButton"
          >
            Hủy
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OptionsPostModal;
