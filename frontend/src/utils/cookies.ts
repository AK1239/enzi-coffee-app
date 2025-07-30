// Cookie management utilities for authentication

/**
 * Set an authentication cookie
 */
export function setAuthCookie(token: string, expiresInDays: number = 1): void {
  if (typeof window === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + expiresInDays * 24 * 60 * 60 * 1000);

  document.cookie = `auth-token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
}

/**
 * Get authentication cookie value
 */
export function getAuthCookie(): string | null {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => 
    cookie.trim().startsWith('auth-token=')
  );

  if (authCookie) {
    return authCookie.split('=')[1];
  }

  return null;
}

/**
 * Remove authentication cookie
 */
export function removeAuthCookie(): void {
  if (typeof window === 'undefined') return;

  document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

/**
 * Check if authentication cookie exists
 */
export function hasAuthCookie(): boolean {
  return getAuthCookie() !== null;
} 