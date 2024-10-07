import { extractChangeset } from "./parse-changeset.mjs";

async function main() {
  console.log('main()');
  const args = process.argv.slice(2); // Skip the first two arguments (node and script path)
  // const published = args[0]; // The first argument passed from GitHub Actions

  const dataIndex = args.indexOf('--data');
  
  const data = dataIndex !== -1 && args[dataIndex + 1] ? args[dataIndex + 1] : 'default';

  console.log({ data });

  let pluginVersion;
  try {
    const publishedVersions = JSON.parse(data);

    pluginVersion = publishedVersions.find(({ name }) => (name === '@elemental-figma/json-to-figma'))?.version;

  } catch (err) {
    console.log(err);
    return;
  }
  if (!pluginVersion) {
    console.log('Plugin version change not found.');
    return;
  }
  const changes = extractChangeset('@elemental-figma/json-to-figma', pluginVersion);

  // [{"name": "@xx/xx", "version": "1.2.0"}, {"name": "@xx/xy", "version": "0.8.9"}]
  
  

  console.log(`Published status: ${changes}`);

  console.log('Publish');
}

main();
