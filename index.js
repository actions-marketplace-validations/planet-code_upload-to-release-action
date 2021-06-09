const core = require("@actions/core");
const github = require("@actions/github");

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

  validateInputs();

  const releaseId = await getReleaseId(octokit);
  //await addAsset(octokit);
}

function validateInputs() {
  const releaseId = core.getInput("release-id");
  const useLastRelease = core.getBooleanInput("use-last-release");

  if (releaseId.length === 0 && !useLastRelease)
    throw new Error(
      "Either release-id should be set or use-last-release should be true"
    );
}

async function getReleaseId() {
  const releaseId = core.getInput("release-id");
  const useLastRelease = core.getBooleanInput("use-last-release");

  if (!useLastRelease) return releaseId;

  const releases = await octokit.rest.repos.listReleases({
    ...github.context.repo,
  });

  console.log(`releases ${JSON.stringify(releases, undefined, 2)}`);
}

// async function createRelease(newTag, octokit) {
//   const showChangelog = core.getBooleanInput("show-changelog");
//   let body = " ";

//   if (showChangelog) {
//     const listOfPrs =
//       await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
//         ...github.context.repo,
//         commit_sha: github.context.payload.head_commit.id,
//       });
//     const firstPr = listOfPrs.data[0];
//     body = `# ${firstPr.title}\n\n${firstPr.body}`;
//   }

//   console.log("Creating release");
//   await octokit.rest.repos.createRelease({
//     ...github.context.repo,
//     tag_name: newTag,
//     name: newTag,
//     body: body,
//   });
// }
