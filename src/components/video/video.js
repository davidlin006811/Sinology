import React, { PureComponent } from "react";
import $ from "jquery";
import { getMobileOperatingSystem } from "../../common";
import "./video.css";
import playProgressImg from "./image/play_progress.svg";
import loadingImg from "./image/loading.gif";
import fullScreenImg from "./image/full_screen.svg";

class Video extends PureComponent {
  constructor(props) {
    super(props);
    //console.log(props);
    this.OS = getMobileOperatingSystem();
    // this.isWeChatBrowser = isWechat();

    this.state = {
      isLandScape: false,
      videoEnd: false,
      isPlaying: false,
      fullScreen: false,
      current: 0,
      firstTime: true,
      needShowMenu: false
    };
    this.mounted = true;
    this.lastTime = -1;
    this.tryTimes = 0;
    this.timer = null;
    this.hideMenuTimeout = null;
    this.hiddenBtnTimeout = null;
    this.showMenuTimeout = null;
    this.isVideoBreak = null;
    this.orientationTimer = null;
    this.delayTimeToCheck = null;
    this.delayTimeToPlay = null;
    this.vid = null;
    this.dragEvent = null;
    this.videoChange = false;
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
    this.menuFadeIn();
    if (this.state.isPlaying) {
      clearTimeout(this.showMenuTimeout);
      this.showMenuTimeout = setTimeout(this.menuFadeOut, 3000);
      // this.menuFadeOut();
    }
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
  menuFadeOut = () => {
    let menuBar = $("#videoNav-" + this.props.video.video_num);
    let controllBar = $("#videoContorl-" + this.props.video.video_num);
    let playBtn = $("#playBtn-" + this.props.video.video_num);
    clearTimeout(this.hideMenuTimeout);
    clearTimeout(this.hiddenBtnTimeout);
    this.hideMenuTimeout = setTimeout(() => {
      menuBar.fadeOut();
      controllBar.fadeOut();
    }, 6000);
    this.hiddenBtnTimeout = setTimeout(() => {
      playBtn.fadeOut();
    }, 3000);
  };
  menuFadeIn = () => {
    let menuBar = $("#videoNav-" + this.props.video.video_num);
    let controllBar = $("#videoContorl-" + this.props.video.video_num);
    let playBtn = $("#playBtn-" + this.props.video.video_num);

    clearTimeout(this.hiddenBtnTimeout);
    clearTimeout(this.hideMenuTimeout);
    clearTimeout(this.showMenuTimeout);
    playBtn.fadeIn();
    if (!this.videoChange & !this.state.videoEnd) {
      menuBar.fadeIn();
      controllBar.fadeIn();
    } else {
      menuBar.fadeOut();
      controllBar.fadeOut();
    }
    this.videoChange = false;
  };
  pauseVideo = () => {
    this.vid.get(0).pause();
    this.setState({
      isPlaying: false
    });
    this.menuFadeIn();
    if (this.props.playId === this.props.video.id) {
      this.props.resumeVideoPlayId();
    }
  };
  //播放切换
  accessPlay = () => {
    if (!this.vid.get(0).paused && !this.state.videoEnd) {
      this.pauseVideo();
    } else if (this.vid.get(0).paused && !this.state.videoEnd) {
      this.vid.get(0).play();
      this.setState({
        isPlaying: true,
        beginPlaying: true
      });
      if (this.props.playId !== this.props.video.id) {
        this.setVideoPlayIdToMe();
      }
      this.menuFadeOut();
    } else if (this.vid.get(0).paused && this.state.videoEnd) {
      if (this.OS === "iOS") {
        this.playiOSVideo();
        if (this.props.playId !== this.props.video.id) {
          this.props.setVideoPlayIdToMe();
        }
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
        if (this.props.playId !== this.props.video.id) {
          this.setVideoPlayIdToMe();
        }
      }
      this.menuFadeOut();
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
    // if (!isWechat()) {
    // this.vid.get(0).play();
    //} else {
    this.vid.get(0).pause();
    let source = document.getElementById(
      "videoSource" + this.props.video.video_num
    );
    source.setAttribute("src", this.props.video_url);
    this.vid.get(0).load();
    this.vid.get(0).play();
    //}
    this.setState({
      beginPlaying: true
    });
  };
  //视频结束
  videoEnd = () => {
    if (this.mounted) {
      this.setState({
        isPlaying: false,
        videoEnd: true
      });
      let playBtn = $("#playBtn-" + this.props.video.video_num);
      clearTimeout(this.hiddenBtnTimeout);
      playBtn.fadeIn();
    }
  };
  //更新进度条
  updateProgressBar = (xPosition, finish) => {
    if (!this.mounted) {
      return;
    }
    //let progressBar = $(".progress-bar");
    let progressBar = $("#timeline-" + this.props.video.video_num);
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
  checkVideoStatus = () => {
    let isPlaying = this.vid.get(0).paused ? false : true;

    let videoEnd = this.state.current >= this.state.duration ? true : false;
    this.setState({
      isPlaying: isPlaying,
      videoEnd: videoEnd
    });
    if (isPlaying) {
      this.menuFadeOut();
    } else {
      this.menuFadeIn();
    }
  };
  setVideoPlayIdToMe = () => {
    this.props.setVideoPlayId(this.props.video.id);
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
    this.vid.on("fullscreenchange", this.checkVideoStatus);
    this.vid.on("mozfullscreenchange", this.checkVideoStatus);
    this.vid.on("webkitfullscreenchange", this.checkVideoStatus);
    this.vid.on("msfullscreenchange", this.checkVideoStatus);

    let playBtn = $("#playBtn-" + this.props.video.video_num);
    playBtn.fadeIn();
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.playId !== nextProps.playId &&
      nextProps.playId !== this.props.video.id &&
      nextProps.playId !== -1
    ) {
      this.videoChange = true;
      //if (this.state.isPlaying) {
      this.pauseVideo();
      //}
      /*let menuBar = $("#videoNav-" + this.props.video.video_num);
      let controllBar = $("#videoContorl-" + this.props.video.video_num);
      menuBar.fadeOut();
      controllBar.fadeOut();*/
    }
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
      if (!this.state.isPlaying) {
        this.setState({
          isPlaying: true
        });
      }
      this.menuFadeOut();
    });
  }
  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.showMenuTimer);
    clearTimeout(this.hideMenuTimeout);
    clearTimeout(this.hiddenBtnTimeout);
    clearTimeout(this.hideMenuTimeout);
  }
  render() {
    //console.log(this.state);
    let currentPlayVideo, playButton;
    let menuBar, controlBar, loading;

    //设置video
    //let srcURL =
    //this.OS === "iOS" && isWechat() ? "" : this.props.video.video_url;
    let srcURL = this.props.video.video_url;
    let sourceId = "videoSource-" + this.props.video.video_num;
    currentPlayVideo = (
      <video
        id={this.props.video.video_num}
        type="video/mp4"
        preload="metadata"
        onClick={this.showMenu}
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

    let btnClass;
    if (this.state.videoEnd) {
      btnClass = "fa fa-refresh fa-2x";
    } else if (this.state.isPlaying) {
      btnClass = "fa fa-pause fa-2x";
    } else if (!this.state.isPlaying) {
      btnClass = "fa fa-play fa-3x";
    }

    let btnId = "playBtn-" + this.props.video.video_num;
    playButton = (
      <div className="large-play-pause-btn hide" id={btnId}>
        <div className="play-pause-btn-wrapup">
          <i className={btnClass} onClick={this.accessPlay}></i>
        </div>
      </div>
    );

    //设置控制栏控件状态
    if (this.state.videoDomReady && currentPlayVideo !== null) {
      let screenIcon,
        barWidth,
        menuBarXPosition,
        menuBarYPosition,
        controlBarXPosition,
        controlBarYPosition;

      //设置全屏/正常屏幕图标

      screenIcon = fullScreenImg;

      //设置当前播放时间和总时长
      if (this.state.duration !== 0) {
        let totalWidth = window.innerWidth * 0.8;
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
      let totalTimeLineId = "timeline-" + this.props.video.video_num;
      controlBar = (
        <div
          id={controlBarId}
          className={controllClass}
          style={{
            marginTop: controlBarYPosition,
            marginLeft: controlBarXPosition
          }}
        >
          <div className="video-progress-bar" id={totalTimeLineId}>
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
