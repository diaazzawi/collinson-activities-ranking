import {createPinoLogger, pino} from "@bogeychan/elysia-logger";
import {env} from "bun";
import _ from "lodash";
import {DateTime} from "luxon";
import {createStream} from "rotating-file-stream";
import {Writable} from "stream";
import traverse from "traverse";

const sensitiveKeys = [
  /cookie/i,
  /passw(or)?d/i,
  /^pw$/,
  /^pass$/i,
  /secret/i,
  /token/i,
  /authorization/i,
  /api[-._]?key/i,
];

function isSensitiveKey(key: string) {
  if (key) {
    return sensitiveKeys.some((regex) => regex.test(key));
  }
}

function redactObject(obj: Record<string, unknown>) {
  traverse(obj).forEach(function redactor() {
    if (this.key && isSensitiveKey(this.key)) {
      this.update("🔑🔒🔑");
    }
  });
}

function redact(obj: Record<string, unknown>) {
  const copy = _.cloneDeep(obj); // Making a deep copy to prevent side effects
  redactObject(copy);
  return copy;
}

function logFilenameGenerator(time: number | Date, index?: number): string {
  let filename = "app";
  if (time instanceof Date) {
    const dateTime = DateTime.fromJSDate(time);
    filename = `${filename}-${dateTime.toFormat("ddMMyyyy")}`;
  }
  if (index !== undefined) {
    filename = `${filename}-${index}`;
  }
  filename = `${filename}.log`;
  return filename;
}

function getStreams(): Writable[] {
  const streams: Writable[] = [];
  if (env.LOG_TO_CONSOLE === "true") {
    // Log stdout stream (console)
    streams.push(process.stdout);
  }
  if (env.LOG_TO_FILE === "true") {
    // Log to a file system stream (rotating file stream)
    streams.push(
      createStream(logFilenameGenerator, {
        size: "10M", // rotate every 10 MegaBytes written
        interval: "1d", // rotate daily
        compress: "gzip", // compress rotated files
        path: __dirname, // the path where the log file will be generated
        immutable: true, // necessary to pass non-null time argument to logFilenameGenerator
      }),
    );
  }
  return streams;
}

export const elysiaLogger = createPinoLogger({
  // Use the LOG_LEVEL environment variable, or default to "info"
  level: env.LOG_LEVEL ?? "info",

  // Rename 'msg' to 'message'
  messageKey: "message",

  // Rename 'err' to 'error'
  errorKey: "error",

  // Rename 'time' to 'datetime'
  timestamp: () =>
    `,"datetime":"${DateTime.now().toFormat("MM/dd/yyyy hh:mm:ss a")}"`,

  // Avoid adding pid and hostname properties to each log
  base: undefined,

  // Override some formatters
  formatters: {
    // Use `level` label instead of integer values
    level: (label) => {
      return {level: label};
    },
    // Redact sensitive json props
    log: (meta) => redact(meta),
  },

  // Log to multiple streams
  stream: pino.multistream(getStreams()),
});
