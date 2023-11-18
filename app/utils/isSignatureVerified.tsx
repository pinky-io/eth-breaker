function isSignatureVerified(verifiedAddresses: string[], address?: string) {
  if (!address) {
    return false;
  }
  return verifiedAddresses.includes(address);
}

export default isSignatureVerified;
