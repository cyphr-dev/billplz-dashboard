"use client";

import Link from "next/link";
import BPButton from "@/components/BPButton";
import BPEmptyErrorState from "@/components/BPEmptyErrorState";
import BPSection from "@/components/BPSection";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <BPSection className="max-w-2xl mx-auto text-center">
        {/* Large 404 Display */}
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-gray-300 text-8xl">404</h1>
          <div className="w-24 h-1 mx-auto bg-blue-500 rounded-full"></div>
        </div>

        {/* Error State Component */}
        <BPEmptyErrorState
          icon={
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
              <FileQuestion className="w-8 h-8 text-gray-400" />
            </div>
          }
          title="Page Not Found"
          description="The page you're looking for doesn't exist or has been moved to a different location."
        />

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/app">
            <BPButton className="flex items-center gap-2 min-w-[160px]">
              <Home className="w-4 h-4" />
              Go to Dashboard
            </BPButton>
          </Link>

          <BPButton
            variant="outline"
            className="flex items-center gap-2 min-w-[160px]"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </BPButton>
        </div>

        {/* Footer Help */}
        <div className="pt-8 mt-12 border-t">
          <p className="text-xs text-gray-500">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </BPSection>
    </div>
  );
}
