#!/bin/bash

TARGET="45.55.204.101"
TARGET_USER="deployer"
TARGET_PATH="/www/clock.apps.screenlyapp.com"

rsync -aP --delete index.html assets ${TARGET_USER}@${TARGET}:${TARGET_PATH}
