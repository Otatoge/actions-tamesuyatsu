const { readdir } = require("node:fs/promises");
module.exports = async (github, context) => {
  const args = context.payload.comment.body.split(" ");
  const cmd = args[0]
  if (cmd.startsWith(";")) {
    let ran = false
    for (const file of await readdir("./commands/", { withFileTypes: true })) {
      if (file.isFile() && `;${file.name}` === cmd) {
        require(`./commands/${file.name}`)(github, context, cmd, args);
        ran = true
        break
      }
    }
    if (!ran) {
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: '😔 Sorry!, command not found.'
      });
    }
  }
}
