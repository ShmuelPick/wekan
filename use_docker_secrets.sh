#!/bin/bash
if [ -r /run/secrets/MONGO_USER ]; then
	export MONGO_URL=mongodb://$(cat /run/secrets/MONGO_USER):$(cat /run/secrets/MONGO_PASSWORD)@${MONGO_REPLICA_SET}
else
	export MONGO_URL=mongodb://${MONGO_REPLICA_SET}
fi
node /build/main.js
