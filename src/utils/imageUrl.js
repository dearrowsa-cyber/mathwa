/**
 * Utility function to convert image paths to full URLs
 * Handles various image path formats from MySQL database
 */

export const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return '/images/placeholder.jpg'; // Fallback image
  }

  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Normalize path - remove leading slashes
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  // Determine base URL - check if it already starts with uploads/
  let baseUrl = '';
  
  if (cleanPath.startsWith('uploads/')) {
    // Already has uploads prefix - use as is
    baseUrl = `https://mathwaa.org.sa//${cleanPath}`;
  } else if (cleanPath.startsWith('Mathwaa/uploads/')) {
    // Has Mathwaa prefix - remove it since we'll add our own
    baseUrl = `https://mathwaa.org.sa//${cleanPath.replace('Mathwaa/', '')}`;
  } else if (cleanPath.startsWith('Backend/')) {
    // Backend path - convert to uploads format
    baseUrl = `https://mathwaa.org.sa//uploads/${cleanPath.replace('Backend/', '')}`;
  } else if (cleanPath.startsWith('Frontend/')) {
    // Frontend path - convert to uploads format
    baseUrl = `https://mathwaa.org.sa//uploads/${cleanPath.replace('Frontend/', '')}`;
  } else if (cleanPath.includes('/')) {
    // Has directory structure but no prefix - add uploads
    baseUrl = `https://mathwaa.org.sa//uploads/${cleanPath}`;
  } else {
    // Simple filename - add uploads/news directory
    baseUrl = `https://mathwaa.org.sa//uploads/news/${cleanPath}`;
  }

  return baseUrl;
};

export default getImageUrl;
