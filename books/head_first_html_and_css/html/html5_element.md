# HTML5

##

- http://www.w3school.com.cn/tags/tag_input.asp
- http://www.w3school.com.cn/jsref/dom_obj_email.asp

## html5 input

### search

### `<input type="search">`

### `<input type="datetime">` Input Date => android date pickers

- `<input id="dateInput" type="date" value="2014-06-01">`
- http://www.w3school.com.cn/jsref/dom_obj_date.asp
- http://www.w3school.com.cn/tags/tag_input.asp

### `<input type="range">`

- `<input id="rangeInput" type="range">`
- [0,100]
- http://www.w3school.com.cn/jsref/dom_obj_range.asp
- http://www.w3school.com.cn/tags/tag_input.asp

### `<input type="email">` => android EditText, inputType="email

`<input id="firstEmail" type="email" value="first.w3c@example.com">`

- http://www.w3school.com.cn/jsref/dom_obj_email.asp

### `<input type="url">` => android EditText, inputType="url"

- `<input type="url" value="http://www.w3school.com.cn/">`
- http://www.w3school.com.cn/tags/index.asp
- http://www.w3school.com.cn/jsref/dom_obj_url.asp

### `<input type="number">` => android EditText, inputType="number"

- `<input type="number" value="105">`
- http://www.w3school.com.cn/tags/index.asp
- http://www.w3school.com.cn/jsref/dom_obj_number.asp

## `<video>` 播放音频

- `poster`属性 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。
- `width` 和 `height` 属性
- http://www.w3school.com.cn/tags/tag_video.asp

## `<audio>` 播放音频

- 大多数音频是通过插件（比如 Flash）来播放的。然而，并非所有浏览器都拥有同样的插件。audio 元素能够播放声音文件或者音频流。
- Audio 元素支持三种格式：ogg Vorbis、mp3、wav
- 必须含有`controls="controls"`属性，否则，不会显示播放界面。
- [audio/video] 元素允许多个 source 元素。  
  source 元素可以链接不同的音频文件。  
  浏览器将使用第一个可识别的格式。  
  source 元素中的 type 可以省略 。

- [audio/video]属性 值 描述  
  autoplay autoplay 如果出现该属性，则音频在就绪后马上播放。  
  controls controls 如果出现该属性，则向用户显示控件，比如播放按钮。  
  loop loop 如果出现该属性，则每当音频结束时重新开始播放。  
  muted muted 规定视频输出应该被静音。即默认初始音量为静音。但可以通过调大  音量  来播放.
  preload preload 如果使用 "autoplay"，则忽略该属性。如果出现该属性，则音频在页面加载时进行加载，并预备播放。  
  src url 要播放的音频的 URL。

- [audio/video]`preload="metadata"` 规定是否预加载音频
  可能的值：  
  auto - 当页面加载后载入整个音频  
  meta - 当页面加载后只载入元数据  
  none - 当页面加载后不载入音频

- http://www.w3school.com.cn/html5/html_5_audio.asp
- http://www.w3school.com.cn/jsref/dom_obj_audio.asp
- http://www.w3school.com.cn/tags/tag_audio.asp
- http://www.w3school.com.cn/tags/att_audio_preload.asp

## HTML 5 Web 存储

- HTML5 提供了两种在客户端存储数据的新方法：  
  `localStorage` - 没有时间限制的数据存储  
  `sessionStorage` - 针对一个 session

### localStorage

- localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。

### sessionStorage

- sessionStorage 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。

## <ruby> 标注读音 => 汉语

- 定义 ruby 注释。
- http://www.w3school.com.cn/html5/tag_ruby.asp
- http://www.w3school.com.cn/html5/tag_rt.asp
- http://www.w3school.com.cn/html5/tag_rp.asp
- http://www.w3school.com.cn/html5/html5_reference.asp

## <rt> 标注的读音=> 汉语中 han yu

- 定义 ruby 注释的解释。

## `<details>` 定义元素的细节

- 目前只有 Chrome 支持 <details> 标签。
- http://www.w3school.com.cn/html5/html5_reference.asp
- http://www.w3school.com.cn/html5/tag_details.asp

## `<summary>` 定义 details 元素的标题。

- http://www.w3school.com.cn/html5/html5_reference.asp
- http://www.w3school.com.cn/html5/tag_details.asp

## `<time>` 日期/时间 -> android TextView show date or timn wit id.

- 以机器可读的方式对日期和时间进行编码，这样，举例说，用户代理能够把生日提醒或排定的事件添加到用户日程表中，搜索引擎也能够生成更智能的搜索结果。
- http://www.w3school.com.cn/html5/tag_time.asp

## `<progress>` 进度 => android ProgressBar `style=“?android:attr/progressBarStyleHorizontal”`

- http://www.w3school.com.cn/html5/tag_progress.asp

## `<mark>` 带有记号的文本 => android textview , background

- 在需要突出显示文本时使用
- http://www.w3school.com.cn/html5/tag_mark.asp
