export function generateDeviceName() {
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;

  // Create a simple hash of the device information
  const deviceInfo = `${platform}-${userAgent}-${language}-${screenResolution}`;
  const hash = Array.from(deviceInfo).reduce(
    (hash, char) => ((hash << 5) - hash) + char.charCodeAt(0),
    0
  );

  // Return a device name with a unique identifier
  return `web-${Math.abs(hash).toString(16).slice(0, 8)}`;
}
