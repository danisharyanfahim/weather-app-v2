import { useMemo } from "react";
import { useMediaQuery } from "./useMediaQuery";

export const useMediaQueries = (): number => {
  const phone = useMediaQuery("(max-width: 319px)");
  const phablet = useMediaQuery("(max-width: 449px)");
  const tablet = useMediaQuery("(max-width: 767px)");
  const laptop = useMediaQuery("(max-width: 1023px)");
  const desktop = useMediaQuery("(max-width: 1439px)");
  const device = useMemo((): number => {
    if (phone) {
      return 1;
    } else if (phablet) {
      return 2;
    } else if (tablet) {
      return 3;
    } else if (laptop) {
      return 4;
    } else if (desktop) {
      return 5;
    } else {
      return 6; //Widescreen devices
    }
  }, [phone, phablet, tablet, laptop]); //This code will be improved later on once I have a better understanding of typescript
  return device;
};
