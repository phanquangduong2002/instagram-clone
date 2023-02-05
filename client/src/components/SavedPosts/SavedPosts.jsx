import React from "react";

const SavedPosts = () => {
  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-7 relative">
      <div className="mt-8 mb-4 flex-1">
        <p className="text-secondaryText font-normal text-xs">
          Chỉ mình bạn có thể xem mục mình đã lưu
        </p>
      </div>
      <div>
        <button className="text-primaryButton text-sm font-medium hover:text-linkText">
          + Bộ sưu tập mới
        </button>
      </div>
    </div>
  );
};

export default SavedPosts;
