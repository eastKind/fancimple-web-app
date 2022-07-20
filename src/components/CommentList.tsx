import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getComments } from "../redux/commentSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { GetCommentsQuery, CommentData, MyParams } from "../types";
// import Button from "./Button";
import styles from "./CommentList.module.scss";
import { Link } from "react-router-dom";

interface ListItemProps {
  comment: CommentData;
}

function ListItem({ comment }: ListItemProps) {
  // const dispatch = useAppDispatch();

  // const handleDeleteClick = async () => {
  //   await dispatch(deletePost(comment._id));
  // };

  return (
    <li className={styles.listItem}>
      <p>{comment.contents}</p>
      <p>{comment.createdAt}</p>
      <Link to={comment.writer._id}>{comment.writer.name}</Link>
      {/* <Button onClick={handleDeleteClick}>삭제</Button>
      <Button onClick={handleDeleteClick}>수정</Button> */}
    </li>
  );
}

function CommentList() {
  const { comments, cursor, hasNext } = useAppSelector(
    (state) => state.comment
  );
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const { id } = useParams<keyof MyParams>() as MyParams;
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleLoadMore = async (arg: GetCommentsQuery) => {
    await dispatch(getComments(arg));
  };

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoadMore({ id, cursor, limit: 10 });
  }, [isInterSecting]);

  return (
    <ul className={styles.list}>
      {comments?.map((comment) => (
        <ListItem key={comment._id} comment={comment} />
      ))}
      <div className={styles.loadMore} ref={targetRef}></div>
    </ul>
  );
}

export default CommentList;
