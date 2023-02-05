import React from "react";
import { UserIcon } from "../../assets/icons";

const TaggedPosts = () => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-7 relative">
      <div className="my-[60px] mx-11 max-w-[350px] flex flex-col justify-center">
        {/* 1 */}
        <div className="flex items-center justify-center">
          <button className="w-16 h-16 flex items-center justify-center rounded-full border-[1.5px] border-primaryText">
            <UserIcon />
          </button>
        </div>
        {/* 2 */}
        <div className="my-6">
          <h2 className="text-3xl font-extrabold text-primaryText text-center">
            Ảnh có mặt bạn
          </h2>
        </div>
        {/* 3 */}
        <div className="mb-6">
          <p className="text-primaryText text-sm font-normal text-center">
            Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại đây.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaggedPosts;
