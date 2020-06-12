# SHA

| SHA   | Version |
| ----- | ------- |
| SHA-1 | 1       |
| SHA-2 | 2       |
| SHA-3 | 3       |

SHA-1 :

| SHA-1 | Encoded bytes |
| ----- | ------------- |
| SHA-1 | 20            |

SHA-2 : SHA-X bit === (X / 8) bytes  
| SHA-2 | Encoded bytes |
| ------- | ------------- |
| SHA-256 | fixed-size 32 |
| SHA-384 | fixed-size 48 |
| SHA-512 | fixed-size 64 |

SHA-3 :

| SHA-3    | Encoded bytes |
| -------- | ------------- |
| SHA3-256 | fixed-size 32 |

- SHA (Secure Hash Algorithm)
  The SHA (Secure Hash Algorithm) is one of the popular cryptographic hash functions.

- SHA-2 == SHA-256 == SHA-256 位

- SHA-3  
  vs SHA-2: provides a different approach to generate a unique one-way hash and more faster .  
  JDK 9 avaiable

- SHA 作为[数字签名](Certificate.md)的 Hash 算法

# Refs

- [Hash fucntions](https://cryptii.com/pipes/hash-function)
- https://www.baeldung.com/sha-256-hashing-java
- https://www.thesslstore.com/blog/difference-sha-1-sha-2-sha-256-hash-algorithms/
- [Descriptions of SHA-256, SHA-384, and SHA-512](http://iwar.org.uk/comsec/resources/cipher/sha256-384-512.pdf)
- https://www.runoob.com/w3cnote/https-ssl-intro.html
