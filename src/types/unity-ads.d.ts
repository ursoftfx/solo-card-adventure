
interface UnityAdsInitializationStatus {
  INITIALIZATION_COMPLETE: string;
  INITIALIZATION_ERROR: string;
}

interface UnityAdsBanner {
  load: (placementId: string, options: { width: number; height: number }) => void;
  show: (options: { position: string }) => void;
  destroy: () => void;
}

interface UnityAds {
  initialize: (gameId: string, testMode: boolean, initCallback: (status: string) => void) => void;
  isReady: (placementId: string) => boolean;
  show: (placementId: string, options: { onComplete?: (placementId: string) => void; onSkip?: () => void }) => void;
  InitializationStatus: UnityAdsInitializationStatus;
  Banner: UnityAdsBanner;
}

declare global {
  interface Window {
    UnityAds?: UnityAds;
  }
}

export {};
