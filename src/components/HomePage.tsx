import React from 'react';
import { Shield, Image, Lock } from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Shield className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to TrueFrame
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Advanced AI-powered image forgery detection
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Image className="h-8 w-8" />}
            title="Advanced Detection"
            description="State-of-the-art AI algorithms to detect image manipulation"
          />
          <FeatureCard
            icon={<Lock className="h-8 w-8" />}
            title="Secure Analysis"
            description="Your images are processed securely and never stored"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Trusted Results"
            description="Get detailed analysis reports with confidence scores"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}