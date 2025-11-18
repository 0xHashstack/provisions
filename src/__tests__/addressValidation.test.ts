/**
 * Address Validation Tests
 * Tests for validating Ethereum and StarkNet addresses
 */

/**
 * Ethereum address validation
 * @param address - Address to validate
 * @returns true if valid Ethereum address format
 */
function isValidEthereumAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  // Remove 0x prefix if present
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address
  // Must be 40 hex characters
  return /^[0-9a-fA-F]{40}$/.test(cleanAddress)
}

/**
 * StarkNet address validation
 * @param address - Address to validate
 * @returns true if valid StarkNet address format
 */
function isValidStarkNetAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  // Remove 0x prefix if present
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address
  // StarkNet addresses are 63-64 hex characters (or up to 251 bits)
  return /^[0-9a-fA-F]{1,64}$/.test(cleanAddress) && cleanAddress.length >= 63
}

/**
 * Validate address length (permissive check)
 * @param address - Address to check
 * @returns true if address length is within acceptable bounds
 */
function isValidAddressLength(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  return (address.length >= 40 && address.length <= 42) || (address.length >= 64 && address.length <= 68)
}

describe('Address Validation', () => {
  describe('Ethereum Address Validation', () => {
    it('should validate correct Ethereum address with 0x prefix', () => {
      const validAddress = '0x1234567890123456789012345678901234567890'
      expect(isValidEthereumAddress(validAddress)).toBe(true)
    })

    it('should validate correct Ethereum address without 0x prefix', () => {
      const validAddress = '1234567890123456789012345678901234567890'
      expect(isValidEthereumAddress(validAddress)).toBe(true)
    })

    it('should reject invalid Ethereum address - too short', () => {
      const invalidAddress = '0x123456789'
      expect(isValidEthereumAddress(invalidAddress)).toBe(false)
    })

    it('should reject invalid Ethereum address - too long', () => {
      const invalidAddress = '0x12345678901234567890123456789012345678901'
      expect(isValidEthereumAddress(invalidAddress)).toBe(false)
    })

    it('should reject invalid Ethereum address - non-hex characters', () => {
      const invalidAddress = '0xGGGG567890123456789012345678901234567890'
      expect(isValidEthereumAddress(invalidAddress)).toBe(false)
    })

    it('should reject null/undefined addresses', () => {
      expect(isValidEthereumAddress(null as any)).toBe(false)
      expect(isValidEthereumAddress(undefined as any)).toBe(false)
      expect(isValidEthereumAddress('')).toBe(false)
    })

    it('should be case-insensitive', () => {
      const uppercaseAddress = '0x1234567890ABCDEF1234567890ABCDEF12345678'
      const lowercaseAddress = '0x1234567890abcdef1234567890abcdef12345678'
      expect(isValidEthereumAddress(uppercaseAddress)).toBe(true)
      expect(isValidEthereumAddress(lowercaseAddress)).toBe(true)
    })
  })

  describe('StarkNet Address Validation', () => {
    it('should validate correct StarkNet address with 0x prefix', () => {
      const validAddress = '0x' + '1'.repeat(63)
      expect(isValidStarkNetAddress(validAddress)).toBe(true)
    })

    it('should validate correct StarkNet address without 0x prefix', () => {
      const validAddress = '1'.repeat(63)
      expect(isValidStarkNetAddress(validAddress)).toBe(true)
    })

    it('should reject too short StarkNet address', () => {
      const invalidAddress = '0x' + '1'.repeat(40)
      expect(isValidStarkNetAddress(invalidAddress)).toBe(false)
    })

    it('should reject addresses with non-hex characters', () => {
      const invalidAddress = '0xGGGG' + '1'.repeat(59)
      expect(isValidStarkNetAddress(invalidAddress)).toBe(false)
    })
  })

  describe('Address Length Validation', () => {
    it('should accept Ethereum address length (40-42 characters)', () => {
      // Ethereum address: 40 hex chars (+ optional 0x prefix = 42 total)
      expect(isValidAddressLength('0x1234567890123456789012345678901234567890')).toBe(true)
      expect(isValidAddressLength('1234567890123456789012345678901234567890')).toBe(true)
    })

    it('should accept StarkNet address length (64-68 characters)', () => {
      expect(isValidAddressLength('0x' + '1'.repeat(62))).toBe(true)
      expect(isValidAddressLength('1'.repeat(64))).toBe(true)
    })

    it('should reject addresses outside valid ranges', () => {
      expect(isValidAddressLength('0x123')).toBe(false)
      expect(isValidAddressLength('0x' + '1'.repeat(100))).toBe(false)
    })

    it('should handle null/undefined', () => {
      expect(isValidAddressLength(null as any)).toBe(false)
      expect(isValidAddressLength(undefined as any)).toBe(false)
      expect(isValidAddressLength('')).toBe(false)
    })
  })

  describe('Address Input Validation - Security', () => {
    it('should not accept addresses with spaces', () => {
      expect(isValidEthereumAddress('0x1234567890123456789012345678901234567890 ')).toBe(false)
      expect(isValidEthereumAddress(' 0x1234567890123456789012345678901234567890')).toBe(false)
    })

    it('should not accept addresses with special characters', () => {
      expect(isValidEthereumAddress('0x1234567890123456789012345678901234567890\n')).toBe(false)
      expect(isValidEthereumAddress('0x1234567890123456789012345678901234567890;')).toBe(false)
    })

    it('should not accept malicious input', () => {
      expect(isValidEthereumAddress('0x1234567890123456789012345678901234567890" onload="alert(1)')).toBe(false)
      expect(isValidEthereumAddress('javascript:alert(1)')).toBe(false)
    })
  })
})
