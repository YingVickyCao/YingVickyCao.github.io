# Device compatibility(自适应)

考虑不同屏幕的适应性问题：屏幕尺寸、分辨率、屏幕方向。

# 1. Support different screen sizes

## 屏幕方向

```
/res/layout-land/
/res/layout-port/  = /res/layout/ (default )
```

## 屏幕尺寸

- sw = smallest width  
  屏幕尺寸至少宽度

```
res/layout-sw600dp/main_activity.xml
res/layout-sw600dp-land/main_activity.xml
```

- w = width  
  屏幕尺寸可用宽度

```
res/layout-w600dp/main_activity.xml
```

```xml
# tablet 1600x2560, denstiy = 360 -> large
# tablet 1800x2560, denstiy = 320 -> xlarge

values-xlarge
values-xlarge-land

values-sw360dp-large
values-sw360dp-large-land

values-sw360dp
values-sw360dp-land

values
values-land

=> If landscape,  values-sw360dp-large-land,
=> If portrait,   values-sw360dp-large
```

```xml
# tablet 1600x2560, denstiy = 360 -> large
# tablet 1800x2560, denstiy = 320 -> xlarge

values-xlarge
values-xlarge-land

values-sw360dp
values-sw360dp-land

values
values-land

=> If landscape,  values-sw360dp-land
=> If portrait,   values-sw360dp
```

# 2. Support different pixel densities

屏幕分辨率

## Auto-scaling of pixel dimensions and coordinates

## disable pre-scaling

`drawable-nodpi`

## Use vector graphics instead

## Support different pixel densities

## Declare restricted screen support

# 3. Support different languages and cultures

## I18N

- internationalization （国际化）简称：i18n
- localization（本地化 ），简称 L10n

## java

## Android

### 创建 XXX-语言代码-r 国家代码 形式

```
XXX-语言代码-r 国家代码

values-en-rUS // 美式英语
values-zh-rCN // 简体中文

drawable-en-rUS // 美式英语
drawable-zh-rCN // 简体中文
```

### I18N_language_country

| 国家/地区          | 语言代码 |
| ------------------ | -------- |
| 简体中文(中国)     | zh-cn    |
| 繁体中文(香港)     | zh-hk    |
| 英语(美国)         | en-us    |
| 英语(全球)         | en-ww    |
| 英语(澳大利亚)     | en-au    |
| 英语(芬兰)         | en-fi    |
| 英语(丹麦)         | en-dk    |
| 英语(以色列)       | en-il    |
| 英语(南非)         | en-za    |
| 英语(挪威)         | en-no    |
| 英语(新西兰)       | en-nz    |
| 英语(菲律宾)       | en-ph    |
| 英语(马来西亚)     | en-my    |
| 韩文(韩国)         | ko-kr    |
| 荷兰语(荷兰)       | nl-nl    |
| 葡萄牙语(葡萄牙)   | pt-pt    |
| 法语(法国)         | fr-fr    |
| 法语(瑞士)         | fr-ch    |
| 法语(加拿大)       | fr-ca    |
| 西班牙语(西班牙)   | es-es    |
| 西班牙语(美国)     | es-us    |
| 西班牙语(哥伦比亚) | es-co    |
| 德语(德国)         | de-de    |
| 德语(瑞士)         | de-ch    |
| 意大利语(意大利)   | it-it    |
| 挪威语(挪威)       | no-no    |
| 土耳其语(土耳其)   | tr-tr    |
| 斯洛文尼亚语       | sl-sl    |
| 瑞典语(瑞典)       | sv-se    |
| 繁体中文(台湾地区) | zh-tw    |
| 英语(香港)         | en-hk    |
| 英语(英国)         | en-gb    |
| 英语(加拿大)       | en-ca    |
| 英语(爱尔兰)       | en-ie    |
| 芬兰语(芬兰)       | fi-fi    |
| 丹麦语(丹麦)       | da-dk    |
| 希伯来语(以色列)   | he-il    |
| 英语(印度)         | en-in    |
| 英语(新加坡)       | en-sg    |
| 英语(印度尼西亚)   | en-id    |
| 英语(泰国)         | en-th    |
| 英语(阿拉伯)       | en-xa    |
| 日语(日本)         | ja-jp    |
| 荷兰语(比利时)     | nl-be    |
| 葡萄牙语(巴西)     | pt-br    |
| 法语(卢森堡)       | fr-lu    |
| 法语(比利时)       | fr-be    |
| 西班牙语(拉丁美洲) | es-la    |
| 西班牙语(阿根廷)   | es-ar    |
| 西班牙语(墨西哥)   | es-mx    |
| 西班牙语(波多黎各) | es-pr    |
| 德语(奥地利)       | de-at    |
| 俄语(俄罗斯)       | ru-ru    |
| 希腊语(希腊)       | el-gr    |
| 匈牙利语(匈牙利)   | hu-hu    |
| 捷克语(捷克共和国) | cs-cz    |
| 波兰语(波兰)       | pl-pl    |
| 西班牙语 (智利)    | es-cl    |

# Refs:

Language

- https://developer.android.google.cn/guide/topics/resources/providing-resources#AlternateResources
- https://www.cnblogs.com/bluestorm/archive/2013/04/01/2993554.html
- https://developer.android.google.cn/training/basics/supporting-devices/languages.html
- https://developer.android.google.cn/guide/topics/resources/multilingual-support
- https://lingohub.com/frameworks-file-formats/android-i18n-android-studio/

---

- [Support different screen sizes](https://developer.android.google.cn/training/multiscreen/screensizes)
- [Support different pixel densities](https://developer.android.google.cn/training/multiscreen/screendensities)
- [Declare restricted screen support](https://developer.android.google.cn/guide/practices/screens-distribution)
