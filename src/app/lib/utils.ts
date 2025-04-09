import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression, { Options } from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
  if (!link) return "";

  return link
    .replace(/\s/g, "")
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, "")
    .toLocaleLowerCase();
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const options: Options = {
      maxSizeMB: 0.2, // 200KB
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/png",
    };

    imageCompression(file, options).then((compressedFile) =>
      resolve(compressedFile)
    );
  });
};

export async function compressFiles(files: File[]) {
  const compressPromises = files.map(async (file) => {
    try {
      return await compressImage(file);
    } catch {
      return null;
    }
  });

  return (await Promise.all(compressPromises)).filter((file) => file !== null);
}

export function formatUrl(url: string) {
  return url.startsWith("http") ? url : `https://${url}`;
}
