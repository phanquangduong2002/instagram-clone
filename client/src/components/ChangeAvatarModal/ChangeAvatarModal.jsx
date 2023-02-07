import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { apiUrl } from "../../api/constants";

import { changeProfile } from "../../redux/userSlice";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";

const ChangeAvatarModal = ({ user, setUser, setIsShowChangeAavarModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [img, setImg] = useState(null);

  const dispatch = useDispatch();

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
            const updateProfile = await axios.put(
              `${apiUrl}/user/update/${currentUser._id}`,
              {
                profilePicture: downloadURL,
              },
              { withCredentials: true }
            );
          } catch (error) {
            console.log(error.response.data);
          }
          setIsShowChangeAavarModal(false);
          dispatch(changeProfile(downloadURL));
        });
      }
    );
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-coatingBgModal z-[1000]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[400px] bg-primaryBg rounded-xl overflow-hidden">
          <div className="flex flex-col items-center">
            <div className="mt-8 mx-8 mb-4">
              <h3 className="text-xl text-primaryText font-normal text-center">
                Thay đổi ảnh đại diện
              </h3>
            </div>
            <div className="w-full mt-4 flex flex-col items-center">
              <label className="w-full min-h-[48px] flex items-center justify-center py-1 px-2 border-t-[1px] hover:bg-secondaryButton border-separator">
                <p className="text-sm text-primaryButton font-semibold">
                  Tải ảnh lên
                </p>
                <input
                  type="file"
                  name="uploadImage"
                  onChange={(e) => setImg(e.target.files[0])}
                  accept="image/*"
                  className="w-0 h-0"
                />
              </label>
              <button className="w-full min-h-[48px] py-1 px-2 border-t-[1px] hover:bg-secondaryButton border-separator text-sm text-error font-semibold">
                Gở ảnh hiện tại
              </button>
              <button
                onClick={() => setIsShowChangeAavarModal(false)}
                className="w-full min-h-[48px] py-1 px-2 border-t-[1px] hover:bg-secondaryButton border-separator text-sm text-primaryText font-normal"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
