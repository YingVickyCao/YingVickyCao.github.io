# AES

- Advanced Encryption Standard，缩写：AES
- AES

| AES      | Description                                             |
| -------- | ------------------------------------------------------- |
| 包括     | AES-ECB,AES-CBC,AES-CTR,AES-OFB,AES-CFB                 |
| 加密模式 | ECB/CBC/CTR/OFB/CFB                                     |
| 填充     | pkcs5padding/pkcs7padding/zeropadding/iso10126/ansix923 |
| 数据块   | 128 /192 /256 位                                        |
| Key      | 16 /24 /32 位， 其中 24 /32 位需要 JCE                  |
| 偏移量   | iv 偏移量，ECB 不用设置                                 |
| 输出     | byte[]。一般转为 base64/hex                             |
| 字符集   | gb2312/gbk/gb18030/utf8                                 |

- Key  
  无论是否使用 seed，每次生成的 Key 均不同  
  相同明文，若使用同一个 Key，则密文相同。  
  生成的 Key，可保存  
   建议 Key 为 16 位，避免 Key 位数不足补 0，导致 Key 不一致，加解密错误。
- JCE  
  Java 密码扩展无限制权限策略文件，每个 JDK 版本对应一个 JCE

# Refs:

- [Online AES](http://tool.chacuo.net/cryptaes)
