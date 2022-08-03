import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

function useIsFollowed(followers: string[]) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { me } = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsFollowed(followers.includes(me._id));
  }, [followers, me._id]);

  return isFollowed;
}

export default useIsFollowed;
