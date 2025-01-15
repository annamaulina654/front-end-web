import { describe, it } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

describe(' Summation', () => {
  it('should add correctly', () => {
    // Arrange
    const operandA = 1;
    const operandB = 1;

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 2;
    assert.equal(actualValue, expectedValue);
  });

  it('should return 0 if string passed on a parameter', () => {
    // Arrange
    const operandA = '5';
    const operandB = 4;

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 0;
    assert.equal(actualValue, expectedValue);
  });

  it('should return 0 if string passed on b parameter', () => {
     // Arrange
     const operandA = 10;
     const operandB = '8';
 
     // Action
     const actualValue = sum(operandA, operandB);
 
     // Assert
     const expectedValue = 0;
     assert.equal(actualValue, expectedValue);
  });

  it('should return 0 if any parameter is not a number', () => {
    // Arrange
    const operandA = '4';
    const operandB = '5';

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 0;
    assert.equal(actualValue, expectedValue);
  });

  it('should return 0 if a parameter is less than 0', () => {
     // Arrange
     const operandA = -5;
     const operandB = 4;
 
     // Action
     const actualValue = sum(operandA, operandB);
 
     // Assert
     const expectedValue = 0;
     assert.equal(actualValue, expectedValue);
  });

  it('should return 0 if b parameter is less than 0', () => {
    // Arrange
    const operandA = 5;
    const operandB = -4;

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 0;
    assert.equal(actualValue, expectedValue);
  });

  it('should return 0 if both parameters are less than 0', () => {
    // Arrange
    const operandA = -5;
    const operandB = -4;

    // Action
    const actualValue = sum(operandA, operandB);

    // Assert
    const expectedValue = 0;
    assert.equal(actualValue, expectedValue);
  });

});