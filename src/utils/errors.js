function checkIsPositiveInteger(value, messageScope) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${messageScope} (${value}) is not a positive integer`);
  }
}

export { checkIsPositiveInteger };
