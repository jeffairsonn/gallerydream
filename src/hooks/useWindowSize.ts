import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  let handleResize: () => { width: number; height: number };

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        return {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      };

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export default useWindowSize;
