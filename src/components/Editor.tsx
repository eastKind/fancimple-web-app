import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { useAppDispatch } from "../redux/hooks";
import { editPhoto } from "../redux/thunks/user";
import tanguri from "../essets/images/tanguri.png";

function Editor() {
  const [scale, setScale] = useState(1);
  const dispatch = useAppDispatch();
  const ref: React.LegacyRef<AvatarEditor> = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ref.current) {
      const canvas = ref.current.getImageScaledToCanvas();
      const formData = new FormData();
      canvas.toBlob((Blob) => {
        formData.append("photo", Blob as Blob);
      });
      await dispatch(editPhoto(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="range"
        onChange={handleChange}
        value={scale}
        min={1}
        max={2}
        step={0.01}
      />
      <AvatarEditor
        ref={ref}
        image={tanguri}
        width={200}
        height={200}
        scale={scale}
        borderRadius={100}
      />
      <button type="submit">완료</button>
    </form>
  );
}

export default Editor;
