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
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => {
      return { id: `${index}`, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => onDelete(index);
  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={styles.preview}
      value={index}
      data-handler-id={handlerId}
      style={{ cursor: isDragging ? "grab" : "pointer" }}
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
