import { useEffect } from 'react';
import { createMultipleSnowflakes } from '../utils/snowflake';

/**
 * Hook to add snowflake effect to elements with a specific selector
 * @param selector - CSS selector for elements that should trigger snowflakes on hover
 * @param enabled - Whether the effect is enabled (default: true)
 */
export function useSnowflakeEffect(selector: string, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const elements = document.querySelectorAll(selector);

    const handleMouseEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      createMultipleSnowflakes(target);
    };

    elements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, [selector, enabled]);
}
