# HTML5

http://www.w3school.com.cn/tags/tag_input.asp  
http://www.w3school.com.cn/jsref/dom_obj_email.asp

- 为什么会有 html5 元素？  
  （1）明确表示用途和语义。  
  （2）在工具上，e.g., 浏览器、屏幕器阅读器，更明智地确定如何处理页面的不同部分。

- 较早的浏览器不支持新的 HTML5 元素，所以一定知道主要用户使用哪些浏览器访问你的 Web 页面，除非确保新元素对你的用户适用，否则不要贸然使用这些新元素。
  https://caniuse.com/?search=new%20elements

# 1 html5 input

- `<input type="search">`
- `<input type="datetime">` Input Date => android date pickers
- `<input id="dateInput" type="date" value="2014-06-01">`  
  http://www.w3school.com.cn/jsref/dom_obj_date.asp  
  http://www.w3school.com.cn/tags/tag_input.asp

- `<input type="range">`  
  `<input id="rangeInput" type="range">`
  [0,100]
  http://www.w3school.com.cn/jsref/dom_obj_range.asp  
  http://www.w3school.com.cn/tags/tag_input.asp

- `<input type="email">` => android EditText, inputType="email
- `<input id="firstEmail" type="email" value="first.w3c@example.com">`  
  http://www.w3school.com.cn/jsref/dom_obj_email.asp

- `<input type="url">` => android EditText, inputType="url"  
  `<input type="url" value="http://www.w3school.com.cn/">`  
   http://www.w3school.com.cn/tags/index.asp  
   http://www.w3school.com.cn/jsref/dom_obj_url.asp

- `<input type="number">` => android EditText, inputType="number"  
  `<input type="number" value="105">`  
   http://www.w3school.com.cn/tags/index.asp  
   http://www.w3school.com.cn/jsref/dom_obj_number.asp

# 2 `<video>` 播放视频

```html
<!--
        controls : 提供操作的控件。不同浏览器提供的控件有所不同。

        autoplay : 一旦页面，有了足够的数据就自动开始播放。视频网站加入这个属性不错，一般网站不需要。通常，用户希望参与决定加载页面是否播放视频。
        bug：即使设置了autoplay，第一次不会自动播放，只能通过点击播放按钮才能播放。
        fixed：使用muted。

        width/height：页面中视频显示区的宽度和高度。如果设置了poster，海报图像也会缩放到指定的宽度和高度。视频也会保持其宽高比缩放，当边有多余的空间时，视频会采用上下或左右加黑边的模式来适应显示区大小，这样浏览器就不用时时缩放视频了。
        poster：海报图像。视频未播放时，显示这个图片。通常，浏览器显示视频的第一帧，往往此时显示的是一个黑屏。通过设置poster，用这个特定的图像来消除短暂的黑屏显示。

        preload 用于细粒度地控制视频如何加载，来实现优化。大多数情况下，浏览器会根据是否设置autoplay以及用户的带宽来选择加载多少视频。
        preload="auto":让浏览器来决定。  
        preload="none":在用户真正“播放”视频之前不下载视频。  
        preload="metadata":下载视频元数据，但不下载视频内容。  
    -->
<!-- <video muted controls autoplay src="../resources/video/tweetsip.webm"  width="288" height="288"
        poster="../resources/images/blue.jpg">
    </video> -->

<video
  muted
  controls
  autoplay
  width="512"
  height="288"
  poster="../resources/images/blue.jpg"
>
  <!-- 使用source标记，包含不同格式的视频版本。
        浏览器从上到下查找，直到找到它能播放的一种格式。
        -->
  <source src="../resources/video/tweetsip.webm" />
  <source src="../resources/video/tweetsip.ogv" />
  <source src="../resources/video/tweetsip.mp4" />
  <!-- 如果浏览器不支持视频，就显示这个文本。 -->
  <p>Sorry,your broswer doesn't support the video element</p>
</video>

<video
  muted
  controls
  autoplay
  width="512"
  height="288"
  poster="../resources/images/blue.jpg"
>
  <!-- 
        type属性: 可选，提供视频的MIME类型（容器格式）。它向浏览器提供一个提示，帮助它确定是否播放这种文件。
        codecs参数：可选，"视频编解码器，音频编解码器"
        -->
  <source
    src="../resources/video/tweetsip.webm"
    type='video/mp4;codecs="acv1.42E01,mp4a.40.2"'
  />
  <source
    src="../resources/video/tweetsip.ogv"
    type='video/ogg;codecs="theora,vorbis"'
  />
  <source
    src="../resources/video/tweetsip.mp4"
    type="video/webm;codecs=vp8,vorbis"
  />
  <!-- 当所有source 都不支持时，将播放Flash视频 -->
  <!-- <object>...</object> -->
  <p>Sorry,your broswer doesn't support the video element</p>
</video>
```

- `poster`属性 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。
- `width` 和 `height` 属性  
  http://www.w3school.com.cn/tags/tag_video.asp

![video_width_height.jpg](https://yingvickycao.github.io/img/html/video_width_height.jpg)

https://en.wikipedia.org/wiki/HTML5_video

- 要提供多个视频源文件，确保用户可以在它们的浏览器中观看视频文件。
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

- Web 上的视频格式相当混乱。
  视频格式是什么？
  一个视频文件包含两个部分：视频部分，音频部分。每个部分使用一种特定的编码类型来编码（这样可以缩小数据大小，更高效地播放）：
  视频部分 - 视频编码；
  音频部分 - 音频编码。

  包含视频和音频编码的文件，称为容器（container）。它有自己的格式和格式名。  
  容器是用来包含视频、音频和元数据信息的文件格式。  
  视频没有标准编码。常用的容器格式，包括：MP4、WebM、Ogg 和 Flash Video。

  | 浏览器        | 欢迎哪种视频容器格式 |
  | ------------- | -------------------- |
  | Safari        | H.264(.mp4)          |
  | Chrome        | WebM(.webm)          |
  | Firefox/Opera | (.ogv)               |

  编解码器（codec）是用来指定一种特定视频或音频编码完成编码和解码的软件。流行的 Web 编码器包括：H.264、VP8、Theora、AAC 和 Vorbis。

  要由浏览器决定可以对哪种格式的视频解码，不过并不是所有浏览器制造商都达成了一致，所以若想要支持所有视频，就需要多种编码。

  ![video_format_1.jpg](https://yingvickycao.github.io/img/html/video_format_1.jpg)

  ![video_format_2.jpg](https://yingvickycao.github.io/img/html/video_format_2.jpg)

- 对于 HTML 视频，每个浏览器中提供的控件都不同。在不同的浏览器和操作系统上，外观和表现不同，因为工作方式不同。  
  HTML 视频规范允许采用任何视频格式。具体支持哪些格式由浏览器实现来确定。

  http://www.w3school.com.cn/html5/html_5_audio.asp  
   http://www.w3school.com.cn/jsref/dom_obj_audio.asp  
   http://www.w3school.com.cn/tags/tag_audio.asp  
   http://www.w3school.com.cn/tags/att_audio_preload.asp

# 3 `<audio>` 播放音频

音频也没有标准编码。流行的 3 格式格式：MP3、WAV 和 Ogg Vorbis。  
每个浏览器的控件外观各自不同。  
不同的浏览器上对这些格式的支持会有所不同。

# 4 <ruby> 标注读音 => 汉语

定义 ruby 注释。  
http://www.w3school.com.cn/html5/tag_ruby.asp
http://www.w3school.com.cn/html5/tag_rt.asp
http://www.w3school.com.cn/html5/tag_rp.asp
http://www.w3school.com.cn/html5/html5_reference.asp

# 5 <rt> 标注的读音=> 汉语中 han yu

定义 ruby 注释的解释。

# 6 `<details>` 定义元素的细节

目前只有 Chrome 支持 `<details>` 标签。  
http://www.w3school.com.cn/html5/html5_reference.asp  
http://www.w3school.com.cn/html5/tag_details.asp

# 7 `<summary>` 定义 details 元素的标题。

http://www.w3school.com.cn/html5/html5_reference.asp  
http://www.w3school.com.cn/html5/tag_details.asp

# 8 `<time>` 日期/时间 -> android TextView show date or timn wit id.

时间/日期/日期时间

以机器可读的方式对日期和时间进行编码，这样，举例说，用户代理能够把生日提醒或排定的事件添加到用户日程表中，搜索引擎也能够生成更智能的搜索结果。  
http://www.w3school.com.cn/html5/tag_time.asp

# 9 `<progress>` 进度 => android ProgressBar `style=“?android:attr/progressBarStyleHorizontal”`

http://www.w3school.com.cn/html5/tag_progress.asp

# 10 `<mark>` 带有记号的文本 => android textview , background

在需要突出显示文本时使用

- http://www.w3school.com.cn/html5/tag_mark.asp

# 11 section vs article

section:区块，用于内容分组。
article：文章，用于表示独立的内容。

通用型：  
`article < section < div`

# 12 aside

表示主内容旁边的内容，比如边栏或引用。

# 13 footer

定义一个区块的底部或整个文档的页脚。

# 14 header

首部的区块，或 整个文档的页眉。

# 15 meter

显示一个范围的度量。

# 16 canvas

在页面中显示用 Javascript 绘制的图像和动画。

# 17 nav

把网站中用于导航的所有链接组织在一起。

# 18 figure

定义类似照片、图表甚至代码清单等独立的内容。

# 19 HTML 5 Web 存储

HTML5 提供了两种在客户端存储数据的新方法：  
 `localStorage` - 没有时间限制的数据存储  
 `sessionStorage` - 针对一个 session

## localStorage

- localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。

## sessionStorage

- sessionStorage 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。

# 20 变换和过渡。

animation.html

# 21 定位
将页面与Google Maps集成，允许用户实时地跟踪他们的移动轨迹。

# 22 Web工作线程
使用Web工作线程来完成复杂的计算，可以提高JS代码的效率，并充分利用多核处理器。

# 23 使用JS完成视频处理。
创建特效，甚至可以直接处理视频元素。