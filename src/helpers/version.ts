import pkg from '../../package.json';

export const getAppVersion = (): string => pkg.version;

export function isVersionLessThan(current: string, required: string): boolean {
  const cur = current.split('.').map(Number);
  const req = required.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((cur[i] || 0) < (req[i] || 0)) return true;
    if ((cur[i] || 0) > (req[i] || 0)) return false;
  }
  return false;
} 