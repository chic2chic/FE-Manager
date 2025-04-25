import QrScanner from "qr-scanner";
import { useRef } from "react";

type ScanHandler = (_scanResult: QrScanner.ScanResult) => void;

export const useQR = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  const startScan = async (handler: ScanHandler) => {
    try {
      if (!videoRef.current) {
        throw new Error("비디오 요소가 없습니다");
      }

      destroyInstance();

      const qrScanner = new QrScanner(
        videoRef.current,
        result => handler(result),
        QrOptions,
      );

      await qrScanner.start();
      qrScannerRef.current = qrScanner;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류";
      throw new Error(`QR 스캔 시작 실패: ${errorMessage}`);
    }
  };

  const stopScan = () => {
    destroyInstance();
  };

  const destroyInstance = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
  };

  return {
    videoRef,
    startScan,
    stopScan,
  };
};

export const QrOptions = {
  preferredCamera: "environment",
  maxScansPerSecond: 60,
  highlightScanRegion: true,
};
