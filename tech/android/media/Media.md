# Media

- formart
  音频：mp3,wav, 3gp  
  视频：mp4,3gp

# 1 [MediaPlayer](./1_MediaPlayer.md)

# 2 AudioEffect 音乐特效控制

MediaPlayer.getAudioSessionId()

```
AcousticEchoCanceler // 回声消除
AutomaticGainControl // 自动增益控制
NoiseSuppressor      // 噪音压制
Visualizer           // 示波器
Equalizer mEqualizer // 均衡器
private BassBoost    // 重低音
PresetReverb         // 预设的音场
```

# 3. SoundPool - Audio

## SoundPool vs MediaPlayer

- | MediaPlayer                | SoundPool |
  | -------------------------- | --------- | ----------------------------------------------- |
  | 适合                       | 长音乐    | 播放短促、密集的音乐：长也只能播放 5s，自动停止 |
  | CPU 资源占用率             | 较高      | 较低                                            |
  | 延迟时间                   | 较长      | 较短                                            |
  | 支持多个音频同时播放       | 不支持    | 支持                                            |
  | 设置播放优先级             | 不支持    | 支持                                            |
  | 设置音量                   | 支持      | 支持                                            |
  | loop                       | 支持      | 支持                                            |
  | 倍速播放                   | 支持      | 支持                                            |
  | AudioEffect（int soundId） | 支持      | 支持                                            |

- 由于内存限制，避免使用 SoundPool 来播放歌曲/背景音乐，只播放短促、密集音乐。
- SoundPool 同样有延迟。虽然比 MediaPlayer 效率高，但在性能低的手机，SoundPool 的延迟问题更严重。

# 4 VideoView

VideoView = SurfaceView + MediaPlayerControl + MediaPlayer + AudioManager（？）

# 5. SurfaceView

SurfaceView + MediaPlayer = Video

- 保持纵横比缩放到占满整个屏幕

```java
private void adjustSurfaceViewSize() {
    // 获取窗口管理器
    WindowManager wManager = getActivity().getWindowManager();
    DisplayMetrics metrics = new DisplayMetrics();
    // 获取屏幕大小
    wManager.getDefaultDisplay().getMetrics(metrics);
    // 设置视频保持纵横比缩放到占满整个屏幕


    ViewGroup.LayoutParams LayoutParams = surfaceView.getLayoutParams();
    viewHeight = mPlayer.getVideoHeight() * metrics.widthPixels / mPlayer.getVideoWidth();
    LayoutParams.height=viewHeight;
    surfaceView.setLayoutParams(LayoutParams);
}
```

```
videoWidth      viewWidth
___________ =  ___________
videoHeight        ?
```

# 6 MediaRecorder

- record audio
- record video
- https://www.cnblogs.com/whoislcj/p/5583833.html

# 7 [ExoPlayer](../libs/ExoPlayer/Readme.md)

# FAQ

## [FAQ-1] 如何任何情况下能显示 Icon？ 例如： 当 video 是白色时，白色 Icon 也能显出出来？

Fix ：
FaqPlayerControllerPlayerActivity.java

方法 1 ： Controller 加暗色的透明色
方法 2 ： Controller 的 Icon btn 把暗色的透明色

## [FAQ-2] 正中间的 Play Icon 遮住了正中间的 Loading Icon？

Fix ：  
两个层的 layer，盖住没有问题
参考 youtube

## [FAQ-3] 点击事件穿透

faq_penetrate_click.xml

```
Top：android:clickable="false"
下面一层： android:clickable="true" (或设置Click 事件，设置该事件后，android:clickable="true" )
```
