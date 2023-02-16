#!/usr/bin/env bash
if [ -v CODEARTIFACT_AUTH_TOKEN ]; then
  echo "AUTH token already defined"
else
  export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain skribe-libs --domain-owner 218588568495 --region us-east-2 --query authorizationToken --output text --profile $1`
  echo $CODEARTIFACT_AUTH_TOKEN
fi

yarn install