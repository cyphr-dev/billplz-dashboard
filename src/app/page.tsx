import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <div className="container px-4 py-16 mx-auto sm:py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo/billplz-logo.svg"
                alt="BillPlz Logo"
                width={200}
                height={60}
                priority
                className="w-auto h-16"
              />
            </div>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto mb-12 text-xl text-gray-600 sm:text-2xl dark:text-gray-300">
              Comprehensive payment analytics and insights for your BillPlz
              transactions. Monitor collections, track payments, and analyze
              your business performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 mb-16 sm:flex-row">
              <Link
                href="/app"
                className="px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 rounded-lg shadow-lg bg-primary hover:bg-primary/90 hover:shadow-xl"
              >
                Open Dashboard
              </Link>
              <Link
                href="/app/billing"
                className="px-8 py-3 text-lg font-semibold transition-colors duration-200 border-2 rounded-lg border-primary text-primary hover:bg-primary hover:text-white"
              >
                View Analytics
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 mb-20 md:grid-cols-3">
            <div className="p-6 transition-shadow duration-200 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Image
                  src="/file.svg"
                  alt="Collections"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Collection Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track and manage all your payment collections in one centralized
                dashboard.
              </p>
            </div>

            <div className="p-6 transition-shadow duration-200 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-lg dark:bg-green-900">
                <Image
                  src="/window.svg"
                  alt="Analytics"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Advanced Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get detailed insights with charts, trends, and performance
                metrics.
              </p>
            </div>

            <div className="p-6 transition-shadow duration-200 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-lg dark:bg-purple-900">
                <Image
                  src="/globe.svg"
                  alt="Real-time"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Real-time Updates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your payments and transactions with live data
                synchronization.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section - Sticky Footer */}
      <div className="mt-auto bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="container px-4 py-12 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Developed by
            </h2>
            <div className="p-6 shadow-inner bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                &apos;Arif Akmal Bin Kamarudin
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Full Stack Developer & Analytics Specialist
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://github.com/cyphr-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 transition-colors duration-200 dark:text-gray-300 hover:text-primary"
                >
                  <Github />
                  Visit Website
                </a>
                <span className="hidden text-gray-400 sm:block">•</span>
                <a
                  href="https://cyphr.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 transition-colors duration-200 dark:text-gray-300 hover:text-primary"
                >
                  <Image
                    src="/globe.svg"
                    alt="Website"
                    width={16}
                    height={16}
                    className="dark:invert"
                  />
                  cyphr.my
                </a>
                <span className="hidden text-gray-400 sm:block">•</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Built with Next.js & TypeScript
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
