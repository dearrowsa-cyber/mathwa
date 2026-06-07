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
  
  const backendBase = 'https://mathwaa.org.sa/Backend';

  if (cleanPath.startsWith('uploads/')) {
    // Already has uploads prefix - use as is
    baseUrl = `${backendBase}/${cleanPath}`;
  } else if (cleanPath.startsWith('Mathwaa/uploads/')) {
    // Has Mathwaa prefix - remove it since we'll add our own
    baseUrl = `${backendBase}/${cleanPath.replace('Mathwaa/', '')}`;
  } else if (cleanPath.startsWith('Backend/')) {
    // Backend path - convert to uploads format
    baseUrl = `${backendBase}/${cleanPath.replace('Backend/', '')}`;
  } else if (cleanPath.startsWith('Frontend/')) {
    // Frontend path - convert to uploads format
    baseUrl = `${backendBase}/uploads/${cleanPath.replace('Frontend/', '')}`;
  } else if (cleanPath.includes('/')) {
    // Has directory structure but no prefix - add uploads
    baseUrl = `${backendBase}/uploads/${cleanPath}`;
  } else {
    // Simple filename - add uploads/news directory
    baseUrl = `${backendBase}/uploads/news/${cleanPath}`;
  }

  return baseUrl;
};

export default getImageUrl;
