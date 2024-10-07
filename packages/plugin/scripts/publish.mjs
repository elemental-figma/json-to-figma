async function main() {
  const args = process.argv.slice(2); // Skip the first two arguments (node and script path)
  const published = args[0]; // The first argument passed from GitHub Actions
  console.log(`Published status: ${published}`);

  console.log('Publish');
}

main();
