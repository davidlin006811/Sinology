import React, { PureComponent } from "react";
import $ from "jquery";
import { getMobileOperatingSystem } from "../../common";
import "./video.css";
import playProgressImg from "./image/play_progress.svg";
import loadingImg from "./image/loading.gif";
import fullScreenImg from "./image/full_screen.svg";
import playImg from "./image/play.svg";
import pauseImg from "./image/pause.svg";
import refreshImg from "./image/refresh.png";

class Video extends PureComponent {
  constructor(props) {
    super(props);
    this.OS = getMobileOperatingSystem();
    // this.isWeChatBrowser = isWechat();

    this.state = {
      isLandScape: false,
      videoEnd: false,
      isPlaying: false,
      fullScreen: false,
      current: 0,
      firstTime: true
    };
    this.mounted = true;
    this.lastTime = -1;
    this.tryTimes = 0;
    this.timer = null;
    this.hideMenuTimeout = null;
    this.isVideoBreak = null;
    this.orientationTimer = null;
    this.delayTimeToCheck = null;
    this.delayTimeToPlay = null;
    this.vid = null;
    this.dragEvent = null;
  }

  numberToTime = number => {
    let hours = parseInt(number / 3600, 10);
    let minutes = parseInt((number - hours * 3600) / 60, 10);
    let seconds = number - hours * 3600 - minutes * 60;
    let hourTxt = hours >= 10 ? hours : "0" + hours;
    let minuTxt = minutes >= 10 ? minutes : "0" + minutes;
    let secondTxt = seconds >= 10 ? seconds : "0" + seconds;
    return hourTxt + ":" + minuTxt + ":" + secondTxt;
  };
  //判读是否横屏
  isLandscape = () => {
    return window.orientation === 90 || window.orientation === -90;
  };
  showMenu = () => {
    // this.turnOnVolume();
    if (this.vid.get(0).paused) {
      this.vid.get(0).play();
      this.setState({
        isPlaying: true,
        videoEnd: false
      });
    } else {
      this.vid.get(0).pause();
      this.setState({
        isPlaying: false
      });
    }

    let menuBar = $("#videoNav-" + this.props.video.video_num);
    let controllBar = $("#videoContorl-" + this.props.video.video_num);

    menuBar.fadeIn();
    controllBar.fadeIn();
    let delayTime = this.isLandscape() ? 60000 : 10000;
    clearTimeout(this.hideMenuTimeout);
    this.hideMenuTimeout = setTimeout(() => {
      menuBar.fadeOut();
      controllBar.fadeOut();
    }, delayTime);
  };

  //设置时长
  setDuration = () => {
    if (this.mounted) {
      const duration = this.vid.get(0).duration;
      if (duration == null) {
        return;
      }
      let durationNum = parseInt(duration, 10);
      let durantionTime = this.numberToTime(durationNum);
      if (this.mounted) {
        this.setState({
          duration: durationNum,
          endTime: durantionTime
        });
      }
    }
  };
  //更新当前播放时间
  updateTime = () => {
    if (this.mounted) {
      let current = this.vid.get(0).currentTime;
      //  console.log("current: ", current);
      if (typeof current === "undefined") {
        return;
      }

      let currentNum = parseInt(current, 10);
      let currentTime = this.numberToTime(currentNum);
      if (this.mounted) {
        this.setState({
          current: currentNum,
          currentTime: currentTime
        });
      }
    }
  };

  //屏幕切换
  switchScreen = () => {
    if (this.isLandscape()) {
      return;
    }

    //if (!this.state.fullScreen) {
    if (this.vid.get(0).requestFullscreen) {
      this.vid.get(0).requestFullscreen();
    } else if (this.vid.get(0).mozRequestFullScreen) {
      /* Firefox */
      this.vid.get(0).mozRequestFullScreen();
    } else if (this.vid.get(0).webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.vid.get(0).webkitRequestFullscreen();
    } else if (this.vid.get(0).msRequestFullscreen) {
      /* IE/Edge */
      this.vid.get(0).msRequestFullscreen();
    }
    let menuBar = $("#videoNav-" + this.props.video.video_num);
    let controllBar = $("#videoContorl-" + this.props.video.video_num);
    menuBar.fadeOut();
    controllBar.fadeOut();
  };
  //播放切换
  accessPlay = () => {
    if (!this.vid.get(0).paused && !this.state.videoEnd) {
      this.vid.get(0).pause();
      this.setState({
        isPlaying: false
      });
    } else if (this.vid.get(0).paused && !this.state.videoEnd) {
      this.vid.get(0).play();
      this.setState({
        isPlaying: true,
        beginPlaying: true
      });
    } else if (this.vid.get(0).paused && this.state.videoEnd) {
      if (this.OS === "iOS") {
        this.playiOSVideo();
      } else {
        this.vid.get(0).pause();
        let source = document.getElementById(
          "videoSource-" + this.props.video.video_num
        );
        source.setAttribute("src", this.props.video.video_url);
        this.vid.get(0).load();
        this.vid.get(0).play();
        this.setState({
          isPlaying: true
        });
      }
    }
    this.setState({
      videoEnd: false
    });
  };

  playiOSVideo = () => {
    //console.log("play ios video");
    if (this.OS !== "iOS" || this.state.beginPlaying) {
      return;
    }
    if (!isWechat()) {
      this.vid.get(0).play();
    } else {
      this.vid.get(0).pause();
      let source = document.getElementById(
        "videoSource" + this.props.video.video_num
      );
      source.setAttribute("src", this.props.video_url);
      this.vid.get(0).load();
      this.vid.get(0).play();
    }
    this.setState({
      beginPlaying: true
    });
  };
  //视频结束
  videoEnd = () => {
    if (this.mounted) {
      this.setState({
        videoEnd: true
      });
    }
  };
  //更新进度条
  updateProgressBar = (xPosition, finish) => {
    if (!this.mounted) {
      return;
    }
    let progressBar = $(".progress-bar");
    let videoProges = $("#videoProgress" + this.props.video.video_num);
    let progressBarWidth = progressBar.width();
    let duration = this.state.duration;
    let position = xPosition - progressBar.offset().left;
    if (position > progressBarWidth) {
      position = progressBarWidth;
    }
    let percentage = (100 * position) / progressBarWidth;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    videoProges.width(parseInt(position, 10));
    let current = parseInt((percentage * duration) / 100, 10);
    let currentTime = this.numberToTime(current);
    if (this.mounted) {
      this.setState({
        current: current,
        currentTime: currentTime
      });
    }

    if (finish) {
      this.vid.get(0).currentTime = current;
    }
  };

  enableMouseDrag = () => {
    this.vid.get(0).pause();
    this.setState({
      timeDrag: true
    });
  };
  disableMouseDrag = () => {
    this.setState({
      timeDrag: false
    });
  };

  componentDidMount() {
    this.vid = $("#" + this.props.video.video_num);
    this.vid.get(0).currentTime = 0;
    if (this.vid !== null && this.mounted) {
      this.setState({
        videoDomReady: true
      });
    }

    //如果视频加载完成，移除等待画面
    this.vid.on("canplay", () => {
      if (this.state.lastPlayPosition > 0) {
        video.get(0).currentTime = this.state.lastPlayPosition;
      }
      if (this.mounted) {
        this.setState({
          videoReady: true,
          lastPlayPosition: 0
        });
      }
    });

    //监听loadmetadata完成事件，如果完成，设置视频时长
    this.vid.on("loadedmetadata", () => {
      this.setDuration();
    });

    //监听播放进度事件，更新播放进度
    this.vid.on("timeupdate", this.updateTime);
    this.vid.on("seeking", () => {
      if (this.mounted) {
        this.setState({
          videoReady: false
        });
      }
    });
    this.vid.on("seeked", () => {
      if (this.mounted) {
        this.setState({
          videoReady: true
        });
        this.vid.get(0).play();
      }
    });
  }

  componentDidUpdate() {
    let timeDrag = this.state.timeDrag;

    //拖曳进度条

    $("#progress-button-" + this.props.video.video_num).on("touchstart", () => {
      this.enableMouseDrag();
    });
    $("#progress-button-" + this.props.video.video_num).on("touchmove", e => {
      if (timeDrag) {
        for (let i = 0; i < e.changedTouches.length; i++) {
          this.updateProgressBar(e.changedTouches[i].pageX, false);
        }
      }
    });
    $("#progress-button-" + this.props.video.video_num).on("touchend", e => {
      if (timeDrag) {
        this.updateProgressBar(e.changedTouches[0].pageX, true);
      }
      this.disableMouseDrag();
    });
  }
  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.showMenuTimer);
  }
  render() {
    //console.log(this.state);
    let currentPlayVideo, playButton;
    let menuBar, controlBar, loading;

    //设置video
    let srcURL =
      this.OS === "iOS" && isWechat() ? "" : this.props.video.video_url;
    let sourceId = "videoSource-" + this.props.video.video_num;
    currentPlayVideo = (
      <video
        id={this.props.video.video_num}
        type="video/mp4"
        preload="metadata"
        onMouseOver={this.showMenu}
        poster={this.props.video.cover}
        webkit-playsinline="true"
        playsInline={true}
        x-webkit-airplay="allow"
        x5-playsinline="true"
        onEnded={this.videoEnd}
      >
        <source id={sourceId} src={srcURL} type="video/mp4" />
        <p>抱歉，您的瀏覽器無法支持HTML5的視頻播放</p>
      </video>
    );
    if (
      (!this.state.isPlaying && this.state.videoReady) ||
      this.state.videoEnd
    ) {
      let btn = this.state.videoEnd ? (
        <i className="fa fa-refresh fa-3x"></i>
      ) : (
        <i className="fa fa-play-circle fa-3x"></i>
      );
      playButton = (
        <div className="large-play-pause-btn" onClick={this.accessPlay}>
          <div className="play-pause-btn-wrapup">{btn}</div>
        </div>
      );
    }

    //设置控制栏控件状态
    if (this.state.videoDomReady && currentPlayVideo !== null) {
      let playIcon,
        screenIcon,
        barWidth,
        menuBarXPosition,
        menuBarYPosition,
        controlBarXPosition,
        controlBarYPosition;

      //设置播放/暂停状态

      if (this.state.isPlaying) {
        playIcon = pauseImg;
      } else if (!this.state.isPlaying && !this.state.videoEnd) {
        playIcon = playImg;
      } else if (!this.state.isPlaying && this.state.videoEnd) {
        playIcon = refreshImg;
      }
      //设置全屏/正常屏幕图标

      screenIcon = fullScreenImg;

      //设置当前播放时间和总时长
      if (this.state.duration !== 0) {
        let totalWidth = window.innerWidth * 0.7;
        let progress = (this.state.current / this.state.duration) * totalWidth;
        $("#videoProgress-" + this.props.video.video_num).width(progress);
      }
      //设置菜单栏和控制栏的位置

      barWidth = window.innerWidth - 20;

      menuBarYPosition = 0;
      menuBarXPosition = 0;
      controlBarXPosition = 0;

      let videoBottom = (window.innerWidth * 9) / 16;

      controlBarYPosition = videoBottom - 50;

      let menuClass = "video-menu-nav";
      let controllClass = "video-control-bar";
      menuClass += " hide";
      controllClass += " hide";

      //渲染菜单栏
      let menubarId = "videoNav-" + this.props.video.video_num;
      menuBar = (
        <div
          id={menubarId}
          className={menuClass}
          style={{
            marginTop: menuBarYPosition,
            marginLeft: menuBarXPosition
          }}
        >
          <span style={{ width: barWidth }}> {this.props.video.title}</span>
        </div>
      );
      if (!this.state.videoReady) {
        //视频没有准备好时显示载入画面

        let loadingClass = "waiting-video-ready";

        let loadingHeight;
        if (this.state.isLandScape) {
          loadingHeight = "100vh";
        } else {
          loadingHeight = (window.innerWidth * 9) / 16;
        }
        let loadingWidth = Window.innerWidth;
        let marginTop = 0;
        let imgSource = loadingImg;

        loading = (
          <div
            className={loadingClass}
            style={{
              width: loadingWidth,
              height: loadingHeight,
              marginTop: marginTop
            }}
            onClick={this.playiOSVideo}
          >
            <img src={imgSource} alt="loading" />
          </div>
        );
      }

      //渲染控制栏
      let controlBarId = "videoContorl-" + this.props.video.video_num;
      let videoProgressId = "videoProgress-" + this.props.video.video_num;
      let progreeBtnId = "progress-button-" + this.props.video.video_num;

      controlBar = (
        <div
          id={controlBarId}
          className={controllClass}
          style={{
            marginTop: controlBarYPosition,
            marginLeft: controlBarXPosition
          }}
        >
          <div className="video-play-pause-btn" onClick={this.accessPlay}>
            <img src={playIcon} alt="play-icon" />
          </div>

          <div className="video-progress-bar">
            <div className="progress-bar">
              <div id={videoProgressId} className="progress-color">
                <span id={progreeBtnId}>
                  <img
                    src={playProgressImg}
                    className="progress-btn"
                    alt="progress-button"
                  />
                </span>
              </div>
            </div>
            <div className="display-current-video-time">
              <div className="video-start-time">{this.state.currentTime}</div>
              <div className="video-end-time">{this.state.endTime}</div>
            </div>
          </div>
          <div className="video-screen-control-btn" onClick={this.switchScreen}>
            <img src={screenIcon} alt="screen-icon" />
          </div>
        </div>
      );
    } else {
      menuBar = null;
      controlBar = null;
    }

    return (
      <div className="video-wrapper" style={{ position: "relative" }}>
        {menuBar}
        {loading}
        {controlBar}
        {currentPlayVideo}
        {playButton}
      </div>
    );
  }
}
export default Video;
