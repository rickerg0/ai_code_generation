import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Create Python Lambda function
    const pythonLambda = new lambda.Function(this, 'PythonLambda', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'app.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      environment: {
        POWERTOOLS_SERVICE_NAME: 'python-lambda',
      },
    });

    // Output the Lambda function ARN
    new cdk.CfnOutput(this, 'LambdaFunctionArn', {
      value: pythonLambda.functionArn,
      description: 'ARN of the Python Lambda function',
    });

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
