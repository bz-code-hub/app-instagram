import { pixelsConfig } from "./livestream-config";

// ═══════════════════════════════════════════════════════════════
// INJECT PIXELS SCRIPTS
// ═══════════════════════════════════════════════════════════════

export function initAllPixels() {
  // Facebook Pixel
  if (pixelsConfig.facebookPixel) {
    const facebookDiv = document.createElement("div");
    facebookDiv.innerHTML = pixelsConfig.facebookPixel;
    document.head.appendChild(facebookDiv);
    console.log("%cFacebook Pixel carregado", "color: blue; font-weight: bold;");
  }

  // TikTok Pixel
  if (pixelsConfig.tiktokPixel) {
    const tiktokDiv = document.createElement("div");
    tiktokDiv.innerHTML = pixelsConfig.tiktokPixel;
    document.head.appendChild(tiktokDiv);
    console.log("%cTikTok Pixel carregado", "color: #000; font-weight: bold;");
  }

  // Google Analytics Pixel
  if (pixelsConfig.googleAnalyticsPixel) {
    const googleDiv = document.createElement("div");
    googleDiv.innerHTML = pixelsConfig.googleAnalyticsPixel;
    document.head.appendChild(googleDiv);
    console.log("%cGoogle Analytics carregado", "color: red; font-weight: bold;");
  }

  const pixelsCount =
    (pixelsConfig.facebookPixel ? 1 : 0) +
    (pixelsConfig.tiktokPixel ? 1 : 0) +
    (pixelsConfig.googleAnalyticsPixel ? 1 : 0);

  if (pixelsCount > 0) {
    console.log(`%c✓ ${pixelsCount} pixel(s) ativado(s) com sucesso!`, "color: green; font-weight: bold;");
  }
}
