#! /bin/bash

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
mkdir -p $__dirname/../mock/server/opt/ml/model
cp -r $__dirname/../mock/train/opt/ml/model/* $__dirname/../mock/server/opt/ml/model/
