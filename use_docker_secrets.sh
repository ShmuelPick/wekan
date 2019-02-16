#!/bin/bash
export MONGO_URL=mongodb://$(cat /run/secrets/MONGO_USER):$(cat /run/secrets/MONGO_PASSWORD)@${MONGO_REPLICA_SET}
node /build/main.js