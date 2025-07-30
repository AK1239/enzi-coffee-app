// Token validation utilities

/**
 * Check if a JWT token is expired
 * Note: This is a client-side check that doesn't verify the signature
 * For full security, always validate tokens on the server side
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    return payload.exp < currentTime;
  } catch (error) {
    // If we can't parse the token, consider it expired/invalid
    return true;
  }
}

/**
 * Get token expiration time
 */
export function getTokenExpiration(token: string): Date | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch (error) {
    return null;
  }
}

/**
 * Check if token will expire soon (within the next hour)
 */
export function isTokenExpiringSoon(token: string, thresholdMinutes: number = 60): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    const thresholdSeconds = thresholdMinutes * 60;
    
    return (payload.exp - currentTime) < thresholdSeconds;
  } catch (error) {
    return true;
  }
}

/**
 * Validate token format (basic check)
 */
export function isValidTokenFormat(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // JWT tokens have 3 parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  // Each part should be base64 encoded
  try {
    parts.forEach(part => {
      atob(part);
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Extract user information from token (without verification)
 */
export function extractUserFromToken(token: string): { userId?: string; email?: string; name?: string } | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
    };
  } catch (error) {
    return null;
  }
} 