async function main() {
  console.log('main()');
  const args = process.argv.slice(2); // Skip the first two arguments (node and script path)
  // const published = args[0]; // The first argument passed from GitHub Actions

  const dataIndex = args.indexOf('--data');
  
  const data = dataIndex !== -1 && args[dataIndex + 1] ? args[dataIndex + 1] : 'default';
  
  

  console.log(`Published status: ${data}`);

  console.log('Publish');
}

main();
