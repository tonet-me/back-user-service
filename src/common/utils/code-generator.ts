export function emailCodeGenerator() {
  return Math.floor(Math.random() * (99999 - 10000)) + 10000;
}

export function emailForgetCodeGenerator() {
  return Math.floor(Math.random() * (99999 - 10000)) + 10000;
}
