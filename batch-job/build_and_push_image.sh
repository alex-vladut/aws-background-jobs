#!/bin/sh

IMAGE_ID=$1
PROFILE=$2

if [ -z "$PROFILE" ]
  then
    echo "No profile specified, will continue with default."
  else
    export AWS_DEFAULT_PROFILE=$PROFILE
fi

# brew list jp &>/dev/null || brew install jq
ACCOUNT_ID=$(aws sts get-caller-identity | jq '.Account' | tr -d '"')
$(aws ecr get-login --no-include-email)
docker build -t $IMAGE_ID .
REPOSITORY_URL=$ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/$IMAGE_ID
docker tag $IMAGE_ID $REPOSITORY_URL
docker push $REPOSITORY_URL