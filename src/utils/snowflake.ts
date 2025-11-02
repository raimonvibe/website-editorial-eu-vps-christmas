/**
 * Creates a single snowflake element that falls within a button
 * @param button - The HTMLElement to spawn snowflakes from
 */
export function createSnowflake(button: HTMLElement): void {
  // Ensure button has proper positioning for contained snowflakes
  const currentPosition = window.getComputedStyle(button).position;
  if (currentPosition === 'static') {
    button.style.position = 'relative';
  }
  button.style.overflow = 'hidden';

  const snowflake = document.createElement('div');
  snowflake.textContent = '❄';
  snowflake.style.position = 'absolute';
  snowflake.style.pointerEvents = 'none';
  snowflake.style.zIndex = '1';
  snowflake.style.color = 'white';
  snowflake.style.userSelect = 'none';

  // Get button dimensions (use offsetWidth/offsetHeight for consistent sizing)
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  // Random starting position at the top of the button
  const randomX = Math.random() * (buttonWidth - 20); // Account for snowflake size
  snowflake.style.left = `${randomX}px`;
  snowflake.style.top = '0px';

  // Random size and opacity (smaller sizes for buttons)
  const size = Math.random() * 8 + 8; // 8-16px
  snowflake.style.fontSize = `${size}px`;
  snowflake.style.opacity = String(Math.random() * 0.5 + 0.5); // 0.5-1.0

  // Add transition for smooth animation
  snowflake.style.transition = 'all 2s ease-in';

  // Append snowflake directly to button
  button.appendChild(snowflake);

  // Trigger animation after a small delay
  setTimeout(() => {
    // Fall to the bottom of the button
    snowflake.style.top = `${buttonHeight}px`;

    // Add small horizontal drift within button bounds
    const maxDrift = Math.min(20, buttonWidth / 4); // Limit drift to button width
    const drift = Math.random() * maxDrift * 2 - maxDrift;
    const currentLeft = parseFloat(snowflake.style.left);
    const newLeft = Math.max(0, Math.min(buttonWidth - size, currentLeft + drift));
    snowflake.style.left = `${newLeft}px`;
  }, 50);

  // Remove snowflake after animation completes
  setTimeout(() => {
    snowflake.remove();
  }, 2100);
}

/**
 * Creates multiple snowflakes with staggered timing
 * @param button - The HTMLElement to spawn snowflakes from
 * @param count - Number of snowflakes to create (default: 5)
 */
export function createMultipleSnowflakes(button: HTMLElement, count: number = 5): void {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createSnowflake(button), i * 200);
  }
}
