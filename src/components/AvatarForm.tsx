import React, { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { UserData } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { editPhoto } from "../redux/thunks/user";
import Avatar from "./Avatar";
import Modal from "./Modal";
import Button from "./Button";
import styles from "../essets/scss/AvatarForm.module.scss";

interface AvatarFormProps {
  user: UserData;
}

function AvatarForm({ user }: AvatarFormProps) {
  const { name, photoUrl } = user;
  const [file, setFile] = useState<File>();
  const [scale, setScale] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef: React.LegacyRef<AvatarEditor> = useRef(null);

  const initialize = () => {
    setModalOpen(false);
    setFile(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = e.target.files?.[0];
    setFile(nextFile);
  };

  const handleChangeScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };

  const handleCancel = () => initialize();

  const handleSubmit = () => {
    try {
      if (!editorRef.current) return;
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const formData = new FormData();
        formData.append("photo", blob);
        formData.append("key", `${user.photoUrl.match(/(?<=com\/).*/)}`);
        await dispatch(editPhoto(formData));
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      initialize();
    }
  };

  useEffect(() => {
    if (file) setModalOpen(true);
  }, [file]);

  return (
    <form className={styles.avatarForm}>
      <label htmlFor="file">
        <Avatar photo={photoUrl} name={name} className={styles.avatar} />
      </label>
      <input
        id="file"
        type="file"
        className={styles.fileInput}
        onChange={handleChangeFile}
        ref={inputRef}
      />
      <Modal isOpen={modalOpen} onClose={handleCancel}>
        <div className={styles.editor}>
          {file && (
            <AvatarEditor
              ref={editorRef}
              image={file}
              width={200}
              height={200}
              scale={scale}
              borderRadius={100}
            />
          )}
          <div className={styles.inputContainer}>
            <label htmlFor="scale">확대</label>
            <input
              id="scale"
              type="range"
              onChange={handleChangeScale}
              value={scale}
              min={1}
              max={2}
              step={0.01}
            />
          </div>
          <div className={styles.btns}>
            <Button onClick={handleSubmit} className={styles.submitBtn}>
              완료
            </Button>
            <Button
              onClick={handleCancel}
              className={styles.cancleBtn}
              variant="inverse"
            >
              취소
            </Button>
          </div>
        </div>
      </Modal>
    </form>
  );
}

export default AvatarForm;
