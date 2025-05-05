import { spawn } from 'node:child_process';

const buildSrc = () => {
  const childProcess = spawn(
    'pnpm',
    [
      'tsc',
      '-p',
      'scripts/esm/tsconfig.build.json',
      '&&',
      'tsc-alias',
      '-p',
      'scripts/esm/tsconfig.build.json',
    ],
    { shell: true },
  );

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};

const buildEsm = () => {
  buildSrc();
};

buildEsm();
