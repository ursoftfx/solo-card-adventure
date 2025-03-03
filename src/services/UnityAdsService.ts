
// Unity Ads SDK integration
// Game ID: 5806082
// Ad Unit IDs: Interstitial_Android, Rewarded_Android, Banner_Android

interface UnityAdsConfig {
  gameId: string;
  testMode: boolean;
  adUnitIds: {
    interstitial: string;
    rewarded: string;
    banner: string;
  };
}

class UnityAdsService {
  private static instance: UnityAdsService;
  private isInitialized: boolean = false;
  private config: UnityAdsConfig = {
    gameId: "5806082",
    testMode: process.env.NODE_ENV !== "production",
    adUnitIds: {
      interstitial: "Interstitial_Android",
      rewarded: "Rewarded_Android",
      banner: "Banner_Android"
    }
  };

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): UnityAdsService {
    if (!UnityAdsService.instance) {
      UnityAdsService.instance = new UnityAdsService();
    }
    return UnityAdsService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Load Unity Ads SDK script dynamically
      await this.loadUnityAdsSDK();
      
      if (window.UnityAds) {
        // Initialize Unity Ads SDK
        window.UnityAds.initialize(
          this.config.gameId,
          this.config.testMode,
          this.onInitializationComplete.bind(this)
        );
      } else {
        console.error('Unity Ads SDK failed to load');
      }
    } catch (error) {
      console.error('Failed to initialize Unity Ads:', error);
    }
  }

  private onInitializationComplete(initStatus: any): void {
    if (initStatus === window.UnityAds.InitializationStatus.INITIALIZATION_COMPLETE) {
      console.log('Unity Ads initialization complete');
      this.isInitialized = true;
      this.loadBanner();
    } else {
      console.error('Unity Ads initialization failed:', initStatus);
    }
  }

  private async loadUnityAdsSDK(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.UnityAds) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = "https://framework.unityads.unity3d.com/webview/3.0.0/webview.min.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Unity Ads SDK'));
      document.head.appendChild(script);
    });
  }

  public showInterstitial(onComplete?: () => void): void {
    if (!this.isInitialized || !window.UnityAds) {
      console.warn('Unity Ads not initialized, skipping interstitial ad');
      if (onComplete) onComplete();
      return;
    }

    const placementId = this.config.adUnitIds.interstitial;
    
    // Check if ad is ready
    if (window.UnityAds.isReady(placementId)) {
      window.UnityAds.show(placementId, {
        onComplete: () => {
          console.log('Interstitial ad completed');
          if (onComplete) onComplete();
        }
      });
    } else {
      console.warn('Interstitial ad not ready');
      if (onComplete) onComplete();
    }
  }

  public showRewardedAd(onRewarded?: () => void, onSkipped?: () => void): void {
    if (!this.isInitialized || !window.UnityAds) {
      console.warn('Unity Ads not initialized, skipping rewarded ad');
      if (onSkipped) onSkipped();
      return;
    }

    const placementId = this.config.adUnitIds.rewarded;
    
    // Check if ad is ready
    if (window.UnityAds.isReady(placementId)) {
      window.UnityAds.show(placementId, {
        onComplete: (placementId: string) => {
          console.log('Rewarded ad completed');
          if (onRewarded) onRewarded();
        },
        onSkip: () => {
          console.log('Rewarded ad skipped');
          if (onSkipped) onSkipped();
        }
      });
    } else {
      console.warn('Rewarded ad not ready');
      if (onSkipped) onSkipped();
    }
  }

  public loadBanner(): void {
    if (!this.isInitialized || !window.UnityAds) {
      console.warn('Unity Ads not initialized, skipping banner ad');
      return;
    }

    try {
      window.UnityAds.Banner.load(
        this.config.adUnitIds.banner,
        {
          width: 320,
          height: 50
        }
      );
      
      window.UnityAds.Banner.show({
        position: "BOTTOM_CENTER"
      });
    } catch (error) {
      console.error('Failed to load banner ad:', error);
    }
  }
  
  public destroyBanner(): void {
    if (window.UnityAds && window.UnityAds.Banner) {
      window.UnityAds.Banner.destroy();
    }
  }
  
  public cleanup(): void {
    this.destroyBanner();
    this.isInitialized = false;
  }
}

export default UnityAdsService;
