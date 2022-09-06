import type { GetUsersReqData } from "../types";
import React, { useState, useCallback, useMemo } from "react";
import _ from "lodash-es";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getResult } from "../redux/thunks/search";
import Spinner from "./Spinner";
import styles from "../essets/scss/SearchBar.module.scss";

interface SearchBarProps {
  keyword: string;
  onChange: (keyword: string) => void;
  onClear: () => void;
  onDrop?: () => void;
}

function SearchBar({ keyword, onChange, onClear, onDrop }: SearchBarProps) {
  const { loading } = useAppSelector((state) => state.search);
  const [focus, setFocus] = useState(false);
  const dispatch = useAppDispatch();

  const loadResult = useCallback(
    async (options: GetUsersReqData) => {
      await dispatch(getResult(options));
    },
    [dispatch]
  );

  const debounced = useMemo(
    () => _.debounce((options) => loadResult(options), 700),
    [loadResult]
  );

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    onChange(value);
    debounced({ keyword: value, cursor: "", limit: 10 });
  };

  const handleFocus = () => setFocus((prev) => !prev);

  const handleClickInput = (e: React.MouseEvent) => {
    if (!onDrop) return;
    e.stopPropagation();
    onDrop();
  };
  const handleClickReset = () => onClear();

  return (
    <div className={styles.searchBar}>
      {focus || <span className="material-symbols-rounded">search</span>}
      <input
        type="text"
        value={keyword}
        placeholder="검색"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleFocus}
        onClick={handleClickInput}
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
  );
}

export default SearchBar;
