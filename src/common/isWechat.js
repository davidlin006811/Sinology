const isWechat = () => {
  return /micromessenger/.test(navigator.userAgent.toLowerCase());
};
export default isWechat;
