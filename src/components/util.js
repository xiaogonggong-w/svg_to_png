


export function convertSvgToPngImage(svg) {

    return new Promise((resolve, reject) => {
        let img = new window.Image();
        img.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                let url = URL.createObjectURL(blob);
                resolve(url); // Pass the PNG data URL to the callback
            }, 'image/png');
        };
        img.src = svg;
    })

}

export const convertPngToSvg2 = (file) => {
    // console.log("file", file);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

          let svgPaths = "";
          for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
              const pixelIndex = (y * img.width + x) * 4;
              const r = imageData[pixelIndex];
              const g = imageData[pixelIndex + 1];
              const b = imageData[pixelIndex + 2];
              const a = imageData[pixelIndex + 3];

              if (a > 0) {
                // Skip transparent pixels
                svgPaths += `<path fill="rgb(${r},${g},${b})" d="M${x} ${y}h1v1h-1z"/>`;
              }
            }
          }

          const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">${svgPaths}</svg>`;
          resolve(svgString);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };