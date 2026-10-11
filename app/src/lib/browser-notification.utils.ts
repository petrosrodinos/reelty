export type BrowserNotificationPermission = NotificationPermission | "unsupported";

export const getBrowserNotificationPermission = (): BrowserNotificationPermission =>
  typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported";

/** Asks for permission (must be called from a user gesture). Resolves to the resulting permission. */
export const requestBrowserNotificationPermission = async (): Promise<BrowserNotificationPermission> => {
  if (getBrowserNotificationPermission() === "unsupported") return "unsupported";
  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
};

/** Shows a notification if permission was granted; clicking it focuses the tab. Never throws. */
export const showBrowserNotification = (title: string, body: string, tag?: string, url?: string): void => {
  if (getBrowserNotificationPermission() !== "granted") return;
  try {
    const notification = new Notification(title, { body, tag, icon: "/favicon.ico" });
    notification.onclick = () => {
      window.focus();
      if (url) window.location.assign(url);
      notification.close();
    };
  } catch {
    // some mobile browsers only allow notifications through a service worker
  }
};
