export function fixImageUrl(url) {
    if (!url) return "/default-avatar.png"; // Si viene null o undefined
  
    // Si es una URL IPFS con cloudflare roto
    if (url.includes("cloudflare-ipfs.com")) {
      return url.replace("cloudflare-ipfs.com", "infura-ipfs.io");
    }
  
    return url;
}  