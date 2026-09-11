"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Chevron, DownloadIcon } from "@/components/icons";

const RESUME_PDF_ID = "1g4oWoffsD1ULr37XBNjHw5iwYm8qtWb6";
const RESUME_PDF_PREVIEW = `https://drive.google.com/file/d/${RESUME_PDF_ID}/preview`;

/**
 * Opens the résumé PDF (hosted on Google Drive) in a lightbox over the
 * current page — no navigation, no new tab. Styled to match the site's
 * "glass tech" look.
 */
export function DownloadResumeButton({
  className = "btn btn-ghost",
  label = "下載履歷 PDF",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <DownloadIcon className="h-[1.05em] w-[1.05em]" />
        {label}
      </button>
      {open && <ResumePdfLightbox onClose={() => setOpen(false)} />}
    </>
  );
}

function ResumePdfLightbox({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="pdf-lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="履歷 PDF"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pdf-lightbox relative flex h-[min(92vh,58rem)] w-[min(94vw,40rem)] flex-col overflow-hidden rounded-2xl">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan/80 to-transparent"
        />
        <div className="flex items-center gap-2.5 border-b border-hair bg-white/[0.03] px-4 py-3">
          <Chevron className="animate-chev shrink-0 text-cyan" />
          <span className="text-[15px] font-bold text-gradient">履歷 PDF</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="ml-auto grid h-8 w-8 place-items-center rounded-full border border-hair text-fg-dim transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <iframe
          src={RESUME_PDF_PREVIEW}
          title="履歷 PDF"
          className="w-full flex-1 border-0 bg-[#f8f9fa]"
          allow="autoplay"
        />
      </div>
    </div>,
    document.body,
  );
}
