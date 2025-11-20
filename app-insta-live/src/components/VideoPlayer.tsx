import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Eye, X, MousePointerClick, Gift, TrendingUp, Sparkles } from "lucide-react";
import { videoConfig, channelConfig, ctaButtonConfig, heartsConfig } from "@/config/livestream-config";
import { HeartAnimation } from "./HeartAnimation";

// Helper function to extract YouTube video ID from URL or return ID directly
const extractYouTubeId = (input: string): string => {
  if (!input) return "";

  // If it's already just an ID (11 characters, no special chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  // Try to extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,  // Standard & short URLs
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,                   // YouTube Shorts
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,                    // Embed URLs
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,                        // Old embed format
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If no pattern matches, return the input as-is (might be an ID)
  return input;
};

// Helper function to get CTA button styles
const getCtaButtonStyles = () => {
  const config = ctaButtonConfig;

  // Determine background color
  let bgColor = "bg-white/95";
  let textColor = "text-black";
  let hoverBg = "hover:bg-white";

  if (config.color.red) {
    bgColor = "bg-red-600";
    textColor = "text-white";
    hoverBg = "hover:bg-red-700";
  } else if (config.color.blue) {
    bgColor = "bg-blue-600";
    textColor = "text-white";
    hoverBg = "hover:bg-blue-700";
  } else if (config.color.gray) {
    bgColor = "bg-gray-600";
    textColor = "text-white";
    hoverBg = "hover:bg-gray-700";
  } else if (config.color.black) {
    bgColor = "bg-black";
    textColor = "text-white";
    hoverBg = "hover:bg-gray-900";
  } else if (config.color.white) {
    bgColor = "bg-white/95";
    textColor = "text-black";
    hoverBg = "hover:bg-white";
  }

  // Determine effects
  const effects: string[] = [];
  if (config.effects.pulse) effects.push("cta-pulse");
  if (config.effects.glow) effects.push("cta-glow");
  if (config.effects.shake) effects.push("cta-shake");
  if (config.effects.bounce) effects.push("cta-bounce");
  if (config.effects.float) effects.push("cta-float");

  return {
    bgColor,
    textColor,
    hoverBg,
    effects: effects.join(" "),
  };
};

// Helper function to get CTA button icon
const getCtaButtonIcon = () => {
  const config = ctaButtonConfig;

  if (config.icon.gift) return Gift;
  if (config.icon.trending) return TrendingUp;
  if (config.icon.sparkles) return Sparkles;

  // Default to click icon
  return MousePointerClick;
};

export const VideoPlayer = () => {
  const extractedVideoId = extractYouTubeId(videoConfig.videoId);
  const [currentViewers, setCurrentViewers] = useState(videoConfig.viewers.initialCount);
  const [hasDropped, setHasDropped] = useState(false);
  const [showCtaButton, setShowCtaButton] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const isInitializing = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentViewers(prev => {
        // If drop is disabled, keep viewers constant with small random fluctuations
        if (!videoConfig.viewers.enableViewerDrop) {
          const change = Math.random() > 0.5 ? 1 : -1;
          const newValue = prev + change;
          return Math.max(1, newValue);
        }

        // If already dropped, keep in configured afterDrop range
        if (hasDropped) {
          const change = Math.random() > 0.5 ?
            Math.floor(Math.random() * 5) + 1 :
            -(Math.floor(Math.random() * 5) + 1);
          const newValue = prev + change;
          return Math.max(
            videoConfig.viewers.afterDrop.min,
            Math.min(videoConfig.viewers.afterDrop.max, newValue)
          );
        }

        // Before the drop, keep in configured beforeDrop range
        const change = Math.random() > 0.5 ?
          Math.floor(Math.random() * 15) + 1 :
          -(Math.floor(Math.random() * 12) + 1);

        const newValue = prev + change;
        return Math.max(
          videoConfig.viewers.beforeDrop.min,
          Math.min(videoConfig.viewers.beforeDrop.max, newValue)
        );
      });
    }, videoConfig.viewers.updateInterval);

    return () => clearInterval(interval);
  }, [hasDropped]);

  // CTA Button delay
  useEffect(() => {
    if (ctaButtonConfig.enabled) {
      const timeout = setTimeout(() => {
        setShowCtaButton(true);
      }, ctaButtonConfig.delayInSeconds * 1000);

      return () => clearTimeout(timeout);
    }
  }, []);


  useEffect(() => {
    const container = playerContainerRef.current;
    if (!container) return;

    // Prevent duplicate initialization
    if (isInitializing.current) return;
    isInitializing.current = true;

    // Clear previous container
    container.innerHTML = '';

    const w = window as any;
    let checkInterval: any = null;
    let dropFallbackTimeout: any = null;

    const triggerDrop = () => {
      // Check if viewer drop is enabled
      if (!videoConfig.viewers.enableViewerDrop) return;

      if (w.__VIEWER_DROP_DONE) return;
      w.__VIEWER_DROP_DONE = true;
      setHasDropped(true);
      const range = videoConfig.viewers.afterDrop.max - videoConfig.viewers.afterDrop.min;
      setCurrentViewers(Math.floor(Math.random() * (range + 1)) + videoConfig.viewers.afterDrop.min);
    };

    // YOUTUBE PLAYER
    if (videoConfig.videoType === "youtube") {
      const scriptId = 'youtube-iframe-api';
      
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }

      let player: any = null;

      const onPlayerReady = () => {
        checkInterval = setInterval(() => {
          if (player && player.getCurrentTime) {
            const currentTime = player.getCurrentTime();
            
            if (currentTime >= videoConfig.viewers.dropTimeInSeconds && !w.__VIEWER_DROP_DONE) {
              triggerDrop();
            }
          }
        }, 1000);
      };

      const initPlayer = () => {
        if (!w.YT || !w.YT.Player) {
          return;
        }

        const playerDiv = document.createElement('div');
        playerDiv.id = 'youtube-player';
        container.appendChild(playerDiv);

        player = new w.YT.Player('youtube-player', {
          videoId: extractedVideoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
      };

      if (w.YT && w.YT.Player) {
        initPlayer();
      } else {
        w.onYouTubeIframeAPIReady = () => {
          initPlayer();
        };
      }

      // Fallback timeout if video player doesn't provide getCurrentTime
      dropFallbackTimeout = setTimeout(() => {
        triggerDrop();
      }, videoConfig.viewers.dropTimeInSeconds * 1000);

      return () => {
        isInitializing.current = false;
        if (checkInterval) clearInterval(checkInterval);
        if (dropFallbackTimeout) clearTimeout(dropFallbackTimeout);
        if (player && player.destroy) {
          player.destroy();
        }
      };
    }

    // PANDA VIDEO PLAYER
    if (videoConfig.videoType === "panda" && videoConfig.pandaEmbedCode) {
      // Create a temporary wrapper div to process the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = videoConfig.pandaEmbedCode;

      // Separate scripts from HTML
      const htmlElements = Array.from(tempDiv.children).filter(el => el.tagName !== 'SCRIPT');
      const scriptElements = tempDiv.querySelectorAll('script');

      // Add HTML elements first
      htmlElements.forEach(el => container.appendChild(el));

      // Execute scripts after (to ensure DOM is ready)
      scriptElements.forEach((oldScript) => {
        const newScript = document.createElement('script');

        // Copy attributes (src, async, defer, etc)
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Copy inline content
        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }

        // Add to container to execute
        container.appendChild(newScript);
      });

      // Fallback timeout for Panda Video
      dropFallbackTimeout = setTimeout(() => {
        triggerDrop();
      }, videoConfig.viewers.dropTimeInSeconds * 1000);

      return () => {
        isInitializing.current = false;
        if (dropFallbackTimeout) clearTimeout(dropFallbackTimeout);

        // Clean up container completely
        container.innerHTML = '';
      };
    }

    // DIRECT VIDEO LINK PLAYER
    if (videoConfig.videoType === "direct" && videoConfig.directVideoUrl) {
      const videoElement = document.createElement('video');
      videoElement.src = videoConfig.directVideoUrl;
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.style.width = '100%';
      videoElement.style.height = '100%';
      videoElement.style.objectFit = 'contain';
      videoElement.style.backgroundColor = '#000';
      
      container.appendChild(videoElement);

      checkInterval = setInterval(() => {
        const currentTime = videoElement.currentTime;
        
        if (currentTime >= videoConfig.viewers.dropTimeInSeconds && !w.__VIEWER_DROP_DONE) {
          triggerDrop();
        }
      }, 1000);

      // Fallback timeout for Direct Video
      dropFallbackTimeout = setTimeout(() => {
        triggerDrop();
      }, videoConfig.viewers.dropTimeInSeconds * 1000);

      return () => {
        isInitializing.current = false;
        if (checkInterval) clearInterval(checkInterval);
        if (dropFallbackTimeout) clearTimeout(dropFallbackTimeout);
      };
    }

    // VIMEO PLAYER
    if (videoConfig.videoType === "vimeo" && videoConfig.vimeoEmbedCode) {
      // Create a temporary wrapper div to process the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = videoConfig.vimeoEmbedCode;

      // Find the wrapper div and iframe
      const wrapperDiv = tempDiv.querySelector('div');
      const iframe = tempDiv.querySelector('iframe');
      const scriptElements = tempDiv.querySelectorAll('script');

      if (wrapperDiv && iframe) {
        // Override the wrapper styles to fit our container
        wrapperDiv.style.position = 'relative';
        wrapperDiv.style.width = '100%';
        wrapperDiv.style.height = '100%';
        wrapperDiv.style.padding = '0';

        // Make sure iframe fills the container
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        // Add to container
        container.appendChild(wrapperDiv);
      } else if (iframe) {
        // If there's only an iframe, add it directly with proper sizing
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.border = 'none';
        container.appendChild(iframe);
      }

      // Execute scripts after (to ensure DOM is ready)
      scriptElements.forEach((oldScript) => {
        const newScript = document.createElement('script');

        // Copy attributes (src, async, defer, etc)
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Copy inline content
        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }

        // Add to document head to execute
        document.head.appendChild(newScript);
      });

      // Fallback timeout for Vimeo
      dropFallbackTimeout = setTimeout(() => {
        triggerDrop();
      }, videoConfig.viewers.dropTimeInSeconds * 1000);

      return () => {
        isInitializing.current = false;
        if (dropFallbackTimeout) clearTimeout(dropFallbackTimeout);

        // Clean up container completely
        container.innerHTML = '';
      };
    }

    // VTURB PLAYER
    if (videoConfig.videoType === "vturb" && videoConfig.vturbScript) {
      container.innerHTML = videoConfig.vturbScript;

      const scripts = container.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });

      // Fallback timeout for Vturb
      dropFallbackTimeout = setTimeout(() => {
        triggerDrop();
      }, videoConfig.viewers.dropTimeInSeconds * 1000);

      return () => {
        isInitializing.current = false;
        if (dropFallbackTimeout) clearTimeout(dropFallbackTimeout);
      };
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <div ref={playerContainerRef} className="w-full h-full" />
      </div>

      {/* Instagram Live Header - Refined Design */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black to-black/40 pb-3 pt-3 px-4 safe-area-top">
        <div className="flex items-center justify-between gap-3">
          {/* Left side - Avatar + Username */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Avatar with Instagram gradient ring */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full blur-sm opacity-60"></div>
              <div className="relative w-10 h-10 rounded-full border-2 border-white/70 overflow-hidden bg-black">
                {channelConfig.profileImageUrl ? (
                  <img
                    src={channelConfig.profileImageUrl}
                    alt={channelConfig.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{channelConfig.initials}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Username with verification badge and dropdown */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-white font-bold text-sm truncate">
                {channelConfig.name}
              </span>
              {/* Verification Badge - Wings */}
              <img src="/wings.png" alt="verified" className="flex-shrink-0 w-5 h-5 object-contain" />
            </div>
          </div>

          {/* Right side - LIVE + Viewers + Close */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* LIVE Badge - Instagram Red */}
            <div className="bg-red-500 text-white font-bold text-[11px] px-2.5 py-1.5 rounded shadow-lg animate-pulse hover:bg-red-600 transition-colors">
              LIVE
            </div>

            {/* Viewer count - Refined */}
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-md border border-white/15">
              <Eye className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white text-xs font-semibold">{currentViewers.toLocaleString('en-US')}</span>
            </div>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-8 w-8 flex-shrink-0 rounded transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>


      {/* Instagram-style interactive elements are now in the LiveChat component */}

      {/* CTA Button - Centered */}
      {showCtaButton && ctaButtonConfig.enabled && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <a
            href={ctaButtonConfig.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`pointer-events-auto ${getCtaButtonStyles().bgColor} ${getCtaButtonStyles().textColor} ${getCtaButtonStyles().hoverBg} ${getCtaButtonStyles().effects} px-6 py-3 rounded-full font-bold text-lg shadow-2xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95`}
          >
            {(() => {
              const IconComponent = getCtaButtonIcon();
              return <IconComponent className="w-6 h-6" />;
            })()}
            <span>{ctaButtonConfig.text}</span>
          </a>
        </div>
      )}

      {/* Heart Animation */}
      {heartsConfig.enabled && <HeartAnimation />}

    </div>
  );
};
