import React from "react";
import { Link } from "react-router-dom";
import type { User } from "../types";
import Avatar from "./Avatar";
import styles from "../essets/scss/SearchList.module.scss";

interface SearchListProps {
  items: User[];
  type: "users" | "histories";
  onClick: (userId: string) => void;
}

function SearchList({ items, type, onClick }: SearchListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li
          key={item._id}
          className={styles.listItem}
          onClick={() => onClick(item._id)}
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
      {type === "users" && items.length < 1 && (
        <div className={styles.empty}>검색 결과가 없습니다.</div>
      )}
    </ul>
  );
}

export default SearchList;
