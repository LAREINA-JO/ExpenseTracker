import repl from 'repl';
import { consoleTest } from './consoleTest';

const replSever = repl.start({
  prompt: 'app > ',
  ignoreUndefined: true,
});

replSever.context.consoleTest = consoleTest;
