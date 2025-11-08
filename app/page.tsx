'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

interface ServerlessInfo {
  platform: string;
  runtime: string;
  region: string;
  functionName: string;
  functionVersion: string;
  memoryLimit: string;
  timestamp: string;
  deployment: string;
  architecture: string;
  verified: boolean;
  handler: string;
  environmentVariables: {
    AWS_EXECUTION_ENV: boolean;
    AWS_REGION: boolean;
    AWS_LAMBDA_FUNCTION_NAME: boolean;
    AWS_LAMBDA_FUNCTION_MEMORY_SIZE: boolean;
    LAMBDA_TASK_ROOT: boolean;
  };
}

function ServerlessVerification() {
  const [serverlessInfo, setServerlessInfo] = useState<ServerlessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/serverless-info')
      .then(res => res.json())
      .then(data => {
        setServerlessInfo(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch serverless info');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-purple-100">Verifying serverless deployment...</p>
      </div>
    );
  }

  if (error || !serverlessInfo) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
        <p className="text-red-200">Unable to verify serverless deployment</p>
      </div>
    );
  }

  const isVerified = serverlessInfo.verified;
  const verificationStatus = isVerified ? '✅ REAL Lambda Detected' : '⚠️ Lambda NOT Detected';

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className={`rounded-full p-3 mr-4 ${isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {isVerified ? (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{verificationStatus}</h3>
          <p className="text-purple-100">
            {isVerified 
              ? 'This website is running on AWS Lambda (Verified)' 
              : 'Running in development or Lambda environment not detected'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-purple-200 text-sm mb-1">Platform</p>
          <p className="text-white font-semibold">{serverlessInfo.platform}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-purple-200 text-sm mb-1">Runtime</p>
          <p className="text-white font-semibold">{serverlessInfo.runtime}</p>
          {serverlessInfo.environmentVariables?.AWS_EXECUTION_ENV && (
            <p className="text-green-300 text-xs mt-1">✓ Real Lambda env var</p>
          )}
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-purple-200 text-sm mb-1">Region</p>
          <p className="text-white font-semibold">{serverlessInfo.region}</p>
          {serverlessInfo.environmentVariables?.AWS_REGION && (
            <p className="text-green-300 text-xs mt-1">✓ Real Lambda env var</p>
          )}
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-purple-200 text-sm mb-1">Memory Limit</p>
          <p className="text-white font-semibold">{serverlessInfo.memoryLimit}</p>
          {serverlessInfo.environmentVariables?.AWS_LAMBDA_FUNCTION_MEMORY_SIZE && (
            <p className="text-green-300 text-xs mt-1">✓ Real Lambda env var</p>
          )}
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-purple-200 text-sm mb-1">Deployment</p>
          <p className="text-white font-semibold">{serverlessInfo.deployment}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-purple-200 text-sm mb-1">Architecture</p>
          <p className="text-white font-semibold">{serverlessInfo.architecture}</p>
        </div>
      </div>

      {serverlessInfo.environmentVariables && (
        <div className="mt-6 bg-white/5 rounded-lg p-4">
          <p className="text-purple-200 text-sm mb-2 font-semibold">Environment Variable Detection:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {Object.entries(serverlessInfo.environmentVariables).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <span className={value ? 'text-green-300' : 'text-red-300'}>
                  {value ? '✓' : '✗'}
                </span>
                <span className="text-purple-100 ml-2">{key}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-purple-100 text-sm">
          Last verified: {new Date(serverlessInfo.timestamp).toLocaleString()}
        </p>
        <p className="text-purple-200 text-xs mt-2">
          {isVerified 
            ? '✓ Verified: Running on real AWS Lambda' 
            : '⚠️ Warning: Lambda environment not detected - may be running locally'}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Next.js on AWS Amplify
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Professional Next.js 15 application deployed on AWS using Amplify.
                Scalable, fast, and cost-effective serverless architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/about"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Learn More
                </Link>
                <a
                  href="https://github.com/sharoon7171/NextJs-AWS-S3-and-CloudFront-Deployment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg border-2 border-white"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose AWS Amplify?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Leverage the power of serverless architecture for your Next.js applications
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600">
                  Serverless functions start in milliseconds, providing instant response times for your users.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Cost Effective</h3>
                <p className="text-gray-600">
                  Pay only for what you use. AWS Lambda free tier includes 1 million requests per month.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Auto Scaling</h3>
                <p className="text-gray-600">
                  Automatically scales to handle traffic spikes without any configuration needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Serverless Verification Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Serverless Verification
              </h2>
              <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                Verify that this website is running on AWS Lambda serverless functions
              </p>
            </div>
            <ServerlessVerification />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Deploy?
            </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Get started with Next.js on AWS Amplify today. Check out our documentation and deployment guide.
            </p>
            <Link
              href="/about"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg inline-block"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

