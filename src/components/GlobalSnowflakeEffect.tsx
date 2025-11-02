'use client';
import { useSnowflakeEffect } from '../hooks/useSnowflakeEffect';

/**
 * Global component that applies snowflake effect to all buttons across the website
 */
export default function GlobalSnowflakeEffect() {
  // Apply snowflake effect to all button elements and links with button class
  useSnowflakeEffect('.button, button, input[type="submit"], input[type="button"]');

  return null; // This component doesn't render anything
}
