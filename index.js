const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

run();

async function run() {
  try {
    await action();
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function action() {
  const githubToken = core.getInput("token");
  const octokit = github.getOctokit(githubToken);

  const release = await getRelease(octokit);
  await addAsset(release, octokit);
}

async function getRelease(octokit) {
  const releases = await octokit.rest.repos.listReleases({
    ...github.context.repo,
  });

  console.log(`releases ${JSON.stringify(releases, undefined, 2)}`); // REMOVE THIS

  return releases.data[0];
}

async function addAsset(release, octokit) {
  const assetPath = core.getInput("asset-path");
  //const assetContentType = core.getInput("asset-content-type");
  //const uploadUrl = release.upload_url;

  // // Determine content-length for header to upload asset
  // const contentLength = (filePath) => fs.statSync(filePath).size;

  // // Setup headers for API call, see Octokit Documentation: https://octokit.github.io/rest.js/#octokit-routes-repos-upload-release-asset for more information
  // const headers = {
  //   "content-type": assetContentType,
  //   "content-length": contentLength(assetPath),
  // };

  // // Upload a release asset
  // // API Documentation: https://developer.github.com/v3/repos/releases/#upload-a-release-asset
  // // Octokit Documentation: https://octokit.github.io/rest.js/#octokit-routes-repos-upload-release-asset
  // const uploadAssetResponse = await github.repos.uploadReleaseAsset({
  //   url: uploadUrl,
  //   headers,
  //   name: assetName,
  //   file: fs.readFileSync(assetPath),
  // });

  await octokit.rest.repos.uploadReleaseAsset({
    ...github.context.repo,
    release_id: release.id,
    name: `${release.name}-asset`,
    data: fs.readFileSync(assetPath),
  });
}
