import { useEffect, useMemo, useRef } from "react";

const FRAME_INDICES = [
  0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76,
];

export function useTopDownSprite({ imgRef, isMoving, fps = 10 } = {}) {
  const intervalRef = useRef(null);
  const frameIndexRef = useRef(0);

  const frames = useMemo(
    () =>
      FRAME_INDICES.map((n) => {
        const padded = String(n).padStart(5, "0");
        return `/images/top-down-m/MOVI PERSON 3_${padded}.png`;
      }),
    [],
  );

  // Garante frame inicial parado
  useEffect(() => {
    if (!imgRef?.current || frames.length === 0) return;
    imgRef.current.src = frames[0];
  }, [imgRef, frames]);

  useEffect(() => {
    if (!imgRef?.current || frames.length === 0) return;

    const clear = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!isMoving) {
      clear();
      frameIndexRef.current = 0;
      imgRef.current.src = frames[0];
      return clear;
    }

    // Já animando
    if (intervalRef.current) return clear;

    const frameInterval = 1000 / fps;
    intervalRef.current = setInterval(() => {
      if (!imgRef.current) return;
      frameIndexRef.current = (frameIndexRef.current + 1) % frames.length;
      imgRef.current.src = frames[frameIndexRef.current];
    }, frameInterval);

    return clear;
  }, [imgRef, isMoving, fps, frames]);
}
