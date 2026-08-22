import { useState, useEffect } from 'react';
// @ts-ignore
import taglineSectionImg from '../images/tagline_section.png';
// @ts-ignore
import overlapGraphicImg from '../images/about_us_and_tagline.webp';

export default function TaglineBanner() {
  const [croppedImg, setCroppedImg] = useState<string>(taglineSectionImg);
  const [transparentOverlap, setTransparentOverlap] = useState<string>(overlapGraphicImg);

  useEffect(() => {
    // Process Overlap Graphic (Erase white/off-white background if any)
    const oImg = new Image();
    oImg.src = overlapGraphicImg;
    oImg.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = oImg.width;
      canvas.height = oImg.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(oImg, 0, 0);
      const imgData = ctx.getImageData(0, 0, oImg.width, oImg.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Erase white / cream background pixels
        if (r > 200 && g > 195 && b > 185) {
          data[i + 3] = 0; // Transparent
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setTransparentOverlap(canvas.toDataURL('image/png'));
    };

    // Process Tagline Banner canvas cropping
    const img = new Image();
    img.src = taglineSectionImg;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;
      const width = img.width;
      const height = img.height;

      let minX = width, minY = height, maxX = 0, maxY = 0;
      let found = false;

      // Find content bounding box
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          const isNotBackground = a > 20 && (r > 35 || g > 25 || b > 20);
          if (isNotBackground) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            found = true;
          }
        }
      }

      if (!found) {
        minX = 0;
        minY = 0;
        maxX = width - 1;
        maxY = height - 1;
      }

      // Fine-tuned top & bottom image cropping
      const contentHeight = maxY - minY + 1;
      const topCut = Math.floor(contentHeight * 0.41);    // 41% top cut
      const bottomCut = Math.floor(contentHeight * 0.18); // 18% bottom cut

      const finalMinY = Math.min(minY + topCut, maxY - 40);
      const finalMaxY = Math.max(maxY - bottomCut, finalMinY + 40);

      const cropWidth = maxX - minX + 1;
      const cropHeight = finalMaxY - finalMinY + 1;

      const cropCanvas = document.createElement('canvas');
      cropCanvas.width = cropWidth;
      cropCanvas.height = cropHeight;
      const cropCtx = cropCanvas.getContext('2d');
      if (cropCtx) {
        cropCtx.drawImage(img, minX, finalMinY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        setCroppedImg(cropCanvas.toDataURL('image/png'));
      }
    };
  }, []);

  return (
    <section className="w-full relative overflow-visible select-none bg-[#1C0D07] z-30">
      {/* Overlapping Image Positioned on Left Side Between About Us and Tagline Banner */}
      <div className="absolute -top-12 sm:-top-16 md:-top-20 lg:-top-24 left-4 sm:left-10 md:left-16 lg:left-24 z-40 w-48 sm:w-64 md:w-80 lg:w-96 pointer-events-none">
        <img
          src={transparentOverlap}
          alt="About Us and Tagline Section Divider Graphic"
          className="w-full h-auto object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)] select-none"
        />
      </div>

      {/* Single-Line Cursive Overlay Headline */}
      <div className="absolute top-[0%] sm:top-[1.5%] md:top-[2.5%] left-1/2 -translate-x-1/2 z-20 text-center w-full px-2 pointer-events-none">
        <h2 className="font-['Great_Vibes'] text-[#EAB308] whitespace-nowrap text-[clamp(28px,7vw,115px)] font-normal tracking-wide drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)]">
          Every piece is a masterpiece
        </h2>
      </div>

      {/* Full Width Banner Image */}
      <img
        src={croppedImg}
        alt="Every piece is a masterpiece - Perfect Chocolate"
        className="w-full h-auto object-cover block select-none min-w-full relative z-10"
      />
    </section>
  );
}
