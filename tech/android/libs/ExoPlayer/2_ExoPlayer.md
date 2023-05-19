# Exoplayer

https://github.com/google/Exoplayer  
[Test Code of Exoplayer](https://github.com/YingVickyCao/android-about-demos/tree/master/app/src/main/java/com/hades/example/android/test_libs/exoplayer2)

- Version

| Exoplayer Version | Support Lib         |
| ----------------- | ------------------- |
| 2.9.6             | com.android.support |
| `>` 2.9.6         | androidx            |

| exoplayer (All)          | Part     |
| ------------------------ | -------- |
| exoplayer-core           | Required |
| exoplayer-dash           | Optional |
| exoplayer-hls            | Optional |
| exoplayer-smothstreaming | Optional |
| exoplayer-ui             | Optional |

- ExoPlayer instances must be accessed from a single application thread.
- 测试  
  https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/

## 1.1 Get time

| Without Ads           | If not have Ads,equal. <br/>If have, about current content | ms                   |
| --------------------- | ---------------------------------------------------------- | -------------------- |
| getDuration()         | getContentDuration()                                       | 获取视频总时长       |
| getCurrentPosition()  | getContentPosition()                                       | 获取视频当前播放时间 |
| getBufferedPosition() | getContentBufferedPosition()                               | 获取视频缓冲时间     |

## 1.2 Log

### Online video mp4, player.setPlayWhenReady(true)

```

onPlayerStateChanged: playWhenReady=true,state=STATE_IDLE,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=128161,with=1920

// Pause
onPlayerStateChanged: playWhenReady=false,state=STATE_READY,duration=128161,with=1920

// Resume
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=128161,with=1920

// Seek
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=128161,with=1920
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=128161,with=1920

// Complete
onPlayerStateChanged: playWhenReady=true,state=STATE_ENDED,duration=128161,with=1920
```

### Downloaded video mp4, player.setPlayWhenReady(true)

```
onPlayerStateChanged: playWhenReady=true,state=STATE_IDLE,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=214274,with=860

// Pause
onPlayerStateChanged: playWhenReady=false,state=STATE_READY,duration=214274,with=860

// Resume
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=214274,with=860

// Seek
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=214274,with=860
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=214274,with=860

// Complete
onPlayerStateChanged: playWhenReady=true,state=STATE_ENDED,duration=214274,with=860
```

### Downloaded video mp4, player.setPlayWhenReady(false);

```
onPlayerStateChanged: playWhenReady=false,state=STATE_BUFFERING,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=false,state=STATE_READY,duration=214274,with=860
```

### Online mp3, player.setPlayWhenReady(true)

```
onPlayerStateChanged: playWhenReady=true,state=STATE_IDLE,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=59271,with=0

// Pause
onPlayerStateChanged: playWhenReady=false,state=STATE_READY,duration=59271,with=0

// Resume
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=59271,with=0

// Seek
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=59271,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=59271,with=0

// Complete
onPlayerStateChanged: playWhenReady=true,state=STATE_ENDED,duration=59271,with=0
```

### Downloaded mp3, player.setPlayWhenReady(true)

```
onPlayerStateChanged: playWhenReady=true,state=STATE_IDLE,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=198452,with=0

// Pause
onPlayerStateChanged: playWhenReady=false,state=STATE_READY,duration=198452,with=0
// Resume
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=198452,with=0

// Seek
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=198452,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=198452,with=0

// Complete
onPlayerStateChanged: playWhenReady=true,state=STATE_ENDED,duration=198452,with=0
```

### HLS, player.setPlayWhenReady(true)

```
onPlayerStateChanged: playWhenReady=true,state=STATE_IDLE,duration=-9223372036854775807,with=0
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=-9223372036854775807,with=0
// Before STATE_READY, EndTime has arleady showed.
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=1800000,with=400

// Pause
onPlayerStateChanged: playWhenReady=false,state=STATE_READY,duration=1800000,with=400

// Resume
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=1800000,with=400

// Seek
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=1800000,with=400
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=1800000,with=400

// Complete
onPlayerStateChanged: playWhenReady=true,state=STATE_ENDED,duration=1800000,with=400
```

## 1.2 When can player.getDuration() returning true value?

When onTimelineChanged invorked.

## 1.4 When can get video width or height? or When video is prepared welll to play, and can set SurfaceView?

Way 1 ： onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=1800000,with=400

Condition : state=STATE_READY && duration > 0 && with/height > 0

```java
  public void setPlayer(@Nullable Player player) {
    Assertions.checkState(Looper.myLooper() == Looper.getMainLooper());
    Assertions.checkArgument(
        player == null || player.getApplicationLooper() == Looper.getMainLooper());
    if (this.player == player) {
      return;
    }
    @Nullable Player oldPlayer = this.player;
    if (oldPlayer != null) {
      oldPlayer.removeListener(componentListener);
      @Nullable Player.VideoComponent oldVideoComponent = oldPlayer.getVideoComponent();
      if (oldVideoComponent != null) {
        oldVideoComponent.removeVideoListener(componentListener);
        oldVideoComponent.clearVideoSurfaceView((SurfaceView) surfaceView);
      }
    }
    this.player = player;
    if (useController()) {
      controller.setPlayer(player);
    }
    if (player != null) {
      @Nullable Player.VideoComponent newVideoComponent = player.getVideoComponent();
        newVideoComponent.setVideoSurfaceView((SurfaceView) surfaceView);
        newVideoComponent.addVideoListener(componentListener);
      }
      player.addListener(componentListener);
    }
  }
```

Way 2 : onVideoSizeChanged

```
// Init
onPlayerStateChanged: playWhenReady=true,state=STATE_IDLE,duration=-9223372036854775807,with=0,height=0
onAudioFocusChange: AUDIOFOCUS_GAIN
onPlayerStateChanged: playWhenReady=true,state=STATE_BUFFERING,duration=-9223372036854775807,with=0,height=0
onSurfaceSizeChanged: width=1600,height=2398,duration=-9223372036854775807,with=0,height=0

// Play
onVideoSizeChanged: width=1920,height=1080,duration=1800045,with=1920,height=1080
onSurfaceSizeChanged: width=1600,height=900,duration=1800045,with=416,height=234
onRenderedFirstFrame:,duration = 1800045, with = 416,height=234
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=1800045,with=416,height=234

// Seek
onRenderedFirstFrame:,duration = 1800045, with = 416,height=234
onRenderedFirstFrame:,duration = 1800045, with = 416,height=234
onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=1800045,with=416,height=234

// Back
onSurfaceSizeChanged: width=0,height=0,duration=1800045,with=416,height=234
onPlayerStateChanged: playWhenReady=false,state=STATE_BUFFERING,duration=1800045,with=416,height=234
```

- onRenderedFirstFrame  
  可以调用多次。  
  调用在 onPlayerStateChanged state=STATE_READY 之前。
- onVideoSizeChanged  
  调用 1 次

## 1.5 When can get audio duration ?

onPlayerStateChanged: playWhenReady=true,state=STATE_READY,duration=1800000,with=400

Condition : state=STATE_READY && duration

## 1.6 MediaPlayer -> ExoPlayer, how to listen onPrepare()?

ExoPlayer release-v2 not have onPrepare().

## 1.7 Player state changes

```java
player.addListener(new PlayerEventListener()); // Player.EventListener

public void onPlayerStateChanged(boolean playWhenReady, @Player.State int playbackState)
```

| Value           | Desc                                                    |
| --------------- | ------------------------------------------------------- |
| STATE_IDLE      | Not have any media to play / failure                    |
| STATE_BUFFERING | load more data to be able to play from current position |
| STATE_READY     | play / pause (getPlayWhenReady() = true/false)          |
| STATE_ENDED     | finish playing media                                    |

## 1.8 Player errors

```java

player.addListener(new PlayerEventListener()); // Player.EventListener
// Case 1 :
class PlayerEventListener implements Player.EventListener{
    public void onPlayerError(ExoPlaybackException e){
    }
}

// Case 2 :
class PlayerEventListener implements Player.EventListener{
    void onTracksChanged(TrackGroupArray trackGroups, TrackSelectionArray trackSelections){
    }
}


// Case 3:
private class PlayerErrorMessageProvider implements ErrorMessageProvider<ExoPlaybackException> {
    @Override
    public Pair<Integer, String> getErrorMessage(ExoPlaybackException e) {
        // ...
    }
}
```

STATE_IDLE + mError is not null -> play failure occurs

## 1.9 Seeking

```java
player.seekTo(long positionMs); // For simple
/
player.seekTo(int windowIndex, long positionMs) // For With ads / simple
/
com.google.android.exoplayer2.ControlDispatcher controlDispatcher.dispatchSeekTo(player, windowIndex, positionMs) //  For With ads / simple
```

```
// Seek when start
mPlayer.seekTo(startWindow, startPosition);
mPlayer.prepare(mediaSource,false, false);
```

## 1.10 Log for debugging playback issues

By default ExoPlayer only logs errors.  
How to see detail logs:

```
// In Debug mode
player.addAnalyticsListener(new EventLogger(trackSelector));
```

## 1.11 Next track listener

```java
@Override
public void onPositionDiscontinuity(int reason) {
    if (null == mPlayer) {
        return;
    }
    int newIndex = mPlayer.getCurrentWindowIndex();
    if (newIndex != currentIndex) {
        // The index has changed, update the UI to show info for source at newIndex.
        Log.d(TAG, "onPositionDiscontinuity: currentIndex=" + currentIndex + ",newIndex=" + newIndex);
        currentIndex = newIndex;
    }
}
```

## 1.12 Change playback speed

```java
PlaybackParameters parameters = new PlaybackParameters(2f);
mPlayer.setPlaybackParameters(parameters);
```

## 1.13 Q:getCurrentPosition is bigger than getDuration?

A:  
media file has wrong media information.

## 1.14 TBD:[Timeline](https://exoplayer.dev/doc/reference/com/google/android/exoplayer2/Timeline.html)、[Window](https://exoplayer.dev/doc/reference/com/google/android/exoplayer2/Timeline.Window.html)、[Period](https://exoplayer.dev/doc/reference/com/google/android/exoplayer2/Timeline.Period.html)

Timeline:representation structure of media.  
e.g,compositions of media such as playlists,streams with inserted ads,live streams  
Timeline = Period + Window

## 1.15 MediaSource

| Type                   | Desc             |
| ---------------------- | ---------------- |
| AdsMediaSource         | Ads              |
| HlsMediaSource         | HLS              |
| SsMediaSource          | Smooth Streaming |
| DashMediaSource        | Dash             |
| ProgressiveMediaSource | Normal           |

## 1.18 add cookie

```java
public HttpDataSource.Factory buildHttpDataSourceFactory() {
        HttpDataSource.Factory factory =  new DefaultHttpDataSourceFactory(userAgent);
        HttpDataSource.RequestProperties requestProperties = factory.getDefaultRequestProperties();
        requestProperties.clear();
//        requestProperties.remove("Cookie");
        requestProperties.set("Cookie","k1=v1");
        requestProperties.set("Cookie","k2=v2");
        return factory;
    }
```

# TO DO

https://blog.csdn.net/zp0203/article/details/52181670

# Refs:

- https://github.com/google/Exoplayer
- https://exoplayer.dev/
- Interactive Media Ads SDKs  
  https://developers.google.com/interactive-media-ads/  
  https://developers.google.com/interactive-media-ads/docs/sdks/html5  
  https://developers.google.com/interactive-media-ads/docs/sdks/html5/tags
- [Google Cast - Use Media Tracks](https://developers.google.com/cast/docs/android_sender/media_tracks)
- [Supported media formats](https://developer.android.google.cn/guide/topics/media/media-formats#image-formats)
- [AudioManager](https://www.runoob.com/w3cnote/android-tutorial-audiomanager.html)
- [AudioFocus](https://developer.android.google.cn/guide/topics/media-apps/audio-focus#java)
