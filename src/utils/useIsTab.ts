import { useMediaQuery } from "react-responsive";

/**
 * Hook to detect if the current viewport is tablet size
 * @returns boolean indicating if the viewport is tablet size
 */
const useIsTab = (): boolean => {
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1223,
  });

  return isTablet;
};

export default useIsTab;