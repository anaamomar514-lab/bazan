import type { PortfolioAsset } from "@/data/portfolio";

const baseUrl = import.meta.env.BASE_URL;
const isGitHubPages = baseUrl !== "/";

export function getPortfolioPreviewUrl(asset: PortfolioAsset) {
  if (!isGitHubPages || !asset.previewUrl?.startsWith("/manus-storage/")) {
    return asset.previewUrl;
  }

  const filename = asset.previewUrl.split("/").pop();
  const match = filename?.match(/^(.*)_[a-f0-9]{8}\.[^.]+$/i);
  return match ? `${baseUrl}assets/portfolio-thumbs/${match[1]}.jpg` : undefined;
}

export function getPortfolioViewUrl(asset: PortfolioAsset) {
  if (!isGitHubPages || !asset.viewUrl?.startsWith("/manus-storage/")) return asset.viewUrl;
  return undefined;
}

export function getPortfolioDownloadUrl(asset: PortfolioAsset) {
  if (!isGitHubPages || !asset.downloadUrl?.startsWith("/manus-storage/")) return asset.downloadUrl;
  return undefined;
}

export function getProfilePortraitUrl(manusUrl: string) {
  return isGitHubPages ? `${baseUrl}assets/profile-portrait.jpg` : manusUrl;
}

export { isGitHubPages };
