import { describe, expect, test } from 'vitest';
import { RepomixConfigValidationError, validateConfig } from '../../src/config/configValidate.js';

describe('configValidate', () => {
  test('should pass for a valid config', () => {
    const validConfig = {
      output: { filePath: 'test.txt', headerText: 'Test Header' },
      ignore: { useDefaultPatterns: true, customPatterns: ['*.log'] },
    };
    expect(() => validateConfig(validConfig)).not.toThrow();
  });

  test('should throw for non-object config', () => {
    expect(() => validateConfig('not an object')).toThrow(RepomixConfigValidationError);
  });

  test('should throw for invalid output.filePath', () => {
    const invalidConfig = { output: { filePath: 123 } };
    expect(() => validateConfig(invalidConfig)).toThrow(RepomixConfigValidationError);
  });

  test('should throw for invalid ignore.useDefaultPatterns', () => {
    const invalidConfig = { ignore: { useDefaultPatterns: 'true' } };
    expect(() => validateConfig(invalidConfig)).toThrow(RepomixConfigValidationError);
  });

  test('should throw for invalid ignore.customPatterns', () => {
    const invalidConfig = { ignore: { customPatterns: 'not an array' } };
    expect(() => validateConfig(invalidConfig)).toThrow(RepomixConfigValidationError);
  });

  test('should pass for a valid config with output style', () => {
    const validConfig = {
      output: { filePath: 'test.txt', style: 'xml' },
      ignore: { useDefaultPatterns: true },
    };
    expect(() => validateConfig(validConfig)).not.toThrow();
  });

  test('should throw for invalid output.style type', () => {
    const invalidConfig = { output: { style: 123 } };
    expect(() => validateConfig(invalidConfig)).toThrow(RepomixConfigValidationError);
    expect(() => validateConfig(invalidConfig)).toThrow('output.style must be a string');
  });

  test('should throw for invalid output.style value', () => {
    const invalidConfig = { output: { style: 'invalid' } };
    expect(() => validateConfig(invalidConfig)).toThrow(RepomixConfigValidationError);
    expect(() => validateConfig(invalidConfig)).toThrow('output.style must be either "plain", "xml" or "markdown"');
  });
});
