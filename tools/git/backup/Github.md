# Github

# 1 `raw.githubusercontent.com` vs `github.com`

```
# UI
https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/README.md

# Data
https://raw.githubusercontent.com/YingVickyCao/YingVickyCao.github.io/master/README.md
```

# 2 Personal access tokens

```
$ brew search clash
Warning: Error searching on GitHub: GitHub API Error: Bad credentials
The GitHub credentials in the macOS keychain may be invalid.
Clear them with:
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
Create a GitHub personal access token:
https://github.com/settings/tokens/new?scopes=gist,public_repo,workflow&description=Homebrew
echo 'export HOMEBREW_GITHUB_API_TOKEN=your_token_here' >> /Users/hades/.bash_profile
```

step 1 : remove updated github invalid credentials

```
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
```

step 2 : create a new Personal access tokens

https://github.com/settings/tokens/new?scopes=gist,public_repo,workflow&description=Homebrew

(Settings / Developer settings)

step 3 :

```xml
<!-- ~/.bash_profile -->
HOMEBREW_GITHUB_API_TOKEN=your_token_here
```
