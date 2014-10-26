
  var playerDiv = document.getElementById('player');

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  
  var player;
  
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'HXg-FZsWuuM',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    

    $('.video-link').each(function(){
      var videoId = MyViewModel.getVideo();
      $(this).click(function(){
          player.loadVideoById(videoId.id);
      });
    });

    $('.video-list').css('margin-bottom', '10px');

  }

  function onPlayerReady(event) {
    //event.target.seekTo(5);
    //event.target.playVideo();
  }

  function changeVideo(player, videoId){
    player.loadVideoById(videoId);
    done = false;
  }

  function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.ENDED){
      var videoId = player.getVideoData().video_id,
          video = MyViewModel.getById(videoId);

          if(!video.viewed){
            var points = parseInt($('#points-span').text());
            points++;
            $('#points-span').text(points);
            video.viewed = true;    
          }      
    }
  }

  function stopVideo() {
    player.stopVideo();
  }
  
  function Video(videoId, name){
    this.id = videoId;
    this.name = name;
    this.viewed = false;
    this.inserted = false;
    this.videoTumbnail = function(){
      return 'http://img.youtube.com/vi/' + this.id + '/0.jpg';
    }
    this.videoName = function(){
      return 
    }

  };

  function AppViewModel(){
    this.array = [new Video('HXg-FZsWuuM', '"Pussy" - Rammstein (8-Bit)'),
                  new Video('87JgSSySoBY', 'EXCLUSIVE: Justin Bieber\'s Boxing Lessons With Floyd Mayweather - CONAN on TBS'),
                  new Video('B-hKob9p0lQ', 'A Tale of Momentum & Inertia'),
                  new Video('83efOb27Td4', 'Old man shows some major skills!'),
                  new Video('irpVyPBwD6M', 'Кировские заправщики настолько суровы'),
                  new Video('XlbVB50mIh4', 'PHOTOMATH')];

    this.push = function (video){
      video.inserted = true;
      this.array.push(video);
    };

    this.getVideoById = function(videoId){
      for(var i = 0; i < this.array.length; i++){
        if(this.array[i].id === videoId){
          return this.array[i];
        }
      }
    }

    this.markAsViewedById = function(videoId){
      var selectedVid = this.getVideoById(videoId);
      selectedVid.viewed = true;
    }

    this.getVideo = function(){
      for(var i = 0; i < this.array.length; i++){
        if(!this.array[i].inserted && !this.array[i].viewed){
          this.array[i].inserted = true;
          return this.array[i];
        }
      }
      return ;
    }
  };

  var MyViewModel = new AppViewModel();
  ko.applyBindings(MyViewModel);