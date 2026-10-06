export type FbqEventName =
  | "PageView"
  | "ViewContent"
  | "InitiateCheckout"
  | "AddToCart"
  | "Purchase"
  | "Lead"
  | "Subscribe"
  | "Contact"
  | "Donate"
  | string;

type FbqParams = Record<string, unknown> & {
  content_type?: string;
  content_ids?: string[];
  contents?: Array<Record<string, unknown>>;
  currency?: string;
  value?: number;
  num_items?: number;
  page_path?: string;
  page_url?: string;
  page_title?: string;
};

type MetaFbqFn = {
  (event: "track", eventName: FbqEventName, params?: FbqParams): void;
  (event: "init", pixelId: string, advancedMatching?: Record<string, unknown>): void;
  (event: "trackSingle", pixelId: string, eventName: FbqEventName, params?: FbqParams): void;
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  push?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: MetaFbqFn;
    _fbq?: MetaFbqFn;
  }
}

const PIXEL_ID = "828382389872344";

export function fbqTrack(eventName: FbqEventName, params: FbqParams = {}) {
  if (typeof window === "undefined") return;
  const fbq = window.fbq;
  if (typeof fbq !== "function") return;
  try {
    const customData: FbqParams = {
      ...params,
    };
    fbq("track", eventName, customData);
  } catch {
    /* noop */
  }
}

export function fbqTrackSingle(
  eventName: FbqEventName,
  params: FbqParams = {},
  pixelId: string = PIXEL_ID,
) {
  if (typeof window === "undefined") return;
  const fbq = window.fbq;
  if (typeof fbq !== "function") return;
  try {
    fbq("trackSingle", pixelId, eventName, params);
  } catch {
    /* noop */
  }
}

export function fbqTrackInitiateCheckout(opts: {
  value: number;
  contentName: string;
  contentId: string;
  currency?: string;
  numItems?: number;
}) {
  const { value, contentName, contentId, currency = "BRL", numItems = 1 } = opts;
  fbqTrack("InitiateCheckout", {
    value,
    currency,
    num_items: numItems,
    content_type: "product",
    content_ids: [contentId],
    contents: [
      {
        id: contentId,
        quantity: numItems,
        item_price: value,
        title: contentName,
      },
    ],
  });
}

export function fbqTrackPurchase(opts: {
  value: number;
  contentName: string;
  contentId: string;
  currency?: string;
  numItems?: number;
  transactionId?: string;
}) {
  const {
    value,
    contentName,
    contentId,
    currency = "BRL",
    numItems = 1,
    transactionId,
  } = opts;
  fbqTrack("Purchase", {
    value,
    currency,
    num_items: numItems,
    content_type: "product",
    content_ids: [contentId],
    contents: [
      {
        id: contentId,
        quantity: numItems,
        item_price: value,
        title: contentName,
      },
    ],
    ...(transactionId ? { order_id: transactionId } : {}),
  });
}

export function fbqTrackLead(opts?: { value?: number; currency?: string }) {
  const { value, currency = "BRL" } = opts ?? {};
  fbqTrack("Lead", {
    ...(typeof value === "number" ? { value, currency } : {}),
  });
}

export function fbqTrackViewContent(opts: {
  value?: number;
  contentName: string;
  contentId: string;
  currency?: string;
}) {
  const { value, contentName, contentId, currency = "BRL" } = opts;
  fbqTrack("ViewContent", {
    content_type: "product",
    content_ids: [contentId],
    content_name: contentName,
    ...(typeof value === "number" ? { value, currency } : {}),
  });
}

export const META_PIXEL_ID = PIXEL_ID;
