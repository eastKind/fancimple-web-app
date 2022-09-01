import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { User } from "../types";
import styles from "../essets/scss/Search.module.scss";
import Avatar from "./Avatar";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword");
  const [keyword, setKeyword] = useState(initKeyword || "");
  const [users, setUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setKeyword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(keyword ? { keyword } : {});
  };

  return (
    <div className={styles.container}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input type="text" value={keyword} onChange={handleChange} />
        <button type="submit">
          <span className="material-symbols-rounded">search</span>
        </button>
      </form>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id}>
            <Avatar photo={user.photoUrl} name={user.name} />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
