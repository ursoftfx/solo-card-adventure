
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
  private isAdBlockerDetected: boolean = false;
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (typeof window.UnityAds !== 'undefined') {
        // Initialize Unity Ads SDK
        window.UnityAds.initialize(
          this.config.gameId,
          this.config.testMode,
          this.onInitializationComplete.bind(this)
        );
        console.log('Unity Ads initialization started');
      } else {
        console.log('Unity Ads SDK failed to load or is blocked by an ad blocker');
        this.isAdBlockerDetected = true;
        this.initializationInProgress = false;
      }
    } catch (error) {
      console.log('Failed to initialize Unity Ads, continuing without ads');
      this.isAdBlockerDetected = true;
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
      console.log('Unity Ads initialization failed, continuing without ads');
      this.isAdBlockerDetected = true;
    }
  }

  private async loadUnityAdsSDK(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window.UnityAds !== 'undefined') {
        resolve();
        return;
      }

      // Set a timeout to catch if script loading takes too long
      const timeout = setTimeout(() => {
        console.log('Unity Ads SDK loading timed out');
        this.isAdBlockerDetected = true;
        resolve(); // Resolve anyway to continue app flow
      }, 5000);

      const script = document.createElement('script');
      // Use the CDN URL from Unity documentation
      script.src = "https://static.unityads.unity3d.com/sdk/3.8.0/UnityAds.js";
      script.async = true;
      script.onload = () => {
        clearTimeout(timeout);
        console.log('Unity Ads SDK loaded successfully');
        resolve();
      };
      script.onerror = () => {
        clearTimeout(timeout);
        console.log('Unity Ads SDK failed to load - likely blocked by an ad blocker');
        this.isAdBlockerDetected = true;
        resolve(); // Resolve anyway to continue app flow
      };
      document.head.appendChild(script);
    });
  }

  public showInterstitial(onComplete?: () => void): void {
    if (!this.isInitialized || typeof window.UnityAds === 'undefined' || this.isAdBlockerDetected) {
      console.log('Unity Ads not available, skipping interstitial ad');
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
        console.log('Interstitial ad not ready');
        if (onComplete) onComplete();
      }
    } catch (error) {
      console.log('Error showing interstitial ad, continuing without showing ad');
      if (onComplete) onComplete();
    }
  }

  public showRewardedAd(onRewarded?: () => void, onSkipped?: () => void): void {
    if (!this.isInitialized || typeof window.UnityAds === 'undefined' || this.isAdBlockerDetected) {
      console.log('Unity Ads not available, skipping rewarded ad');
      if (onRewarded) onRewarded(); // Still give reward if ads aren't available
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
        console.log('Rewarded ad not ready, giving reward anyway');
        if (onRewarded) onRewarded(); // Still give reward if ad isn't ready
      }
    } catch (error) {
      console.log('Error showing rewarded ad, giving reward anyway');
      if (onRewarded) onRewarded(); // Still give reward on error
    }
  }

  public loadBanner(): void {
    if (!this.isInitialized || typeof window.UnityAds === 'undefined' || this.isAdBlockerDetected) {
      console.log('Unity Ads not available, skipping banner ad');
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
        console.log('Unity Ads Banner module not available');
      }
    } catch (error) {
      console.log('Failed to load banner ad, continuing without banner');
    }
  }
  
  public destroyBanner(): void {
    if (this.isAdBlockerDetected) return;
    
    if (typeof window.UnityAds !== 'undefined' && window.UnityAds.Banner) {
      try {
        window.UnityAds.Banner.destroy();
      } catch (error) {
        console.log('Error destroying banner, continuing');
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
