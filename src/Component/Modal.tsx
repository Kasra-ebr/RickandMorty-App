import { XCircleIcon } from "@heroicons/react/24/outline";
import Button from "./UI/Button";
import { ReactNode } from "react";
import "./../App.css"
interface ModalProps {
  title: string;
  children: ReactNode;
  onOpen: (open: boolean) => void;
  open: boolean;
}

function Modal({ title, children, onOpen, open }: ModalProps) {
  if (!open) return null;

  return (
    <div>
      <div className="backdrop" onClick={() => onOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <Button onClick={() => onOpen(false)}>
          <XCircleIcon  className="icon close" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
