#!/bin/bash

# Get the current build number from rootSaga.ts
BUILD_NUM=$(grep -oP "(?<=build id: )\d+" src/state/rootSaga.ts)

# Increment the build number and save it back to rootSaga.ts
NEW_BUILD_NUM=$((BUILD_NUM+1))
sed -i "s/build id: $BUILD_NUM/build id: $NEW_BUILD_NUM/" src/state/rootSaga.ts

# Get the current date and time in the format YYYY-MM-DD HH:MM:SS
CURRENT_TIME=$(date +'%Y-%m-%d %H:%M:%S')

# Replace the old build information with the new build information in rootSaga.ts
sed -i "s#build id: $NEW_BUILD_NUM/\(.*\)#build id: $NEW_BUILD_NUM/$CURRENT_TIME')#" src/state/rootSaga.ts
sed -i 's/"/'"'"'/g' src/state/rootSaga.ts