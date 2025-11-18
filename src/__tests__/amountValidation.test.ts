/**
 * Amount Validation Tests
 * Tests for validating and processing financial amounts
 */

/**
 * Validate a numeric amount
 * @param amount - Amount to validate
 * @param minAmount - Minimum allowed amount (default: 0)
 * @param maxAmount - Maximum allowed amount (default: Infinity)
 * @returns object with isValid flag and error message
 */
function validateAmount(
  amount: any,
  minAmount: number = 0,
  maxAmount: number = Infinity
): { isValid: boolean; error?: string } {
  // Check if amount is defined and not null
  if (amount === null || amount === undefined) {
    return { isValid: false, error: 'Amount cannot be null or undefined' }
  }

  // Convert to number if string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  // Check if it's a valid number
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Amount must be a valid number' }
  }

  // Check for negative values
  if (numAmount < 0) {
    return { isValid: false, error: 'Amount cannot be negative' }
  }

  // Check minimum
  if (numAmount < minAmount) {
    return { isValid: false, error: `Amount must be at least ${minAmount}` }
  }

  // Check maximum
  if (numAmount > maxAmount) {
    return { isValid: false, error: `Amount cannot exceed ${maxAmount}` }
  }

  // Check for excessive decimal places (only check if string representation)
  if (typeof amount === 'string') {
    const decimalPlaces = (amount.split('.')[1] || '').length
    if (decimalPlaces > 18) {
      return { isValid: false, error: 'Amount has too many decimal places (max 18)' }
    }
  }

  return { isValid: true }
}

/**
 * Convert amount with decimal handling
 * @param amount - Amount to convert
 * @param sourceDecimals - Decimals in source
 * @param targetDecimals - Decimals in target
 * @returns converted amount as string
 */
function convertAmountDecimals(
  amount: string | number,
  sourceDecimals: number,
  targetDecimals: number
): string {
  if (amount === null || amount === undefined) {
    throw new Error('Invalid amount: null or undefined')
  }

  try {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount

    if (isNaN(numAmount)) {
      throw new Error('Invalid amount')
    }

    const factor = Math.pow(10, targetDecimals - sourceDecimals)
    const result = numAmount * factor

    return result.toString()
  } catch (error) {
    throw new Error(`Conversion error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Check if two amounts are equal with floating point tolerance
 * @param amount1 - First amount
 * @param amount2 - Second amount
 * @param tolerance - Tolerance level (default: 0.000001)
 * @returns true if amounts are equal within tolerance
 */
function amountsEqual(amount1: number, amount2: number, tolerance: number = 0.000001): boolean {
  return Math.abs(amount1 - amount2) < tolerance
}

describe('Amount Validation', () => {
  describe('validateAmount', () => {
    it('should accept valid positive amounts', () => {
      const result = validateAmount(100)
      expect(result.isValid).toBe(true)
    })

    it('should accept zero amount', () => {
      const result = validateAmount(0)
      expect(result.isValid).toBe(true)
    })

    it('should accept string amounts that convert to numbers', () => {
      const result = validateAmount('123.45')
      expect(result.isValid).toBe(true)
    })

    it('should reject null amounts', () => {
      const result = validateAmount(null)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('null')
    })

    it('should reject undefined amounts', () => {
      const result = validateAmount(undefined)
      expect(result.isValid).toBe(false)
    })

    it('should reject NaN amounts', () => {
      const result = validateAmount(NaN)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('valid number')
    })

    it('should reject negative amounts', () => {
      const result = validateAmount(-100)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('negative')
    })

    it('should reject amounts below minimum', () => {
      const result = validateAmount(50, 100)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('at least 100')
    })

    it('should reject amounts above maximum', () => {
      const result = validateAmount(1000, 0, 500)
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('exceed')
    })

    it('should reject amounts with too many decimal places', () => {
      const result = validateAmount('1.123456789012345678901')
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('decimal places')
    })

    it('should validate with minimum and maximum constraints', () => {
      const result = validateAmount(250, 100, 500)
      expect(result.isValid).toBe(true)
    })

    it('should handle very large numbers', () => {
      const result = validateAmount(1e20)
      expect(result.isValid).toBe(true)
    })

    it('should handle very small numbers', () => {
      const result = validateAmount(0.000001)
      expect(result.isValid).toBe(true)
    })
  })

  describe('convertAmountDecimals', () => {
    it('should convert from 18 decimals to 6 decimals', () => {
      const result = convertAmountDecimals('1000000000000000000', 18, 6)
      expect(result).toBe('1000000')
    })

    it('should convert from 6 decimals to 18 decimals', () => {
      const result = convertAmountDecimals('1000000', 6, 18)
      expect(result).toBe('1000000000000000000')
    })

    it('should handle zero conversion', () => {
      const result = convertAmountDecimals('0', 18, 6)
      expect(result).toBe('0')
    })

    it('should handle fractional conversions', () => {
      const result = convertAmountDecimals(1.5, 18, 6)
      // Going from 18 decimals to 6 decimals = divide by 10^12
      expect(parseFloat(result)).toBeCloseTo(1.5 * Math.pow(10, 6 - 18))
    })

    it('should throw on invalid amount', () => {
      expect(() => {
        convertAmountDecimals('invalid', 18, 6)
      }).toThrow()
    })

    it('should throw on null amount', () => {
      expect(() => {
        convertAmountDecimals(null as any, 18, 6)
      }).toThrow()
    })
  })

  describe('amountsEqual', () => {
    it('should return true for identical amounts', () => {
      expect(amountsEqual(100, 100)).toBe(true)
    })

    it('should return true for amounts within tolerance', () => {
      expect(amountsEqual(100, 100.0000001)).toBe(true)
    })

    it('should return false for amounts outside tolerance', () => {
      expect(amountsEqual(100, 100.1)).toBe(false)
    })

    it('should return true for zero amounts', () => {
      expect(amountsEqual(0, 0)).toBe(true)
    })

    it('should work with custom tolerance', () => {
      expect(amountsEqual(100, 100.5, 1)).toBe(true)
      expect(amountsEqual(100, 100.5, 0.1)).toBe(false)
    })

    it('should handle negative amounts', () => {
      expect(amountsEqual(-100, -100)).toBe(true)
      expect(amountsEqual(-100, -100.0000001)).toBe(true)
    })
  })

  describe('Financial Amount Edge Cases', () => {
    it('should handle token amounts with 18 decimals', () => {
      const result = validateAmount('1.234567890123456789')
      expect(result.isValid).toBe(true)
    })

    it('should reject amounts with 19+ decimal places', () => {
      const result = validateAmount('1.1234567890123456789')
      expect(result.isValid).toBe(false)
    })

    it('should accept minimum token amount (1 wei)', () => {
      const result = validateAmount(0.000000000000000001)
      expect(result.isValid).toBe(true)
    })

    it('should handle decimal string conversions', () => {
      const result = convertAmountDecimals('0.5', 0, 18)
      expect(parseFloat(result)).toBeCloseTo(0.5 * 1e18, 0)
    })
  })

  describe('Amount Processing in Practical Scenarios', () => {
    it('should validate booking amount >= 250', () => {
      expect(validateAmount(250, 250, Infinity).isValid).toBe(true)
      expect(validateAmount(249.99, 250, Infinity).isValid).toBe(false)
    })

    it('should validate balance sufficient for operation', () => {
      const balance = 1000
      const requiredAmount = 500
      expect(validateAmount(requiredAmount, 0, balance).isValid).toBe(true)
      expect(validateAmount(1000.01, 0, balance).isValid).toBe(false)
    })

    it('should validate claim amount is non-zero', () => {
      expect(validateAmount(0, 0.000001, Infinity).isValid).toBe(false)
      expect(validateAmount(0.000001, 0.000001, Infinity).isValid).toBe(true)
    })
  })
})
