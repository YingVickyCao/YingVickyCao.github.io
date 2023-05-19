# MediaPlayer

- android `MediaController`
- MediaPlayer 主要用于播放音频，没有提供图像输出界面。播放视频时，借助于 SurfaceView 显示 MediaPlayer 播放视频的图像输出。
- MediaPlayer.setDataSource() vs MediaPlayer.prepare()  
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
