import { readFile, writeFile, stat } from 'fs/promises';
import path from 'path';
import { Octokit } from '@octokit/rest';

import { extractChangeset } from "./parse-changeset.mjs";
import { createZipBundle } from './bundle.mjs';

// import * as fs from 'fs-extra';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

async function readJSONFile(filePath) {
  const absoluteFilePath = path.resolve(filePath)
  const data = await readFile(absoluteFilePath, 'utf8');
  return JSON.parse(data);
}

async function main() {
  console.log('main()');
  // const args = process.argv.slice(2); // Skip the first two arguments (node and script path)
  // // const published = args[0]; // The first argument passed from GitHub Actions

  // const dataIndex = args.indexOf('--data');
  
  // const data = dataIndex !== -1 && args[dataIndex + 1] ? args[dataIndex + 1] : 'default';

  // console.log({ data });

  // let pluginVersion;
  // try {
  //   const publishedVersions = JSON.parse(data);

  //   pluginVersion = publishedVersions.find(({ name }) => (name === '@elemental-figma/json-to-figma'))?.version;

  // } catch (err) {
  //   console.log(err);
  //   return;
  // }
  // if (!pluginVersion) {
  //   console.log('Plugin version change not found.');
  //   return;
  // }
  const packageJson = await readJSONFile(path.join(__dirname, '../package.json'));

  const changes = extractChangeset('@elemental-figma/json-to-figma', packageJson.version);

  // [{"name": "@xx/xx", "version": "1.2.0"}, {"name": "@xx/xy", "version": "0.8.9"}]
  
  

  console.log(`Published status: ${changes}`);

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const owner = 'elemental-figma';
  const repo = 'json-to-figma';

  const release = await octokit.rest.repos.getReleaseByTag({
    owner,
    repo,
    tag: `${packageJson.name}@${packageJson.version}`,
  });

  await createZipBundle(true);

  const releaseZip = await readFile(path.join(__dirname, '../dist/release.zip'), 'binary');
  // const releaseZipSize = (await stat(path.join(__dirname, '../dist/release.zip'))).size;

  const uploadReleaseAssetRes = await octokit.rest.repos.uploadReleaseAsset({
    owner,
    repo,
    url: release.data.upload_url,
    release_id: release.data.id,
    data: releaseZip,
    name: 'release.zip',
  });

  console.log(uploadReleaseAssetRes);

  console.log('Publish');
}

main();
