import { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

function useIsMe(otherId: string) {
  const [isMe, setIsMe] = useState(false);
  const { me } = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsMe(me._id === otherId);
  }, [me._id, otherId]);

  return isMe;
}

export default useIsMe;
