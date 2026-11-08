import { ArrowDownToLine, ArrowUpLeft, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioAsset } from "@/data/portfolio";
import { getPortfolioDownloadUrl, getPortfolioPreviewUrl, getPortfolioViewUrl, isGitHubPages } from "@/lib/portfolioAssetUrls";

type AssetPreviewDialogProps = {
  asset: PortfolioAsset | null;
  onClose: () => void;
};

export function AssetPreviewDialog({ asset, onClose }: AssetPreviewDialogProps) {
  if (!asset) {
    return <Dialog open={false} onOpenChange={(open) => { if (!open) onClose(); }} />;
  }

  const previewUrl = getPortfolioPreviewUrl(asset);
  const viewUrl = getPortfolioViewUrl(asset);
  const downloadUrl = getPortfolioDownloadUrl(asset);
  const imagePreviewOnly = asset.kind === "image" && !viewUrl && Boolean(previewUrl);

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="asset-dialog" dir="rtl">
        <DialogHeader className="asset-dialog-header">
          <span className="eyebrow">{asset.categoryName}</span>
          <DialogTitle dir="auto">{asset.name}</DialogTitle>
          <DialogDescription>
            {asset.description || "معاينة من الملفات الأصلية الموجودة في الحقيبة المهنية."}
          </DialogDescription>
        </DialogHeader>

        <div className="asset-dialog-viewer">
          {asset.kind === "image" && (viewUrl || previewUrl) ? (
            <img className="dialog-image" src={viewUrl || previewUrl} alt={asset.name} />
          ) : null}

          {asset.kind === "video" && viewUrl ? (
            <video
              className="dialog-video"
              src={viewUrl}
              poster={previewUrl}
              controls
              playsInline
              preload="metadata"
              aria-label={asset.name}
            />
          ) : null}

          {asset.kind === "audio" && viewUrl ? (
            <div className="dialog-audio-wrap">
              <div className="dialog-audio-art" aria-hidden="true"><span className="audio-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span></div>
              <audio src={viewUrl} controls preload="metadata" aria-label={asset.name} />
            </div>
          ) : null}

          {asset.viewIsPdf && viewUrl ? (
            <iframe className="dialog-pdf" src={`${viewUrl}#view=FitH`} title={`معاينة ${asset.name}`} />
          ) : null}

          {!viewUrl && asset.driveUrl && !imagePreviewOnly ? (
            <div className="drive-fallback">
              <p>تُعرض الملفات الأصلية عبر Google Drive؛ استخدمي الزر أدناه لفتح المصدر.</p>
              <a className="button button-primary" href={asset.driveUrl} target="_blank" rel="noreferrer">
                فتح الملف في Google Drive <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          ) : null}

          {!viewUrl && !asset.driveUrl && !imagePreviewOnly ? (
            <div className="drive-fallback"><p>لا تتوفر معاينة لهذا الملف.</p></div>
          ) : null}
        </div>

        <DialogFooter className="asset-dialog-footer">
          {downloadUrl ? (
            <a className="button button-primary" href={downloadUrl} download={asset.downloadName || asset.name}>
              تنزيل {asset.kind === "presentation" ? "العرض الأصلي" : "الملف"}
              <ArrowDownToLine size={16} aria-hidden="true" />
            </a>
          ) : null}
          {isGitHubPages && asset.driveUrl ? (
            <a className="button button-quiet" href={asset.driveUrl} target="_blank" rel="noreferrer">
              فتح المصدر في Drive <ArrowUpLeft size={16} aria-hidden="true" />
            </a>
          ) : null}
          {!isGitHubPages && asset.driveUrl && downloadUrl ? (
            <a className="button button-quiet" href={asset.driveUrl} target="_blank" rel="noreferrer">
              المصدر في Drive <ArrowUpLeft size={16} aria-hidden="true" />
            </a>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
