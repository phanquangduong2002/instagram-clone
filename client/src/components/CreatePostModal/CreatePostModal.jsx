import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowCreatePostModal } from "../../redux/postSlice";

import { useLocation } from "react-router-dom";

import axios from "axios";
import { apiUrl } from "../../api/constants";

import { motion, AnimatePresence } from "framer-motion";

import { CloseIcon, FileIcon, BackIcon } from "../../assets/icons";
import SuccessIcon from "../../assets/images/success.gif";

import {
  resizeFileTypeFile,
  resizeFileTypeBase64,
} from "../../utils/resizeFile";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";

const CreatePostModal = ({ setPosts }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");

  const [change, setChange] = useState(false);
  const [success, setSuccess] = useState(false);

  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const uploadImg = async (file) => {
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
            setImageUrl(downloadURL);
          } catch (error) {
            console.log(error.response.data);
          }
        });
      }
    );
  };

  const onChangeImg = async (event) => {
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

  const createPost = async () => {
    try {
      const createPost = await axios.post(`${apiUrl}/posts`, {
        userId: currentUser._id,
        description,
        photos: [imageUrl],
      });
      setChange(false);
      setImg(null);
      setSuccess(true);

      if (location.includes("profile")) {
        const postsData = await axios.get(
          `${apiUrl}/posts/user/${currentUser._id}`
        );
        setPosts(postsData.data.posts);
      } else {
        const postsData = await axios.get(
          `${apiUrl}/posts/timeline/${currentUser._id}`
        );
        setPosts(postsData.data.posts);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-coatingBgModal z-[1000]">
      <div className="w-full h-full flex items-center justify-center relative">
        <span className="absolute top-3 right-3 z-[1001]">
          <button
            onClick={() => dispatch(setShowCreatePostModal(false))}
            className="p-2"
          >
            <CloseIcon />
          </button>
        </span>
        <motion.div
          animate={{ width: change ? 720 : 360 }}
          transition={{ duration: 0.3 }}
          className="h-[390px] max-h-[437px] bg-primaryBg rounded-xl overflow-hidden"
        >
          <div className="flex flex-col">
            <div className="h-11 flex items-center justify-center border-b-[1px] border-separator">
              {img ? (
                <div className="w-full flex items-center justify-between">
                  <div className="ml-2">
                    <button
                      onClick={() => {
                        setImg(null);
                        setChange(false);
                      }}
                      className="p-2"
                    >
                      <BackIcon />
                    </button>
                  </div>
                  <h1 className="text-primaryText text-base font-medium">
                    {!change ? "Chỉnh sửa" : "Tạo bài viết mới"}
                  </h1>
                  <div className="">
                    {!change ? (
                      <button
                        onClick={async () => {
                          await uploadImg(file);
                          setChange(true);
                        }}
                        className="py-2 px-4 text-primaryButton text-sm font-medium hover:text-linkText"
                      >
                        Tiếp
                      </button>
                    ) : (
                      <button
                        onClick={createPost}
                        className="py-2 px-4 text-primaryButton text-sm font-medium hover:text-linkText"
                      >
                        Chia sẻ
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-[360px] flex items-center justify-center">
                  <h1 className="text-primaryText text-base font-medium">
                    Tạo bài viết mới
                  </h1>
                </div>
              )}
            </div>
            {img ? (
              <div className="flex">
                <div className="w-full max-w-[360px] h-[346px] max-h-[347px]">
                  <img
                    src={img}
                    className="w-full h-full object-cover object-center"
                    alt=""
                  />
                </div>
                <AnimatePresence>
                  {change && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 360 }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full flex flex-col">
                        <div className="mx-4 mt-[18px] mb-[14px]">
                          <div className="flex items-center">
                            <span className="mr-3 w-7 h-7">
                              <img
                                src={currentUser?.profilePicture}
                                className="w-full h-full object-cover object-center rounded-full"
                                alt=""
                              />
                            </span>
                            <span className="text-primaryText font-semibold text-sm">
                              {currentUser?.username}
                            </span>
                          </div>
                        </div>
                        <div className="mt-[18px]">
                          <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[168px] px-4 resize-none outline-none text-sm text-primaryText placeholder:text-sm placeholder:text-secondaryText"
                            placeholder="Viết chú thích..."
                          ></textarea>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : success ? (
              <div className="w-full h-[346px] flex flex-col items-center justify-center">
                <div className="w-24 h-24">
                  <img
                    src={SuccessIcon}
                    className="w-full h-full object-cover object-center"
                    alt=""
                  />
                </div>
                <div className="my-4">
                  <p>Đã chia sẻ bài viết của bạn</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-[346px] flex items-center">
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
                        onChange={onChangeImg}
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
