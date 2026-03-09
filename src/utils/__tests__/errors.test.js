import { describe, expect, it } from 'vitest';
import { checkIsPositiveInteger } from '../errors.js';

describe('checkIsPositiveInteger', () => {
  it('throws error for strings', () => {
    expect(() => checkIsPositiveInteger('string', 'Value')).toThrowError(
      'Value (string) is not a positive integer',
    );
  });

  it('throws error for floats', () => {
    expect(() => checkIsPositiveInteger(0.5, 'Value')).toThrowError(
      'Value (0.5) is not a positive integer',
    );
  });
});
