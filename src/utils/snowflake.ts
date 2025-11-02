/**
 * Creates a single snowflake element that falls from a button
 * @param button - The HTMLElement to spawn snowflakes from
 */
export function createSnowflake(button: HTMLElement): void {
  const snowflake = document.createElement('div');
  snowflake.textContent = '❄';
  snowflake.style.position = 'absolute';
  snowflake.style.pointerEvents = 'none';
  snowflake.style.zIndex = '1000';
  snowflake.style.color = 'white';
  snowflake.style.userSelect = 'none';

  // Random starting position above the button
  const buttonRect = button.getBoundingClientRect();
  const randomX = Math.random() * buttonRect.width;
  snowflake.style.left = `${randomX}px`;
  snowflake.style.top = '-10px';

  // Random size and opacity
  const size = Math.random() * 10 + 10; // 10-20px
  snowflake.style.fontSize = `${size}px`;
  snowflake.style.opacity = String(Math.random() * 0.5 + 0.5); // 0.5-1.0

  // Add transition for smooth animation
  snowflake.style.transition = 'all 2s ease-in';

  // Check if button has a snowflake container, otherwise append to button
  const container = button.querySelector('.snowflake-container') || button;
  container.appendChild(snowflake);

  // Trigger animation after a small delay
  setTimeout(() => {
    const fallDistance = buttonRect.height + 50;
    snowflake.style.top = `${fallDistance}px`;

    // Add random horizontal drift
    const drift = Math.random() * 40 - 20; // -20 to 20px
    const currentLeft = parseFloat(snowflake.style.left);
    snowflake.style.left = `${currentLeft + drift}px`;
  }, 50);

  // Remove snowflake after animation completes
  setTimeout(() => {
    snowflake.remove();
  }, 2000);
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
