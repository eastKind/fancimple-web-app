import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

function useFollowState(userId: string) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { me } = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsFollowed(me.followings.includes(userId));
  }, [me.followings, userId]);

  return { isFollowed, setIsFollowed };
}

export default useFollowState;
