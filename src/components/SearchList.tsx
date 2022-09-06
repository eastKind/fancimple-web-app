import type { GetUsersReqData } from "../types";
import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  clearHistories,
  getResult,
  postHistories,
} from "../redux/thunks/search";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Avatar from "./Avatar";
import Spinner from "./Spinner";
import styles from "../essets/scss/SearchList.module.scss";

interface SearchListProps {
  keyword: string;
  onClear: () => void;
  onDrop?: () => void;
  onModal?: () => void;
}

function SearchList({ keyword, onClear, onDrop, onModal }: SearchListProps) {
  const { result, histories, loading, hasNext, cursor } = useAppSelector(
    (state) => state.search
  );
  const { sessionId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useInfiniteScroll(targetRef);
  const items = keyword ? result : histories;

  const handleClickClear = async () => {
    await dispatch(clearHistories());
  };

  const handleClickItem = async (userId: string) => {
    onClear();
    if (onDrop) onDrop();
    if (onModal) onModal();
    if (histories.some((user) => user._id === userId) || !sessionId) return;
    await dispatch(postHistories(userId));
  };

  const loadResult = useCallback(
    async (options: GetUsersReqData) => {
      await dispatch(getResult(options));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isIntersecting && hasNext) {
      loadResult({ keyword, cursor, limit: 10 });
    }
  }, [isIntersecting, hasNext, keyword, cursor, loadResult]);

  return (
    <div className={styles.container}>
      {!keyword && (
        <div className={styles.historyHeader}>
          <span>최근 검색 기록</span>
          {histories.length > 0 && (
            <span onClick={handleClickClear}>모두 지우기</span>
          )}
        </div>
      )}
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item._id}
            className={styles.listItem}
            onClick={() => handleClickItem(item._id)}
          >
            <Link to={`/${item._id}/post`}>
              <Avatar photo={item.photoUrl} name={item.name} width="45px" />
              <div className={styles.texts}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </Link>
          </li>
        ))}
        {keyword && result.length < 1 && (
          <div className={styles.empty}>검색 결과가 없습니다.</div>
        )}
      </ul>
      <div
        ref={targetRef}
        className={classNames(styles.observer, hasNext && styles.show)}
      >
        {loading && <Spinner size={18} />}
      </div>
    </div>
  );
}

export default SearchList;
