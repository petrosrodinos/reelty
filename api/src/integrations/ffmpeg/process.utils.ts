import { spawn } from 'child_process';

export interface RunProcessOptions {
  cwd?: string;
  timeoutMs?: number;
  /** Max bytes of stdout/stderr kept in memory (tail is kept for stderr). */
  maxBufferBytes?: number;
}

export interface ProcessResult {
  stdout: string;
  stderr: string;
}

export class ProcessError extends Error {
  constructor(
    message: string,
    readonly code: number | null,
    readonly stderrTail: string,
    readonly timedOut = false,
  ) {
    super(message);
    this.name = 'ProcessError';
  }
}

/**
 * Runs a binary without a shell (arguments are never interpreted) and resolves on exit code 0.
 * Rejects with ProcessError (including the stderr tail) otherwise.
 */
export function runProcess(
  bin: string,
  args: string[],
  opts: RunProcessOptions = {},
): Promise<ProcessResult> {
  const maxBuffer = opts.maxBufferBytes ?? 256 * 1024;
  return new Promise<ProcessResult>((resolve, reject) => {
    const child = spawn(bin, args, {
      cwd: opts.cwd,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    let timedOut = false;
    let settled = false;

    const timer = opts.timeoutMs
      ? setTimeout(() => {
          timedOut = true;
          child.kill('SIGKILL');
        }, opts.timeoutMs)
      : null;

    child.stdout.on('data', (chunk: Buffer) => {
      if (stdout.length < maxBuffer) stdout += chunk.toString('utf8');
    });
    child.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString('utf8');
      if (stderr.length > maxBuffer) stderr = stderr.slice(stderr.length - maxBuffer);
    });

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      fn();
    };

    child.on('error', (err) => {
      finish(() => reject(new ProcessError(`Failed to start process: ${err.message}`, null, stderr)));
    });
    child.on('close', (code) => {
      finish(() => {
        if (code === 0 && !timedOut) return resolve({ stdout, stderr });
        reject(
          new ProcessError(
            timedOut ? 'Process timed out' : `Process exited with code ${code}`,
            code,
            stderr.slice(-4000),
            timedOut,
          ),
        );
      });
    });
  });
}
