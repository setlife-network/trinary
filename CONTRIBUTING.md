### Default Developer Workflow

- Assign yourself to an issue you feel confident in taking on
- Checkout a new branch from the latest version of `develop`. Always make sure you have synced with the default branch (currently `develop`)
- Name your branch with your initials, and either the issue number or a short description of what you're working on if multiple issues may be involvedin your work. Examples:
```
ol/issue-1
ol/issue-1/update-readme
ol/ui-overhaul
```
- After you've finished testing locally, add any new files, commit and refer to any relevant issues in your commit message. Include `closes #1` if the code you are pushing resolves the issue. Follow these guidelines for writing your commit message (https://chris.beams.io/posts/git-commit/) and try to stick to those rules as closely as possible. Take your time and do not rush when writing commit messages.
- Try to stay focused on one issue at a time and commit frequently, but if it's ever necessary to _close_ multiple issues in a single commit message, be sure to format it as `closes #1, closes #2` since just `closes #1, #2` will leave issue #2 open after merging.
- Before pushing, do another sync with `develop` in case any pull requests have been merged already while you were working. Resolve any conflicts before finalizing the commits and pushing to your branch. See below:
```
// after finished working on your-branch
git add .
git commit -a
// press I to enable INSERT mode and type your commit message, then press ESC, then type ":x" then press Enter

git checkout develop
git pull
git checkout - // this is a shortcut for checking out the last branch you were on
git merge - // this is a shortcut for merging the last branch you were on into the branch you are currently on

// resolve merge conflicts if necessary (git add; git commit -a)

git push -u origin your-branch 
// or just "git push" if your branch already exists on GitHub
```
- Create a pull request from `your-branch` to `develop` and be sure to include either a video recording/screenshot with proof that the issue is resolved (preferred) OR clear instructions on how to test successfully and wait for a code review. If any changes are required after review, pushing to the same branch again will automatically update the pull request
