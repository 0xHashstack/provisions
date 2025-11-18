import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAccount, useDisconnect } from 'wagmi'
import HashstackLogo from '@/assets/hashstacklogo'
import DiscordLogo from '@/assets/discordLogo'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  showConnectButton?: boolean;
  connectWalletOnClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showConnectButton = true, connectWalletOnClick }) => {
  const router = useRouter()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAddressFetched, setIsAddressFetched] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (address) setIsAddressFetched(true)
  }, [address])

  const isActive = (path: string) => router.pathname === path

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => router.push('/provisions')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <HashstackLogo />
            </button>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex items-center gap-6">
                <button
                  onClick={() => router.push('/provisions')}
                  className={`text-sm font-medium transition-colors ${
                    isActive('/provisions')
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Provisions
                </button>
                <button
                  onClick={() => router.push('/tokenomics')}
                  className={`text-sm font-medium transition-colors ${
                    isActive('/tokenomics')
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Tokenomics
                </button>
                <Link
                  href="https://app.hashstack.finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  Go to App
                </Link>
              </div>
            )}
          </div>

          {/* Right side - Discord + Mobile menu toggle */}
          <div className="flex items-center gap-4">
            {!isMobile && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Need help?</span>
                <Link
                  href="https://discord.com/invite/VaThqq8vbS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <DiscordLogo />
                  <span className="text-sm font-medium">Discord</span>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <button
                onClick={() => {
                  router.push('/provisions')
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isActive('/provisions')
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Provisions
              </button>
              <button
                onClick={() => {
                  router.push('/tokenomics')
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  isActive('/tokenomics')
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Tokenomics
              </button>
              <Link
                href="https://app.hashstack.finance"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Go to App
              </Link>
              <Link
                href="https://discord.com/invite/VaThqq8vbS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <DiscordLogo />
                Discord
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
