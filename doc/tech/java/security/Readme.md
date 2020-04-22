# 加密和解密

## 何为 加密 和 解密 ？

加密：把传入的内容，经过一定的算法，变成内容  
解密：传入变后的内容，经过一定的算法，还原成原来的内容

<h2 id="symmetric_encryption">2 对称加密</h2>
加密与解密用的是同一个密钥。

指定的密钥，按照密码的长度截取数据，分成数据块，和密钥进行复杂的移位、算数运算或者数据处理等操作，形成只有特定的密码才能够解开的数据。

## 碰撞攻击

抗碰撞性是相对与碰撞攻击讲，碰撞攻击指两个不同的原数据在算法加密后得到了相同的值。

## Hash vs Encrypting

Hashing is a one way function  
Encrypting is a proper (two way) function.

# Encrypting

- [Dec](Dec.md)

# Hashing

- [MD5](MD5.md)

# Refs

[Difference between Hashing a Password and Encrypting it](https://stackoverflow.com/questions/326699/difference-between-hashing-a-password-and-encrypting-it)
