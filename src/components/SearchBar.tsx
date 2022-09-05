import type { User, GetUsersReqData } from "../types";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import classNames from "classnames";
import _ from "lodash-es";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useAsync from "../hooks/useAsync";
import API from "../api/User";
import getNextCursor from "../utils/getNextCursor";
import DropDown from "./DropDown";
import Spinner from "./Spinner";
import SearchList from "./SearchList";
import styles from "../essets/scss/SearchBar.module.scss";
import { useAppSelector } from "../redux/hooks";

const LIMIT = 10;

interface SearchBarProps {
  className?: string;
}

function SearchBar({ className }: SearchBarProps) {
  const { sessionId } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const [histories, setHistories] = useState<User[]>([]);
  const [keyword, setKeyword] = useState("");
  const [cursor, setCursor] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [drop, setDrop] = useState(false);
  const [loading, , getUsersAsync] = useAsync(API.getUsers);
  const targetRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useInfiniteScroll(targetRef);

  const initialize = () => {
    setUsers([]);
    setKeyword("");
    setCursor("");
    setHasNext(false);
  };

  const getSearch = useCallback(
    async (options: GetUsersReqData) => {
      const { users, hasNext } = await getUsersAsync(options);
      if (options.cursor) {
        setUsers((prev) => [...prev, ...users]);
      } else {
        setUsers(users);
      }
      const newCursor = getNextCursor(users);
      setHasNext(hasNext);
      setCursor(newCursor);
    },
    [getUsersAsync]
  );

  const debouncedLoad = useMemo(
    () => _.debounce((options) => getSearch(options), 500),
    [getSearch]
  );

  const getHistories = async () => {
    const histories = await API.getHistories();
    setHistories(histories);
  };

  const clearHistories = async () => {
    setHistories([]);
    await API.clearHistories();
  };

  const handleClickItem = async (userId: string) => {
    if (histories.some((user) => user._id === userId)) return;
    await API.postHistories(userId);
  };

  const handleClickReset = () => initialize();

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setKeyword(value);
    debouncedLoad({ keyword: value, cursor: "", limit: LIMIT });
  };

  const handleDrop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrop(true);
  };

  useEffect(() => {
    if (isIntersecting && hasNext) {
      getSearch({ keyword, cursor, limit: 10 });
    }
  }, [isIntersecting, hasNext, keyword, cursor, getSearch]);

  useEffect(() => {
    if (!sessionId) return;
    getHistories();
  }, [sessionId]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.searchBar}>
        {drop || <span className="material-symbols-rounded">search</span>}
        <input
          type="text"
          value={keyword}
          placeholder="검색"
          onChange={handleChange}
          onClick={handleDrop}
        />
        {keyword && (
          <div className={styles.symbol}>
            {loading ? (
              <Spinner size={18} />
            ) : (
              <span
                className="material-symbols-rounded"
                onClick={handleClickReset}
              >
                close
              </span>
            )}
          </div>
        )}
      </div>
      <DropDown isDropped={drop} setDrop={setDrop}>
        <div className={styles.listContainer}>
          {!keyword && (
            <div className={styles.historyHeader}>
              <span>최근 검색 기록</span>
              {histories.length > 0 && (
                <span onClick={clearHistories}>모두 지우기</span>
              )}
            </div>
          )}
          <SearchList
            items={keyword ? users : histories}
            type={keyword ? "users" : "histories"}
            onClick={handleClickItem}
          />
          <div
            ref={targetRef}
            className={classNames(styles.observer, hasNext && styles.show)}
          >
            {loading && <Spinner size={18} />}
          </div>
        </div>
      </DropDown>
    </div>
  );
}

export default SearchBar;
