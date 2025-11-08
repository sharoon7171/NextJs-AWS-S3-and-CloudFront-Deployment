import { NextResponse } from 'next/server';

/**
 * API endpoint that verifies and returns AWS Lambda environment information.
 * Detects if the application is running on AWS Lambda by checking for Lambda-specific environment variables.
 * 
 * @returns {Promise<NextResponse>} JSON response containing Lambda environment details and verification status
 */
export async function GET() {
  // Check for AWS Lambda environment variables to determine if running on Lambda
  const isLambda = !!(
    process.env.AWS_EXECUTION_ENV || 
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    process.env._HANDLER
  );

  // Extract Lambda environment variables
  const runtime = process.env.AWS_EXECUTION_ENV;
  const region = process.env.AWS_REGION;
  const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
  const functionVersion = process.env.AWS_LAMBDA_FUNCTION_VERSION;
  const memoryLimit = process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE;

  // Build serverless environment information object
  const serverlessInfo = {
    platform: isLambda ? 'AWS Lambda (Serverless)' : 'Unknown/Development',
    runtime: runtime || 'Not detected (may be running locally)',
    region: region || 'Not detected',
    functionName: functionName || 'Not detected',
    functionVersion: functionVersion || 'Not detected',
    memoryLimit: memoryLimit ? `${memoryLimit} MB` : 'Not detected',
    timestamp: new Date().toISOString(),
    deployment: process.env.AWS_AMPLIFY_APP_ID ? 'AWS Amplify' : 'Unknown',
    architecture: isLambda ? 'Serverless' : 'Unknown',
    verified: isLambda,
    handler: process.env._HANDLER || 'Not detected',
    // Track which environment variables are actually present (for verification display)
    environmentVariables: {
      AWS_EXECUTION_ENV: !!runtime,
      AWS_REGION: !!region,
      AWS_LAMBDA_FUNCTION_NAME: !!functionName,
      AWS_LAMBDA_FUNCTION_MEMORY_SIZE: !!memoryLimit,
      LAMBDA_TASK_ROOT: !!process.env.LAMBDA_TASK_ROOT,
    },
  };

  return NextResponse.json(serverlessInfo, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

