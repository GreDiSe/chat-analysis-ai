import RNBlobUtil from 'react-native-blob-util';
import { unzip } from 'react-native-zip-archive';
import RNFS from 'react-native-fs';

/**
 * Step 1: Copy the content:// URI to a local file
 */
export async function copyContentUriToFile(contentUri: string): Promise<string> {
  const uniqueId = Math.random().toString(16).slice(2);
  const destPath = `${RNBlobUtil.fs.dirs.CacheDir}/whatsapp-export-${uniqueId}.zip`;
  await RNBlobUtil.fs.cp(contentUri, destPath);
  return destPath;
}

/**
 * Step 2: Unzip the archive
 */
export async function unzipWhatsAppExport(zipPath: string): Promise<string> {
  const uniqueId = Math.random().toString(16).slice(2);
  const targetDir = `${RNBlobUtil.fs.dirs.CacheDir}/whatsapp-${uniqueId}`;
  const extractedPath = await unzip(zipPath, targetDir);
  return extractedPath;
}

/**
 * Step 3: Read the WhatsApp .txt file
 */
export async function readChatTxt(extractedDir: string): Promise<string> {
  const files = await RNFS.readDir(extractedDir);
  const chatFile = files.find(f => f.name.endsWith('.txt'));
  if (!chatFile) throw new Error('No .txt file found in export');
  const text = await RNFS.readFile(chatFile.path, 'utf8');
  return text;
} 