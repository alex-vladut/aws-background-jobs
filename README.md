# aws-background-jobs

There are a few things to be considered while using AWS Batch:
1. As I am planning to run a Docker image, then I need a way to build that image and publish it to ECR registry.
2. While running a job (aka. the docker image) an IAM role should be assigned to the container in order to be allowed to perform actions on AWS services (e.g. interaction with DynamoDB or S3).
- Here is not exactly clear to me if and why we need to create IAM roles both for ECS and EC2? Do we need such roles for both the image the container is running on as well as for the container? If yes, what is the relationship between them?
3. Also the components that the batch job will interact with will have to be created: for my example, a DynamoDB table and an S3 bucket.
4. Next we need to define the components actually required by AWS Batch to do their job: roles, job description, job queue, compute environment.
5. The final step will be to create a Lambda function that pushes the jobs to be executed.

Something I didn't expect was that AWS started a c4.large instance for executing my job - not great as this means I'll have to pay for it. I'll have to find out how to explicitly tell it to use a t2.micro.

Before being able to run my own Docker image, I had to create a ECR respository first. Then I followed the instructions provided in AWS console for building, tagging an pushing an image to this repository. Then the image could be easily referenced in CF template.

Not yet clear to me how you could restrict the number of jobs to be executed in parallel - I don't want to overload the DB by processing too many such jobs simultanously.

What I don't like about using AWS Batch:
- the console looks unfinished, a bit hard to get anything useful out there
- even got a few issues with the jobs stuck in "RUNNABLE" status, but Batch console didn't provide any insights into what could be the issue
- AWS Batch is providing a wrapping over a couple of other services (e.g. EC2, ECS, SQS) but you still need to be aware of what is under the hood in order to do your job
- just too hard to understand why is not starting a new instance?? the console is telling absolutely nothing, you can only see that a job is stuck in runnable state, nothing more.


Whenever you change something to the code, you could use the following bash script to rebuild the Docker image and push it to ECR repository (assuming you creates one already):
```
> ./build_and_push_image.sh batch-job alex
```
First argument: the name of the ECR repository.
Second argument: AWS profile to be used. If not provided, then the default profile will be used.