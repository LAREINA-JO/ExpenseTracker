#!/bin/bash

# Set the PATH to include common locations, including Homebrew's sbin directory
export PATH=/opt/homebrew/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Determine the directory where this script is located
BASE_PATH="$(cd "$(dirname "$0")/.." && pwd)"

# Define the logrotate configuration dynamically
cat <<EOF > /tmp/logrotate.conf
$BASE_PATH/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
}
EOF

echo "$(which logrotate) -v /tmp/logrotate.conf"
# Run logrotate with the generated configuration
$(which logrotate) -v /tmp/logrotate.conf