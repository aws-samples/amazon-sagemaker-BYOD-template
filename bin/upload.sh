#! /bin/bash
__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export AWS_PROFILE=$(node -e "console.log(require('$__dirname'+'/../config').profile)")
export AWS_DEFAULT_REGION=$(node -e "console.log(require('$__dirname'+'/../config').region)")
BUCKET=$(node -e "console.log(require('$__dirname'+'/../config').assetBucket)")
PREFIX=$(node -e "console.log(require('$__dirname'+'/../config').assetPrefix)")

BLUE=$(tput setaf 4)
RESET=$(tput sgr0)
echo bootstrap bucket is $BLUE$BUCKET/$PREFIX$RESET

aws s3 sync $__dirname/../build/ s3://$BUCKET/$PREFIX/  
aws s3 sync $__dirname/../template/assets s3://$BUCKET/$PREFIX/
aws s3 sync $__dirname/../mock/train/opt/ml/input/data s3://$BUCKET/$PREFIX/data --delete
