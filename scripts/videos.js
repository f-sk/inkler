
  var playerDiv = document.getElementById('player');

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  var db = new CreateVideosDb();
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
    var videoId = db.getVideo();
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
          video = db.getById(videoId);
          console.log(video);
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



function CreateVideosDb(){
    var self = this,
        vidDb = [
          {viewed: false, inserted: false, id: 'HXg-FZsWuuM'},
          {viewed: false, inserted: false, id: '87JgSSySoBY'},
          {viewed: false, inserted: false, id: 'B-hKob9p0lQ'},
          {viewed: false, inserted: false, id: '83efOb27Td4'},
          {viewed: false, inserted: false, id: 'irpVyPBwD6M'},
          {viewed: false, inserted: false, id: 'XlbVB50mIh4'}];

    this.getById = function(videoId){
      for(var i = 0; i < vidDb.length; i++){
        if(vidDb[i].id == videoId){
          return vidDb[i];
        }
      }
    };

    this.markAsViewed = function(videoId){
      var video = self.getById(videoId);
      video.viewed = true;
    };

    this.getVideo = function(){
      for(var i = 0; i < vidDb.length; i++){
        if(!vidDb[i].inserted && !vidDb[i].viewed){
          vidDb[i].inserted = true;
          return vidDb[i];
        }
      }
      return ;
    };
  };
  
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
                  new Video('irpVyPBwD6M', 'Кировские заправщики настолько суровы)'),
                  new Video('XlbVB50mIh4', 'PHOTOMATH')];

    this.push = function (video){
      video.inserted = true;
      this.array.push(video);
    };

    this.pop = function(video){

    };
  };

  var MyViewModel = new AppViewModel();
  ko.applyBindings(MyViewModel);