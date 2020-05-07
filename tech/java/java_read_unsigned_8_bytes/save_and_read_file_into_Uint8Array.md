# Save javascript Uint8Array to file

[246, 254, 255, 0, 10, 126, 127, 128, 129, 253, 254, 255, 0, 1, 232]


```java
var sampleBytes = new Uint8Array(15);
sampleBytes[0] = -10;
sampleBytes[1] = -2;
sampleBytes[2] = -1;
sampleBytes[3] = 0;
sampleBytes[4] = 10;
sampleBytes[5] = 126;
sampleBytes[6] = 127;
sampleBytes[7] = 128;
sampleBytes[8] = 129;
sampleBytes[9] = 253;
sampleBytes[10] = 254;
sampleBytes[11] = 255;
sampleBytes[12] = 256;
sampleBytes[13] = 257;
sampleBytes[14] = 1000;

var saveByteArray = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    return function (data, name) {
        var blob = new Blob(data, {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

saveByteArray([sampleBytes], 'com.example');

```
