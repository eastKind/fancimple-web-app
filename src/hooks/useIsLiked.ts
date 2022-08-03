import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

function useIsLiked(likeUsers: string[]) {
  const [isLiked, setIsLiked] = useState(false);
  const { me } = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsLiked(likeUsers.includes(me._id));
  }, [likeUsers, me._id]);

  return isLiked;
}

export default useIsLiked;
