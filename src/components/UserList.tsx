import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import UserAPI from "../api/User";
import { User, GetUsersReqData } from "../types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Avatar from "./Avatar";
import Spinner from "./Spinner";
import styles from "../essets/scss/UserList.module.scss";

interface UserListProps {
  userId: string;
  selectedList: string;
}

function UserList({ userId, selectedList }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [cursor, setCursor] = useState("");
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useInfiniteScroll(targetRef);

  const handleLoad = useCallback(
    async (options: GetUsersReqData) => {
      try {
        setLoading(true);
        const { users: nextUsers, hasNext } =
          selectedList === "follow"
            ? await UserAPI.getFollowings(options)
            : await UserAPI.getFollowers(options);
        const nextCursor =
          nextUsers.length > 0 ? nextUsers[nextUsers.length - 1]._id : "";
        if (options.cursor) setUsers((prev) => [...prev, ...nextUsers]);
        else setUsers(nextUsers);
        setHasNext(hasNext);
        setCursor(nextCursor);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    },
    [selectedList]
  );

  useEffect(() => {
    handleLoad({ userId, cursor: "", limit: 10 });
  }, [userId, handleLoad]);

  useEffect(() => {
    if (isIntersecting && hasNext) {
      handleLoad({ userId, cursor, limit: 10 });
    }
  }, [isIntersecting, hasNext, userId, cursor, handleLoad]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {selectedList === "follow" ? "팔로잉" : "팔로워"}
      </div>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user._id} className={styles.listItem}>
            <Link to={`/${user._id}/post`} state={{ isMe: false }}>
              <Avatar width="45px" photo={user.photoUrl} name={user.name} />
            </Link>
            <Link to={`/${user._id}/post`} state={{ isMe: false }}>
              <span>{user.name}</span>
            </Link>
          </li>
        ))}
        {loading && <Spinner size="30px" />}
        <div
          className={classNames(styles.observer, hasNext && styles.show)}
          ref={targetRef}
        />
      </ul>
    </div>
  );
}

export default UserList;
