module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'cd apps/frontend && pnpm install && pnpm dev',
    },
    {
      name: 'coderui',
      script: 'cd packages/coderui && pnpm install && pnpm dev',
    },
    {
      name: 'schemas',
      script: 'cd packages/schemas && pnpm install && pnpm dev',
    },
    {
      name: 'server',
      script: 'cd apps/server && pnpm install && pnpm dev',
      out_file: 'apps/server/logs/output.log', // Path for standard output logs
      error_file: 'apps/server/logs/error.log', // Path for error logs
      log_file: 'apps/server/logs/app.log', // Combined logs (both stdout and stderr)
      merge_logs: true, // Merge stdout and stderr into the same log file
      // instances: 'max',
      // exec_mode: 'cluster',
    },
  ],
};
