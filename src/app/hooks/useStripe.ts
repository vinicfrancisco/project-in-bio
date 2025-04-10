"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

interface CreateCheckoutProps {
  metadata: Record<string, unknown>;
  isSubscription: boolean;
}

export default function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  const createCheckout = async ({
    metadata,
    isSubscription,
  }: CreateCheckoutProps) => {
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata,
          isSubscription,
        }),
      });

      const data = await response.json();

      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      console.log(error);
      //
    }
  };

  const createPortal = async () => {
    const response = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    window.location.href = data.url;
  };

  useEffect(() => {
    async function initStripe() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
      );

      setStripe(stripeInstance);
    }

    initStripe();
  }, []);

  return { createCheckout, createPortal };
}
