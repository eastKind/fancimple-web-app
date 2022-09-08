import type { User, GetFollowReqData } from "../types";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent,
} from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import API from "../api/User";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useAsync from "../hooks/useAsync";
import getNextCursor from "../utils/getNextCursor";
import Avatar from "./Avatar";
import Spinner from "./Spinner";
import styles from "../essets/scss/UserList.module.scss";

interface UserListProps {
  userId: string;
  type: string;
  onClose: () => void;
}

function UserList({ userId, type, onClose }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [cursor, setCursor] = useState("");
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useInfiniteScroll(targetRef);
  const [loading, error, getFollowAsync] = useAsync(API.getFollow);

  const handleClick = (e: MouseEvent) => {
    const { tagName } = e.target as HTMLElement;
    if (tagName === "SPAN" || tagName === "IMG") onClose();
  };

  const handleLoad = useCallback(
    async (options: GetFollowReqData) => {
      const { users, hasNext } = await getFollowAsync(options);
      if (options.cursor) {
        setUsers((prev) => [...prev, ...users]);
      } else {
        setUsers(users);
      }
      const nextCursor = getNextCursor(users);
      setHasNext(hasNext);
      setCursor(nextCursor);
    },
    [getFollowAsync]
  );

  useEffect(() => {
    handleLoad({ userId, type, cursor: "", limit: 10 });
  }, [userId, type, handleLoad]);

  useEffect(() => {
    if (isIntersecting && hasNext) {
      handleLoad({ userId, type, cursor, limit: 10 });
    }
  }, [isIntersecting, hasNext, userId, type, cursor, handleLoad]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {type === "followings" ? "팔로잉" : "팔로워"}
      </div>
      <ul className={styles.list} onClick={handleClick}>
        {users.map((user) => (
          <li key={user._id} className={styles.listItem}>
            <Link to={`/${user._id}/post`}>
              <Avatar width="45px" photo={user.photoUrl} name={user.name} />
            </Link>
            <Link to={`/${user._id}/post`}>
              <span>{user.name}</span>
            </Link>
          </li>
        ))}
        {loading && users.length === 0 && <Spinner size={27} />}
        <div
          className={classNames(styles.observer, hasNext && styles.show)}
          ref={targetRef}
        >
          {loading && <Spinner size={27} />}
        </div>
      </ul>
    </div>
  );
}

export default UserList;
