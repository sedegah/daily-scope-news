
/**
 * Calculates the estimated reading time for an article
 * @param text The article text content
 * @param wordsPerMinute Optional parameter to set custom reading speed (default: 200)
 * @returns Reading time in minutes
 */
export const calculateReadingTime = (text: string, wordsPerMinute: number = 200): number => {
  if (!text) return 1;
  
  // Remove HTML tags if present
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
  
  // Count words by splitting on whitespace
  const words = cleanText.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
};

/**
 * Adjusts reading time calculation for different languages
 * @param text The article text content
 * @param language The language code (e.g., 'en', 'fr', 'sw')
 * @returns Reading time in minutes
 */
export const calculateLocalizedReadingTime = (text: string, language: string = 'en'): number => {
  // Different languages have different reading speeds
  const readingSpeeds: Record<string, number> = {
    'en': 200,  // English: 200 words per minute
    'fr': 190,  // French: slightly slower than English
    'sw': 180,  // Swahili: estimate
    'ar': 170,  // Arabic: right-to-left script, estimate
    'am': 180,  // Amharic: estimate
    'ha': 180,  // Hausa: estimate
    'yo': 185,  // Yoruba: estimate
    'ig': 185,  // Igbo: estimate
  };
  
  const wordsPerMinute = readingSpeeds[language] || 200; // Default to English if language not found
  
  return calculateReadingTime(text, wordsPerMinute);
};
