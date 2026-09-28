type UnsplashOptions = {
  width?: number;
  /** Crops to this height; omit to keep the photo's own aspect ratio. */
  height?: number;
  /** Zoom into a point of the photo (x/y are 0–1, zoom >= 1). */
  focus?: { x: number; y: number; zoom: number };
};

export function unsplash(id: string, widthOrOptions: number | UnsplashOptions = 1200) {
  const { width = 1200, height, focus } =
    typeof widthOrOptions === "number" ? { width: widthOrOptions } : widthOrOptions;

  const params = new URLSearchParams({ auto: "format", fit: "crop", w: String(width), q: "80" });
  if (height) params.set("h", String(height));
  if (focus) {
    params.set("crop", "focalpoint");
    params.set("fp-x", String(focus.x));
    params.set("fp-y", String(focus.y));
    params.set("fp-z", String(focus.zoom));
  }

  return `https://images.unsplash.com/photo-${id}?${params}`;
}
