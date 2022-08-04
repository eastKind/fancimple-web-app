import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

function useIsMarked(postId: string) {
  const [isMarked, setIsMarked] = useState(false);
  const { me } = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsMarked(me.bookmarks.includes(postId));
  }, [me.bookmarks, postId]);

  return isMarked;
}

export default useIsMarked;
