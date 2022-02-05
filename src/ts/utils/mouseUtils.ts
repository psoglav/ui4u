export function onClickOutside(
  target: HTMLElement,
  cb: (event: MouseEvent) => void
) {
  document.addEventListener("click", (e) => {
    if (target.contains(e.target as Node)) return;
    cb(e);
  });
}

export function useMouseMove(value?: any) {
  let mouse: any = value || {};

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  return mouse;
}
