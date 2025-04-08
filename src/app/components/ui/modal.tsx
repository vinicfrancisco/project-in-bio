"use client";

import useOnClickOutside from "@/app/hooks/useOnClickOutside";
import { PropsWithChildren, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Modal({
  isOpen,
  setIsOpen,
  children,
}: PropsWithChildren<ModalProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#787878]/10 flex items-center justify-center backdrop-blur-md z-50">
      <div ref={ref}>{children}</div>
    </div>
  );
}
