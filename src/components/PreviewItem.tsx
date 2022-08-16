import React, { useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import classNames from "classnames";
import styles from "../essets/scss/PreviewItem.module.scss";

interface PreviewItemProps {
  preview: string;
  index: number;
  isSelected: boolean;
  onDelete: (index: number) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

function PreviewItem({
  preview,
  index,
  isSelected,
  onDelete,
  moveItem,
}: PreviewItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "item",
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX =
        (clientOffset as XYCoord).x - hoverBoundingRect.right;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "item",
    item: () => ({ id: `${index}`, index }),
  });

  const handleClick = () => onDelete(index);
  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={styles.preview}
      value={index}
      data-handler-id={handlerId}
    >
      <img
        src={preview}
        alt={""}
        className={isSelected ? styles.selected : ""}
      />
      {isSelected && (
        <span
          className={classNames("material-symbols-rounded", styles.removeBtn)}
          onClick={handleClick}
        >
          close
        </span>
      )}
    </li>
  );
}

export default PreviewItem;
