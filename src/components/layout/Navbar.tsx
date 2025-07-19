'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Suppliers', href: '/suppliers' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Supplier Portal</span>
            <div className="flex items-center">
              <div className="h-8 w-8 relative">
                <div className="absolute inset-0 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
                  SP
                </div>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Supplier Portal</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
          <LanguageSwitcher />
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Admin Portal
          </Link>
        </div>
      </nav>
      <div className={clsx('lg:hidden', mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden')}>
        <div className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Supplier Portal</span>
              <div className="flex items-center">
                <div className="h-8 w-8 relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
                    SP
                  </div>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">Supplier Portal</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
                <Link
                  href="/admin"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
