
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
  private initializationInProgress: boolean = false;
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
    if (this.isInitialized || this.initializationInProgress) return;
    
    this.initializationInProgress = true;
    
    try {
      // Load Unity Ads SDK script dynamically
      await this.loadUnityAdsSDK();
      
      // Wait a short time to make sure the script is fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (typeof window.UnityAds !== 'undefined') {
        // Initialize Unity Ads SDK
        window.UnityAds.initialize(
          this.config.gameId,
          this.config.testMode,
          this.onInitializationComplete.bind(this)
        );
        console.log('Unity Ads initialization started');
      } else {
        console.error('Unity Ads SDK failed to load or is blocked by an ad blocker');
        this.initializationInProgress = false;
      }
    } catch (error) {
      console.error('Failed to initialize Unity Ads:', error);
      this.initializationInProgress = false;
    }
  }

  private onInitializationComplete(initStatus: any): void {
    this.initializationInProgress = false;
    
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
      if (typeof window.UnityAds !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      // Use the CDN URL from Unity documentation
      script.src = "https://static.unityads.unity3d.com/sdk/3.8.0/UnityAds.js";
      script.async = true;
      script.onload = () => {
        console.log('Unity Ads SDK loaded successfully');
        resolve();
      };
      script.onerror = () => {
        console.error('Failed to load Unity Ads SDK - likely blocked by an ad blocker');
        reject(new Error('Failed to load Unity Ads SDK'));
      };
      document.head.appendChild(script);
    });
  }

  public showInterstitial(onComplete?: () => void): void {
    if (!this.isInitialized || typeof window.UnityAds === 'undefined') {
      console.warn('Unity Ads not initialized, skipping interstitial ad');
      if (onComplete) onComplete();
      return;
    }

    const placementId = this.config.adUnitIds.interstitial;
    
    try {
      // Check if ad is ready
      if (window.UnityAds.isReady(placementId)) {
        console.log('Showing interstitial ad');
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
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      if (onComplete) onComplete();
    }
  }

  public showRewardedAd(onRewarded?: () => void, onSkipped?: () => void): void {
    if (!this.isInitialized || typeof window.UnityAds === 'undefined') {
      console.warn('Unity Ads not initialized, skipping rewarded ad');
      if (onSkipped) onSkipped();
      return;
    }

    const placementId = this.config.adUnitIds.rewarded;
    
    try {
      // Check if ad is ready
      if (window.UnityAds.isReady(placementId)) {
        console.log('Showing rewarded ad');
        window.UnityAds.show(placementId, {
          onComplete: () => {
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
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      if (onSkipped) onSkipped();
    }
  }

  public loadBanner(): void {
    if (!this.isInitialized || typeof window.UnityAds === 'undefined') {
      console.warn('Unity Ads not initialized, skipping banner ad');
      return;
    }

    try {
      if (window.UnityAds.Banner) {
        console.log('Loading banner ad');
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
      } else {
        console.warn('Unity Ads Banner module not available');
      }
    } catch (error) {
      console.error('Failed to load banner ad:', error);
    }
  }
  
  public destroyBanner(): void {
    if (typeof window.UnityAds !== 'undefined' && window.UnityAds.Banner) {
      try {
        window.UnityAds.Banner.destroy();
      } catch (error) {
        console.error('Error destroying banner:', error);
      }
    }
  }
  
  public cleanup(): void {
    this.destroyBanner();
    this.isInitialized = false;
    this.initializationInProgress = false;
  }
}

export default UnityAdsService;
