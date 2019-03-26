# aws-background-jobs

There are a few things to be considered while using AWS Batch:
1. As I am planning to run a Docker image, then I need a way to build that image and publish it to ECS registry.
2. While running a job (aka. the docker image) an IAM role should be assigned to the container in order to be allowed to perform actions on AWS services (e.g. interaction with DynamoDB or S3).
- Here is not exactly clear to me if and why we need to create IAM roles both for ECS and EC2? Do we need such roles for both the image the container is running on as well as for the container? If yes, what is the relationship between them?
3. Also the components that the batch job will interact with will have to be created: for my example, a DynamoDB table and an S3 bucket.
4. Next we need to define the components actually required by AWS Batch to do their job: roles, job description, job queue, compute environment.

Something I didn't expect was that AWS started a c4.large instance for executing my job - not great as this means I'll have to pay for it. I'll have to find out how to explicitly tell it to use a t2.micro.
