import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

export const useIsMobile = () => {
  const getMatches = () => (typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY).matches : false);

  const [isMobile, setIsMobile] = useState<boolean>(getMatches);

  useEffect(() => {
    const mediaQuery = typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY) : null;
    if (!mediaQuery) return undefined;

    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

export default useIsMobile;
