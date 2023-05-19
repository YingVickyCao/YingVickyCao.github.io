# atlassian - Bitbucket

## QA:`This is not a valid source path / URL`

解决：  
// 生成 key
`ssh--keygen`

// 拷贝 key 到剪切板
`pbcopy < ~/.ssh/id_rsa.pub`

Success:
`This is a git respository`

`ssh -T git@bitbucket.org`

https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/#Step-3.-Add-the-public-key-to-your-Account-settings.1
