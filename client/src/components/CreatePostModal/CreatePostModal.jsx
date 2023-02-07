import React, { useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

import { CloseIcon, FileIcon, BackIcon } from "../../assets/icons";
import { apiUrl } from "../../api/constants";

import {
  resizeFileTypeFile,
  resizeFileTypeBase64,
} from "../../utils/resizefile";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";

const CreatePostModal = ({ setIsShowCreatePostModal }) => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            setImg(downloadURL);
          } catch (error) {
            console.log(error.response.data);
          }
        });
      }
    );
  };

  const onChange = async (event) => {
    try {
      const fileInput = event.target.files[0];
      const image = await resizeFileTypeBase64(fileInput);
      const fileOutput = await resizeFileTypeFile(fileInput);
      setFile(fileOutput);
      setImg(image);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-coatingBgModal z-[1000]">
      <div className="w-full h-full flex items-center justify-center relative">
        <span className="absolute top-3 right-3 z-[1001]">
          <button
            onClick={() => setIsShowCreatePostModal(false)}
            className="p-2"
          >
            <CloseIcon />
          </button>
        </span>
        <motion.div className="w-[360px] max-w-[734px] h-[391px] max-h-[437px] bg-primaryBg rounded-xl overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="h-11 w-full flex items-center justify-center border-b-[1px] border-separator">
              {img ? (
                <div className="w-full max-w-[360px] flex items-center justify-between">
                  <div className="ml-2">
                    <button onClick={() => setImg(null)} className="p-2">
                      <BackIcon />
                    </button>
                  </div>
                  <h1 className="text-primaryText text-base font-medium">
                    Cắt
                  </h1>
                  <div className="p-2">
                    <button className="p-2 text-primaryButton text-sm font-medium hover:text-linkText">
                      Tiếp
                    </button>
                  </div>
                </div>
              ) : (
                <h1 className="text-primaryText text-base font-medium">
                  Tạo bài viết mới
                </h1>
              )}
            </div>
            {img ? (
              <div className="w-full max-w-[360px] flex-1 max-h-[347px]">
                <img
                  src={img}
                  className="w-full h-full object-cover object-center"
                  alt=""
                />
              </div>
            ) : (
              <div className="w-full flex-1 flex items-center">
                <div className="flex-1 p-8 h-full flex flex-col items-center justify-center">
                  <FileIcon />
                  <div className="mt-4">
                    <p>Kéo ảnh và video vào đây</p>
                  </div>
                  <div className="mt-6">
                    <label className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-primaryButton hover:bg-primaryButtonHover cursor-pointer">
                      <p className="text-sm text-white font-semibold">
                        Chọn từ máy tính
                      </p>
                      <input
                        type="file"
                        name="uploadImage"
                        accept="image/*"
                        onChange={onChange}
                        className="w-0 h-0"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePostModal;
