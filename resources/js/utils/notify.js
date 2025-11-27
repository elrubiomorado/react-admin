export function notify(titulo, mensaje) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(titulo, { body: mensaje });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(titulo, { body: mensaje });
      }
    });
  }
}
