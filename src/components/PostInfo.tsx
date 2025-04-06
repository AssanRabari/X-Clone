import React from "react";
import Image from "./Image";

const PostInfo = () => {
  return (
    <div className="cursor-pointer w-4 h-4 relative">
      <Image path="X-Clone/icons/infoMore.svg" alt="postInfo" w={16} h={16} />
    </div>
  );
};

export default PostInfo;
