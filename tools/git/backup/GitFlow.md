# GitFlow

| Branch Type        | Branch Name         | DESC                                                                                        |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------- |
| Development branch | master/develop/main |                                                                                             |
| Production branch  | tag/                | After done release, create tag branch based on release branch.                              |
| Feature branch     | feature/            | Tech/feature/improvement. PR this -> develop                                                |
| Release branch     | release/            | Release task or long-term maintenance versions.                                             |
| Bugfix branch      | bugfix/             | To fix current release branch. PR this -> release + develop                                 |
| Hotfix branch      | hotfix/             | To quickly fix a Production branch. PR this -> older release + new release + develop branch |
