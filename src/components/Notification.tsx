"use client";

import { useEffect, useState } from "react";
import Image from "./Image";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  senderUsername: string;
  type: "like" | "comment" | "rePost" | "follow";
  link: string;
};
const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    socket.on("getNotification", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);

  const reset = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleClick = (notification: Notification) => {
    const filteredNotificationsList = notifications.filter(
      (n) => n.id !== notification.id
    );
    setNotifications(filteredNotificationsList);
    setOpen(false);
    router.push(notification.link);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="relative">
          <Image path={`X-Clone/icons/notification.svg`} alt="" w={24} h={24} />
          {notifications.length > 0 && (
            <div className="absolute flex items-center justify-center text-sm -top-4 -right-4 w-6 h-6 bg-iconBlue p-2 rounded-full">
              {notifications.length}
            </div>
          )}
        </div>
        <span className="hidden xxl:inline">Notification</span>
      </div>
      {open && (
        <div className="aboslute -right-full p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-max">
          <h1 className="text-xl text-textGray">Notification</h1>
          {notifications.map((notification) => (
            <div
              className="cursor-pointer"
              key={notification.id}
              onClick={() => handleClick(notification)}
            >
              <b>{notification.senderUsername}</b>
              {notification.type === "like"
                ? "liked your post"
                : notification.type === "rePost"
                ? "re-Posted your post"
                : notification.type === "comment"
                ? "replied to your post"
                : "followed you"}
            </div>
          ))}
          <button
            onClick={reset}
            className="bg-black text-white p-2 text-sm rounded-lg"
          >
            Mark as red
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
