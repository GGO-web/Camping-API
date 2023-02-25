import { readdirSync } from "fs";

export const getDirectoryFiles = (source: string) =>
  readdirSync(source, { withFileTypes: true }).map((dirent) => dirent.name);
