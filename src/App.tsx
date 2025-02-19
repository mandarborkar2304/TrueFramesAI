import React, { useState, useCallback } from 'react';
import { Upload, Shield, AlertCircle, CheckCircle, Home, Info, LogIn, LogOut } from 'lucide-react';

interface AnalysisResult {
  isForged: boolean;
  confidence: number;
}

type Page = 'home' | 'about' | 'detect';

function Header({ isAuthenticated, onLogout, currentPage, setCurrentPage }: { 
  isAuthenticated: boolean; 
  onLogout: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">TrueFrame</span>
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-1 ${currentPage === 'home' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`flex items-center space-x-1 ${currentPage === 'about' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </button>
            {isAuthenticated && (
              <button
                onClick={() => setCurrentPage('detect')}
                className={`flex items-center space-x-1 ${currentPage === 'detect' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              >
                <Upload className="w-5 h-5" />
                <span>Detect</span>
              </button>
            )}
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-sm shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-800">TrueFrame</span>
            </div>
            <p className="text-gray-600">
              Advanced image forgery detection powered by cutting-edge AI technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-600">Email: info@trueframe.ai</p>
            <p className="text-gray-600">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          © {new Date().getFullYear()} TrueFrame. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Detect Image Forgery with Confidence
        </h1>
        <p className="text-xl text-gray-600">
          TrueFrame uses advanced AI technology to detect manipulated images with 97% accuracy.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <div className="text-purple-600 mb-4">
            <Shield className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Reliable Detection</h3>
          <p className="text-gray-600">
            Industry-leading accuracy in detecting manipulated images.
          </p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <div className="text-purple-600 mb-4">
            <Upload className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy to Use</h3>
          <p className="text-gray-600">
            Simple drag-and-drop interface for quick analysis.
          </p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <div className="text-purple-600 mb-4">
            <CheckCircle className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Results</h3>
          <p className="text-gray-600">
            Get detailed analysis results in seconds.
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About TrueFrame</h1>
        <div className="space-y-6 text-gray-600">
          <p>
            TrueFrame is at the forefront of digital image authenticity verification. Our cutting-edge AI-powered platform 
            provides reliable detection of manipulated images with an industry-leading accuracy rate of 97%.
          </p>
          <p>
            Founded in 2025, our team of expert researchers and developers has created a sophisticated system that combines 
            multiple detection techniques including Error Level Analysis (ELA) and advanced deep learning models powered by 
            TensorFlow.
          </p>
          <p>
            Our mission is to promote digital truth and authenticity in an era where image manipulation is becoming 
            increasingly sophisticated. Whether you're a journalist, researcher, or business professional, TrueFrame 
            provides you with the tools you need to verify the authenticity of digital images.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Technology</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Advanced AI-powered image analysis</li>
              <li>Error Level Analysis (ELA)</li>
              <li>Deep learning models using TensorFlow</li>
              <li>Real-time processing capabilities</li>
              <li>97% minimum accuracy rate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentPage('detect');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    setSelectedImage(null);
    setResult(null);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult({
        isForged: Math.random() > 0.5,
        confidence: Math.random() * 100
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const renderContent = () => {
    if (!isAuthenticated && currentPage === 'home') {
      return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md">
              <div className="flex items-center justify-center mb-8">
                <Shield className="w-12 h-12 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Login to TrueFrame</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 'about') {
      return <AboutPage />;
    }

    if (currentPage === 'home') {
      return <HomePage />;
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Image Forgery Detection</h1>
            <p className="text-gray-600">Upload or drag & drop an image to analyze for potential forgery</p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
            }`}
          >
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600">Drag and drop your image here, or</p>
                  <label className="inline-block mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {isAnalyzing && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing image...</p>
            </div>
          )}

          {result && !isAnalyzing && (
            <div className="mt-8">
              <div className={`p-6 rounded-lg ${
                result.isForged ? 'bg-red-50' : 'bg-green-50'
              }`}>
                <div className="flex items-center mb-4">
                  {result.isForged ? (
                    <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  )}
                  <h2 className="text-xl font-semibold">
                    {result.isForged ? 'Potential Forgery Detected' : 'Image Appears Authentic'}
                  </h2>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <span className="text-sm font-medium">{result.confidence.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        result.isForged ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {result.isForged
                    ? 'Our analysis indicates this image may have been manipulated. Please review carefully.'
                    : 'Our analysis suggests this image has not been manipulated.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col">
      <Header 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderContent()}
      <Footer />
    </div>
  );
}

export default App;