const { markdown, danger, warn } = require('danger');

let errorCount = 0;

const bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(`:exclamation: Big PR (${++errorCount})`);
  markdown(
    `> (${errorCount}) : Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.`
  );
}

if (danger.github.pr.body.length < 10) {
  warn(`:exclamation: No description (${++errorCount})`);
  markdown(`> (${errorCount}) : This pull request needs an description.`);
}
