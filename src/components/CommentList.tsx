import React, {
  useRef,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  getComments,
  deleteComment,
  updateComment,
} from "../redux/commentSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { GetCommentsQuery, CommentData, MyParams } from "../types";
import Button from "./Button";
import CommentForm from "./CommentForm";
import styles from "../essets/scss/CommentList.module.scss";

interface ListItemProps {
  comment: CommentData;
  onEdit: Dispatch<SetStateAction<string>>;
}

function ListItem({ comment, onEdit }: ListItemProps) {
  const dispatch = useAppDispatch();

  const handleDeleteClick = async () => {
    await dispatch(deleteComment(comment._id));
  };

  const handleEditClick = () => onEdit(comment._id);

  return (
    <div>
      <p>{comment.contents}</p>
      <p>{comment.createdAt}</p>
      <Link to={comment.writer._id}>{comment.writer.name}</Link>
      <Button onClick={handleEditClick}>수정</Button>
      <Button onClick={handleDeleteClick}>삭제</Button>
    </div>
  );
}

function CommentList() {
  const { comments, cursor, hasNext } = useAppSelector(
    (state) => state.comment
  );
  const [editingId, setEditingId] = useState("");
  const dispatch = useAppDispatch();
  const targetRef = useRef<any>(null);
  const { id } = useParams<keyof MyParams>() as MyParams;
  const isInterSecting = useInfiniteScroll(targetRef);

  const handleCancle = () => setEditingId("");

  const handleLoadMore = async (arg: GetCommentsQuery) => {
    await dispatch(getComments(arg));
  };

  useEffect(() => {
    if (isInterSecting && hasNext) handleLoadMore({ id, cursor, limit: 10 });
  }, [isInterSecting]);

  return (
    <ul className={styles.list}>
      {comments?.map((comment) =>
        comment._id === editingId ? (
          <li key={comment._id} className={styles.listItem}>
            <CommentForm
              onSubmit={updateComment}
              onCancle={handleCancle}
              initialValue={comment.contents}
              editingId={editingId}
            />
          </li>
        ) : (
          <li key={comment._id} className={styles.listItem}>
            <ListItem comment={comment} onEdit={setEditingId} />
          </li>
        )
      )}
      <div className={styles.loadMore} ref={targetRef}></div>
    </ul>
  );
}

export default CommentList;
