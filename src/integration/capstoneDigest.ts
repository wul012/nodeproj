import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

export async function sha256File(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const digest = createHash("sha256");
    const stream = createReadStream(path);
    stream.once("error", reject);
    stream.on("data", (chunk) => digest.update(chunk));
    stream.once("end", () => resolve(digest.digest("hex")));
  });
}

export function sha256Text(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}
