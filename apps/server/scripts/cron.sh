#!/bin/bash

# Determine the directory where this script is located
BASE_PATH="$(cd "$(dirname "$0")/.." && pwd)"

crontab -l > /tmp/mycron
# Write the cron job using the dynamically determined absolute path
echo "0 0 * * * /bin/bash $BASE_PATH/scripts/logrotate.sh >> $BASE_PATH/logs/cronjob.log 2>&1" >> /tmp/mycron

crontab /tmp/mycron
rm /tmp/mycron
