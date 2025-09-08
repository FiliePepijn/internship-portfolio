import React, { useEffect, useState, useRef } from 'react';

const ScrollToaster = () => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const resetTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Set a new timer to show the toast after 5 seconds of no scrolling
    timerRef.current = setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Close the toast immediately on scroll
      setOpen(false);
      // Reset the timer to show it again after 5 seconds of inactivity
      resetTimer();
    };

    // Initial call to start the timer when the component mounts
    resetTimer();

    // Add a scroll event listener to close the toast and reset the timer on user activity
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to clear the timer and remove the event listener
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-1 rounded-xl p-4 transition-all duration-300 transform shadow-lg
        ${open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}
         dark:outline-[var(--light)] dark:bg-[var(--dark)]  dark:text-[var(--ligth)] bg-[var(--light)] text-[var(--dark)] outline-3  outline-[var(--dark)] `}
      >
        <div className="flex justify-between items-center gap-4">
          <div className="text-sm font-semibold">
           Scroll
          </div>
        </div>
       
      </div>
    </>
  );
};

export default ScrollToaster;
