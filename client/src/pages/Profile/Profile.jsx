import React from "react";
import { useSelector } from "react-redux";

import AvatarImage from "../../assets/images/avatar.jpg";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="ml-0 md:ml-[72px] xl:ml-[244px] bg-secondaryBg">
      <main>
        <div className="pt-[30px] px-5 mx-5 w-full">
          <header className="mb-10 flex items-center">
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
            <div></div>
          </header>

          <div>Button</div>

          <div>Posts</div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
