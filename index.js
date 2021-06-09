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

  console.log(`${JSON.stringify(releases.data[0], undefined, 2)}`); // REMOVE THIS

  return releases.data[0];
}

async function addAsset(release, octokit) {
  const assetPath = core.getInput("asset-path");

  console.log(`${JSON.stringify(fs.readdirSync("./"), undefined, 2)}`);

  await octokit.rest.repos.uploadReleaseAsset({
    ...github.context.repo,
    release_id: release.id,
    name: `${release.name}-asset`,
    data: fs.readFileSync(assetPath),
  });
}
