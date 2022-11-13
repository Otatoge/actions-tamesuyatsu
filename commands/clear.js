const { setTimeout } = require("node:timers/promises");
module.exports = async (github, context, cmd, args) => {
  if (args.length !== 2 || Number.isNaN(Number(args[1]))) {
    return github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: [
        "## Help",
        "`;clear <num>`",
        "Delete comments"
      ].join("\n")
    });
  }
  const comments = await github.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo
  });
  for (const comment of comments.data.slice(-1 * Number(args[1]))) {
    await github.rest.issues.deleteComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: comment.id,
    });
    await setTimeout(100);
  }
}