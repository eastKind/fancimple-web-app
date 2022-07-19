import React from "react";
import { createPortal } from "react-dom";

function Portal({ children }: { children: React.ReactNode }) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return createPortal(children, modalRoot);
}

export default Portal;
