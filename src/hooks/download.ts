const downloadImage = async (imageUrl: string) => {
  if (!imageUrl) return;

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;

    const pathOnly = imageUrl.split(/[?#]/)[0];
    const extension = pathOnly.split(".").pop() || "jpg";
    a.download = `proof-payment.${extension}`;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Failed to download image:", error);

    window.open(imageUrl, "_blank");
  }
};

export default downloadImage;
