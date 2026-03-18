/**
 * Admin password is stored only as a SHA-256 hash (never plain text).
 * - Default password: farfalleadmin
 * - Stored value below is the hash of that password. To use a different password,
 *   generate a new hash (e.g. node -e "const c=require('crypto');console.log(c.createHash('sha256').update('YOUR_PASSWORD').digest('hex'));")
 *   and replace ADMIN_PASSWORD_HASH.
 */
const ADMIN_PASSWORD_HASH =
  '67eda68854864551659d5bed381ae1936f3f38946dd25be5625b2a5f605e86f7';

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === ADMIN_PASSWORD_HASH;
}

const ADMIN_AUTH_KEY = 'farfalle_admin_authenticated';

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(ADMIN_AUTH_KEY, '1');
}

export function clearAdminAuth(): void {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === '1';
}
