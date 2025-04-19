import React from 'react';
import { Shield, Image, Lock, AlertCircle } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">About TrueFrame</h1>
            <p className="text-lg text-gray-600">
              Advanced AI-powered image forgery detection for the digital age
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Technology</h2>
              <p className="text-gray-600">
                TrueFrame uses state-of-the-art deep learning algorithms and image analysis 
                techniques to detect various types of image manipulation, including:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-600">
                  <Image className="h-5 w-5 text-purple-600 mr-2" />
                  Splicing and composition detection
                </li>
                <li className="flex items-center text-gray-600">
                  <Lock className="h-5 w-5 text-purple-600 mr-2" />
                  Copy-move forgery detection
                </li>
                <li className="flex items-center text-gray-600">
                  <AlertCircle className="h-5 w-5 text-purple-600 mr-2" />
                  Image manipulation analysis
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600">
                Our system analyzes images through multiple stages:
              </p>
              <ol className="mt-4 space-y-4">
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3">1</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Preprocessing</h3>
                    <p className="text-gray-600">Image normalization and enhancement</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3">2</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Deep Analysis</h3>
                    <p className="text-gray-600">CNN-based forgery detection</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3">3</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Error Level Analysis</h3>
                    <p className="text-gray-600">JPEG compression analysis</p>
                  </div>
                </li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}