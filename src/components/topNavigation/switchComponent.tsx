"use client";

import { alterPreference } from "@/redux/actions/userSettings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { USER_PREFERENCES } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const SwitchComponent = () => {
  const userSettings = useAppSelector((state) => state.UserSetting);
  const dispatch = useAppDispatch();

  const router = useRouter();

  return (
    <p
      className={`flex ${
        userSettings.showAdminInterface === false
          ? "justify-end"
          : "justify-start"
      } items-center capitalize w-full py-2 px-4`}
      onClick={() => {
        dispatch(
          alterPreference({
            showAdminInterface: !userSettings.showAdminInterface,
          })
        );

        router.push(userSettings.showAdminInterface ? "/user" : "/advertiser");
      }}
      role="button"
    >
      {userSettings.showAdminInterface === false
        ? "switch to advertiser"
        : "switch to user"}
    </p>
  );
};
