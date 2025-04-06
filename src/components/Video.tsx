"use client";
import { IKVideo } from "imagekitio-next";

import React from "react";

type VideoType = {
  path: string;
  className?: string;
};
const Video = ({ path, className }: VideoType) => {
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

  return (
    <IKVideo
      urlEndpoint={urlEndpoint}
      path={path}
      className={className}
      transformation={[
        {
          width: "1920",
          height: "1080",
          quality: 90,
        },
      ]}
      controls={true}
    />
  );
};

export default Video;
