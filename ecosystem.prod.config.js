module.exports = {
  apps: [
    {
      name: 'server',
      script: 'apps/server/dist/index.js',
      out_file: 'apps/server/logs/output.log', // Path for standard output logs
      error_file: 'apps/server/logs/error.log', // Path for error logs
      log_file: 'apps/server/logs/app.log', // Combined logs (both stdout and stderr)
      merge_logs: true, // Merge stdout and stderr into the same log file
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
