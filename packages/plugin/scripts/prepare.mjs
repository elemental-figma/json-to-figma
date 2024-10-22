import fs from 'fs';
// import Octokit from '@octokit/rest';
import figmaHelper from 'figcd/src/figma-helper.js';


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

/*
interface File {
  path: string;
  mode: '100644' | '100755' | '040000' | '160000' | '120000';
  type: 'commit' | 'tree' | 'blob';
  sha?: string | null;
  content: string;
}
*/

// const pushFilesToGitHub = async (owner, repo, branchName, files, commitMessage) => {
//   const client = new Octokit({
//     auth: process.env.GITHUB_TOKEN,
//   });

//   const commits = await client.repos.listCommits({
//     owner: owner,
//     repo: repo,
//   });
//   const commitSHA = commits.data[0].sha;
//   const commitableFiles/*: File[]*/ = files.map(({name, contents}) => {
//     return {
//       path: name,
//       mode: '100644',
//       type: 'commit',
//       content: contents
//     }
//   });
//   const {
//     data: { sha: currentTreeSHA },
//   } = await client.git.createTree({
//     owner: owner,
//     repo: repo,
//     tree: commitableFiles,
//     base_tree: commitSHA,
//     message: 'Updated programatically with Octokit',
//     parents: [commitSHA],
//   });

//   const {
//     data: { sha: newCommitSHA },
//   } = await client.git.createCommit({
//     owner: owner,
//     repo: repo,
//     tree: currentTreeSHA,
//     message: commitMessage,
//     parents: [latestCommitSHA],
//   });

//   await client.git.updateRef({
//     owner: owner,
//     repo: repo,
//     sha: newCommitSHA,
//     ref: `heads/${branchName}`,
//   });
// };

async function main() {
  const packageFile = './package.json';
  const currentVersionNumber = Number((await figmaHelper.getPluginInfo('./manifest.json', process.env.FIGMA_WEB_AUTHN_TOKEN)).currentVersionNumber);
  await updatePackageVersion(packageFile, currentVersionNumber + 1)
  console.log('Minor Version in '+ packageFile + ' updated to '+ (currentVersionNumber + 1))

  // const packageDataString = fs.readFileSync(packageFile, 'utf8');
  // const files = [{
  //   name: 'packages/plugin/package.json',
  //   contents: packageDataString,
  // }];
  // await pushFileToGitHub('elemental-figma', 'json-to-figma', 'changeset-release/main', files, `Update Figma plugin version`);
}

main();


