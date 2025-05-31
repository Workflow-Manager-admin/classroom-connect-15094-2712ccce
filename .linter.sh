#!/bin/bash
cd /home/kavia/workspace/code-generation/classroom-connect-15094-2712ccce/classroom_connect_ui
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

