import Mixpanel from "mixpanel";

const mixpanelEvent = Mixpanel.init("");

export function trackServerEvent(
  eventName: string,
  properties: Record<string, unknown>
) {
  if (process.env.NODE_ENV === "development") return;

  mixpanelEvent.track(eventName, properties);
}
