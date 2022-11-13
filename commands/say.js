module.exports = async (github, context, cmd, args) => {
  if (args.length === 1) {
    return github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: [
        "## Help",
        "`;say ...<msg>`",
        "Delete comments"
      ].join("\n")
    });
  }
  return github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: args.slice(1).join(" ")
    });
}
