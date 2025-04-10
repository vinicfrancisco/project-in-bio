"use client";

import useStripe from "@/app/hooks/useStripe";

export default function PortalButton() {
  const { createPortal } = useStripe();

  return <button onClick={createPortal}>Portal</button>;
}
