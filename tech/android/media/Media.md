# Media
- formart
音频：mp3,wav, 3gp  
视频：mp4,3gp

# 1 MediaPlayer Play Audio
- android `MediaController`
- MediaPlayer 主要用于播放音频，没有提供图像输出界面。播放视频时，借助于SurfaceView显示MediaPlayer播放视频的图像输出。
-  MediaPlayer.setDataSource() vs MediaPlayer.prepare()    
MediaPlayer.setDataSource():绑定资源，尚未真正去加载   
MediaPlayer.prepare()：真正装载好

- MediaPlayer.stop X MediaPlayer.start.
`MediaPlayerNative: Attempt to call getDuration in wrong state: mPlayer=0x0, mCurrentState=0`

## Play Audio

## Play Vidio

## MediaPlayer API
```
// 文件来源：    
// 1) res/raw
MediaPlayer.create(Context, R.raw.rawId)// no MediaPlayer.prepare()/prepareAsync()
// 2) assert
MediaPlayer.setDataSource(FileDescriptor)
// 3) sdcard  
MediaPlayer.setDataSource(String path)
// 4) network  -  buffer  
MediaPlayer.setDataSource(Context, Uri)
MediaPlayer.create(Context, Uri)

Uri:
Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.mp3_1.mp3);
Uri.parse("https://yingvickycao.github.io/mp3/mp3.mp3")

MediaPlayer.start()
MediaPlayer.pause()

// 使用很少。只有当该资源不再播放，才会停止播放。
MediaPlayer.stop()

MediaPlayer.reset();
MediaPlayer.release();
MediaPlayer.seekTo(int);

// 倍速播放
Playbackparams p = MediaPlayer.getPlaybackparams();
p.setSpeed(float speed);
MediaPlayer.setPlaybackparams(p);

// When SurfaceView is destroy
MediaPlayer.setPlay(SurfaceHolder)
MediaPlayer.setScreenOnWhilePlaying(bool);

MediaPlayer.getVideoWidth();
MediaPlayer.getVideoHeight();

MediaPlayer.setOnBufferingUpdateListener(this);
MediaPlayer.setOnCompletionListener(this);
MediaPlayer.setOnErrorListener(this);
MediaPlayer.setOnSeekCompleteListener(this);
MediaPlayer.setOnPreparedListener(this);  => MediaPlayer.start(()

// Depressed
// MediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC)
AudioAttributes.Builder builder = new AudioAttributes.Builder();
builder.setLegacyStreamType(AudioManager.STREAM_MUSIC);
MediaPlayer.setAudioAttributes(builder.build());

MediaPlayer.isPlaying()

MediaPlayer.isLooping()
MediaPlayer.setLoop(bool)

MediaPlayer.prepare()
MediaPlayer.prepareAsync() // Recommended

// 缓冲进度
MediaPlayer.setOnBufferingUpdateListener(this)
@Override
public void onBufferingUpdate(MediaPlayer mp, int percent) {
    Log.d(TAG, "onBufferingUpdate: percent=" + percent);
    mCurrentBufferPercentage = percent;
}
// Total time
MediaPlayer.getDuration()
// Current time
MediaPlayer.getCurrentPosition()
// 第一播放进度
long pos = 0~10 = 100L * MediaPlayer.getCurrentPosition() / MediaPlayer.getDuration()
Progress.setProgress((int) pos)
// 第二缓冲进度
Progress.setSecondaryProgress(mCurrentBufferPercentage)
```
## TBD: seekbar -> MediaPlayer.seekTo(int)没有效果

# 2 AudioEffect音乐特效控制
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
- | MediaPlayer | SoundPool
---     |---        |---
适合 | 长音乐 | 播放短促、密集的音乐：长也只能播放5s，自动停止
CPU资源占用率 | 较高 | 较低
延迟时间 | 较长 | 较短
支持多个音频同时播放 | 不支持 | 支持
设置播放优先级 | 不支持 | 支持 
设置音量 | 支持 | 支持 
loop | 支持 | 支持 
倍速播放  | 支持 | 支持
AudioEffect（int soundId）  | 支持 | 支持

- 由于内存限制，避免使用SoundPool来播放歌曲/背景音乐，只播放短促、密集音乐。   
- SoundPool同样有延迟。虽然比MediaPlayer效率高，但在性能低的手机，SoundPool的延迟问题更严重。

# 4 VideoView
VideoView = SurfaceView + MediaPlayerControl + MediaPlayer + AudioManager（？）

# 5. SurfaceView  
SurfaceView + MediaPlayer = Video              
- 保持纵横比缩放到占满整个屏幕
```
private void adjustSurfaceViewSize() {
    // 获取窗口管理器
    WindowManager wManager = getActivity().getWindowManager();
    DisplayMetrics metrics = new DisplayMetrics();
    // 获取屏幕大小
    wManager.getDefaultDisplay().getMetrics(metrics);
    // 设置视频保持纵横比缩放到占满整个屏幕
    surfaceView.setLayoutParams(new RelativeLayout.LayoutParams(metrics.widthPixels, mPlayer.getVideoHeight() * metrics.widthPixels / mPlayer.getVideoWidth()));
    }
```
# 6 MediaRecorder
- record audio
- record video
- https://www.cnblogs.com/whoislcj/p/5583833.html

