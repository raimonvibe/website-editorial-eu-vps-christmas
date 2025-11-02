import { useEffect, useRef } from 'react';
import { createMultipleSnowflakes } from '../utils/snowflake';

/**
 * Hook to add snowflake effect to elements with a specific selector
 * Uses event delegation for better performance and to handle dynamically added elements
 * @param selector - CSS selector for elements that should trigger snowflakes on hover
 * @param enabled - Whether the effect is enabled (default: true)
 */
export function useSnowflakeEffect(selector: string, enabled: boolean = true) {
  const lastTriggeredRef = useRef<WeakMap<HTMLElement, number>>(new WeakMap());

  useEffect(() => {
    if (!enabled) return;

    // Use event delegation on the document level
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if the target or any parent matches the selector
      const matchedElement = target.closest(selector);

      if (matchedElement) {
        const element = matchedElement as HTMLElement;
        const now = Date.now();
        const lastTriggered = lastTriggeredRef.current.get(element) || 0;

        // Only trigger if it's been at least 2 seconds since last trigger
        // (matching the snowflake animation duration)
        if (now - lastTriggered > 2000) {
          createMultipleSnowflakes(element);
          lastTriggeredRef.current.set(element, now);
        }
      }
    };

    // Attach listener to document for event delegation
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [selector, enabled]);
}
