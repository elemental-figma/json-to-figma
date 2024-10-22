import fs from 'fs';
import path from 'path';
import figmaHelper from 'figcd/src/figma-helper.js';
// const { getFigmaFile, getText } = require("./parrot-helper.js");

import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const authNToken = process.env.FIGMA_WEB_AUTHN;
// const figmaFile = process.env.FIGMA_TEXT_FILE;
const manifestPath = path.join(__dirname, '../manifest.json');
const { cookie } = await figmaHelper.getFigmaCookie();

// const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

export async function publishRelease(releaseNotes) {
    const currentPluginInfo = await figmaHelper.getPluginInfo(manifestFile, authNToken)

    const description = currentPluginInfo.currentVersion.description;
    const name = currentPluginInfo.currentVersion.name;
    const category = currentPluginInfo.category_id;
    const tagline = currentPluginInfo.currentVersion.tagline;
    const tags = currentPluginInfo.tags;

    console.log('Preparing release...');
    const preparedRelease = await figmaHelper.prepareRelease(manifestPath, name, description, releaseNotes, tagline, tags, authNToken, category, cookie);
    
    const preparedVersionId = preparedRelease.version_id;
    const signature = preparedRelease.signature;

    console.log('Creating code bundle....');
    await figmaHelper.uploadCodeBundle(manifestPath, preparedRelease.code_upload_url);
    console.log('Uploading code bundle.... done');

    console.log('Releasing prepared version (' + preparedRelease.version_id + ')');
    const publishedVersion = await figmaHelper.publishRelease(
      manifestPath,
      preparedVersionId,
      signature,
      authNToken,
      cookie,
      carouselMedia,
      carouselVideos
    );
    
    console.log('Version '+ publishedVersion.plugin.versions[preparedVersionId].version +' (' + preparedVersionId + ') published');
}
