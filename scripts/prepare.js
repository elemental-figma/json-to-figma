const fs = require('fs');

const { getPluginInfo } = require('figcd/src/figma-helper');

async function updatePackageVersion(packageFile, minorVersion) {
  const packageDataRaw = fs.readFileSync(packageFile, 'utf8');
  const packageData = JSON.parse(packageDataRaw);
  const version = packageData?.figma?.version || '0';
  const versionParts = version.split('.');
  versionParts[versionParts.length - 1] = minorVersion.toString();
  const updatedVersion = versionParts.join('.');
  fs.writeFileSync(packageFile, JSON.stringify({
    ...packageData,
    figma: {
      ...packageData.figma,
      version: updatedVersion
    }
  }, null, 2), 'utf8');
}

async function main() {
  const packageFile = './package.json';
  const currentVersionNumber = (await getPluginInfo('./manifest.json', process.env.FIGMA_WEB_AUTHN_TOKEN)).currentVersionNumber; 
  await updatePackageVersion(packageFile, currentVersionNumber + 1)
  console.log('Minor Version in '+ packageFile + ' updated to '+ (currentVersionNumber + 1))
}

main();
