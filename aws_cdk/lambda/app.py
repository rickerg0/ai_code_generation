import json
from aws_lambda_powertools import Logger, Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext

logger = Logger()
tracer = Tracer()

@logger.inject_lambda_context
@tracer.capture_lambda_handler
def handler(event: dict, context: LambdaContext) -> dict:
    """
    A simple Lambda function that demonstrates the use of AWS Lambda Powertools.
    """
    try:
        # Log the incoming event
        logger.info("Received event", extra={"event": event})
        
        # Process the event
        response = {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Hello from Python Lambda!",
                "event": event
            })
        }
        
        # Log the response
        logger.info("Sending response", extra={"response": response})
        
        return response
        
    except Exception as e:
        logger.exception("Error processing event")
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": str(e)
            })
        } 