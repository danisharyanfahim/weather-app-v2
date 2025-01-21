import { useEffect, useMemo, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const isClient = typeof window !== "undefined"; // Check if window is defined
  const mediaQuery = useMemo(
    () => (isClient ? window.matchMedia(query) : null),
    [query, isClient]
  );
  const [match, setMatch] = useState<boolean>(
    isClient && mediaQuery ? mediaQuery.matches : false
  ); // Set initial match state to false if not in client or mediaQuery is null

  useEffect(() => {
    if (!isClient || !mediaQuery) return;

    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange); // Cleanup listener on component unmount
  }, [mediaQuery, isClient]);

  return match;
};
