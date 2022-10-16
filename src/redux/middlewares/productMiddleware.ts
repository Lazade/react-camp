export const productMiddleware = storeAPI => next => action => {
  const { type, payload } = action;
  if (type === "Product/getProduct/rejected") {
    console.log(payload);
    window.location.href="/404";
    return
  }
  if (type === "Product/getProduct/fulfilled") {
    if (payload === undefined) {
      window.location.href="/404"
      return
    }
  }
  return next(action);
}