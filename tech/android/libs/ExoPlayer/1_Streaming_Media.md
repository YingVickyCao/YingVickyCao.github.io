# 流媒体

# 1 优势

- 体积更小
  | Value | Desc |
  | -------- | ------- |
  | hls.m3u8 | 2 kb |
  | mp4.mp4 | 33.5 mb |
  | mp3.mp3 | 3.4 mb |
- seek to 后，直接到对应位置，不用下载多余的部分
- 真正播放的内容存在服务器
- 自适应：根据网络情况，自动调整清晰度
- 大规模用户接入
- 适合直播、点播
- 内容版权保护
  内存中维持一个较小的解码缓冲区，播放后得的媒体数据能随时清除，用户不容易截取和复制。
  可利用 DRM 等版权保护系统进行加密处理。

# 2 劣势

- 下载实现很复杂，而且很多格式不支持下载

# 3 流媒体传输协议

| 协议             | Smooth Streaming | Http Live Steaming | Dash     |
| ---------------- | ---------------- | ------------------ | -------- |
| 规范             | Microsoft        | Apple              | Adobe    |
| 协议             | HTTP             | HTTP               | HTTP     |
| 最常见媒体格式   | MP4              | TS (MTS/MPEG-TS)   | mp4/3GP  |
| 建议切片时间     | 2s               | 10s                | 灵活切片 |
| 服务器端平均时延 | 必须连续         | 可分割             | 可分割   |
| 服务器类型       | MS IIS           | HTTP               | HTTP     |
| 常见使用         |                  | Apple              | YouTube  |

- 直播协议
  | Types | 使用场景 | 使用什么协议传输 |
  | -------- | --------------------------- | ---------------- |
  | RTMP | 点播。FlashPlayer | TCP |
  | HTTP | |HTTP
  | HLS | | HTTP |
  | Dash | |-
  | RTP | 视频监控、视频会议、IP 电话 | UDP |
  | HTTP-FLV | | HTTP |

- RTP
  Real-time Transport Protocol，传输层协议。
  实际应用场景下经常需要 RTCP（RTP Control Protocol）配合来使用，可以简单理解为 RTCP 传输交互控制的信令，RTP 传输实际的媒体数据。
  视频监控、视频会议、IP 电话

- RTMP
  RTMP 是 Real Time Messaging Protocol（实时消息传输协议）
  RTMP 是 Real 是一个协议族，包括 RTMP 基本协议及 RTMPT/RTMPS/RTMPE 等多种变种。
  属于 TCP/IP 四层模型的应用层
  私有协议，Adobe。
  rtmp 现在大部分国外的 CDN 已不支持，在国内流行度很高

- What is Adaptive Steaming？
  自适应流媒体

  如何选择自适应技术？
  平台、协议、数字版权管理

- 推流 / 拉流
  推流，指的是把采集阶段封包好的内容传输到服务器的过程。推流端->服务器
  拉流：服务器 -> CDN -> 播放端
- Dash （MPEG-Dash）is short for `Dynamic Adaptive Steaming Over HTTP`, is an adaptive bitrate steaming.

# 4 专业术语

- .TS =MPEG-TS=MPEG2-TS = MTS = MPEG transport stream = transport stream
  .TS is an mpeg-2 or h.264 stream.
- MP4 =MPEG 4 container.
- .m2ts is an MPEG2 transport stream,not h.264
- MPEG-2 标准(TS,PS)
  TS：传输流
  PS:节目流
- MPEG
  是一种压缩标准。分为 MPEG layer 1、MPEG layer 2、MPEG layer 3.
- MP3
  is short for `MPEG layer 3 / MPEG audio layer 3`
  一种有损的音频格式
- WAV
  一种无损的音频格式
- normal mp4 vs fmp4?
  mp4 = Non-Fragmented MP4.
  含义是 MPEG-4 Part14，是 MPEG 标准中的 14 部分

  fmp4 = Fragmented MP4 = FFMpeg MPEG-4。
  MPEG-4 Part12。
  是 Dash 采用的媒体文件格式。
  扩展名通常为.m4s/.mp4

- .mpd
  Media Presentation Descriptor file

- 容器格式？
  播放一个电影，就是至少播放一个视频流和一个音频流。
  打包视频流、音频流、字幕、以及其他信息到一个文件，这个文件就叫容器格式。
- 字幕文件
  格式：WebVTT,SRT,TTML,Close Caption(为听力障碍设计)
- Close Caption（CC 字幕）
  隐藏的带有解释意味的字幕（CAPTION），为听力障碍设计
  作用：无音状态下通过进行一些解释性的语言来描述当前画面中所发生的事情。

- Subtitle
  对话翻译，一般的字幕。
  为了翻译成不同的语言而设计。

- 版权保护策略
  `Widevine`：
  Google 在 ICS 版本上推出的一种 `DRM 数字版权管理`功能：从 Google 指定的服务器上，下载 Google 加密的版权文件，例如视频等。

  PlayReady：微软，e.g, PlayReady SL2000

  ClearKey

  Flash Access:Adobe

- Progressive?
  渐进式。
  需要先缓冲一定数量的媒体数据才能开始播放。e.g, Mp4

- Track
  Adaptive streams normally contain multiple media tracks.
  There are often multiple tracks that contain same content in different qualities(e.g, SD,HD, and 4K video tracks).
  There may alse be multiple tracks of the same type containing different content(e.g, multiple audio tracks in different languages)

  总结：
  同内容，不同分辨率；
  同内容，同分辨率，语言不同
  同内容，同分辨率，字幕不同
  Audio and video

![adaptive_streams_track_text](https://yingvickycao.github.io/img/adaptive_streams_track_text.png)

![adaptive_streams_track_audio](https://yingvickycao.github.io/img/adaptive_streams_track_audio.png)

![adaptive_streams_track_video](https://yingvickycao.github.io/img/adaptive_streams_track_video.png)

- IMA
  Interactive Media Ads SDKs.
  互动媒体广告：点击跳转；X 等
