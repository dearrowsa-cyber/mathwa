/**
 * Utility function to convert image paths to full URLs
 * Handles various image path formats from MySQL database
 */

export const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return '/images/placeholder.jpg'; // Fallback image
  }

  // Define the base domain where uploads are actually served
  const domain = 'https://mathwaa.org.sa';

  // Normalize path by stripping the domain if it exists
  let cleanPath = imagePath;
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    try {
      const urlObj = new URL(cleanPath);
      cleanPath = urlObj.pathname; // Gets everything after the domain (e.g., /Mathwaa/uploads/...)
    } catch (e) {
      // If parsing fails, just leave it as is
    }
  }

  // Remove leading slash
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  // Remove invalid prefixes from the database (e.g., 'Mathwaa/', 'Backend/', 'Frontend/')
  cleanPath = cleanPath
    .replace(/^Mathwaa\//i, '')
    .replace(/^Backend\//i, '')
    .replace(/^Frontend\//i, '');

  // Now, determine the final URL
  if (cleanPath.startsWith('uploads/')) {
    return `${domain}/${cleanPath}`;
  } else if (cleanPath.includes('/')) {
    // Has a directory structure but no prefix, add 'uploads/'
    return `${domain}/uploads/${cleanPath}`;
  } else {
    // Just a filename, default to news
    return `${domain}/uploads/news/${cleanPath}`;
  }
};

export default getImageUrl;
