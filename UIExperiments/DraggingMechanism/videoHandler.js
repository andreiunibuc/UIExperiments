const SPACEBAR = ' '

/**
 * Linked list used to store 
 * the videos in the timeline 
 */
class TimelineNode {
  constructor(data) {
    this.data = data
    this.next = null                
  }
}

window.onload = () => {
  
  this.resources = {}
  this.resources[Math.random().toString(36).substr(2, 9)] = buildVideoResource('./GrahamScan.mov', 'Graham')
  this.resources[Math.random().toString(36).substr(2, 9)] = buildVideoResource('./PostItDemo.mp4', 'Post it')
  
  document.body.onkeyup = spacebarPlayEvent

  let iterator = null;
  for (id in this.resources) {
    if (!this.timeline) {
      this.timeline = new TimelineNode(resources[id])
      iterator = this.timeline
    } else {
      iterator.next = new TimelineNode(resources[id])
      iterator = iterator.next
    }
  }
  renderResourcesBlock()
}


/**
 * Method that handles the 
 * spacebar playback event
 * @param event context about the event
 */
function spacebarPlayEvent(event) {

  if (event.key == SPACEBAR) {
    canvas = document.querySelector('.preview-player')
    context = canvas.getContext('2d')
    console.log(window.timeline)
    if (window.timeline) {
      playVideo(window.timeline.data.videoCore, window.timeline.next)
    }
    
  }
}

// TODO: change the parameters to only use the current node
function playVideo(video, timelineNode) {
  loop = () => {
    if (video.duration === video.currentTime && timelineNode) {
      canvas.width = timelineNode.data.videoCore.videoWidth
      canvas.height = timelineNode.data.videoCore.videoHeight
      playVideo(timelineNode.data.videoCore, timelineNode.next)
    } else {
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      setTimeout(loop, 1000 / 30) // drawing at 30fps
    }
  }
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  loop()
  video.play()
}

/**
 * Renders the items 
 * to the resources list
 */
function renderResourcesBlock() {
  
  for (id in resources) {
    elem = document.createElement('div')
    elem.classList.add('item')
    elem.classList.add(`id-${id}`)
    elem.append(resources[id].metadata.title)
    $('.resources-list').append(elem)
    $(`.id-${id}`).draggable(dragObjectLogic)
  }
}


/**
 * Method that returns an object with all
 * metadata necessary to use a video resource
 */
function buildVideoResource(path, title) {
  video = document.createElement('video')
  video.src = path
  
  return {
    videoCore: video,
    metadata: {
      title: title
    }
  }
}


const dragObjectLogic = {

  start : function (event, helper){
    event.target.style.zIndex = '500'
    event.target.style.animation = 'pickup 0.5s'
    event.target.style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22'
    event.target.style.transform = 'scale(1.15)'
    event.target.style.transition = 'none'
    
  },

  // drag: function (event, helper) {
      
  // },
  
  stop : function (event, helper) {
    event.target.style.boxShadow = 'none'
    event.target.style.transform = 'scale(1)'
    
    if (2 * event.pageY > $(window).height()) {
      event.target.classList.remove('item')
      event.target.classList.add('timeline-item')
      event.target.style.animation = 'fadein 0.5s'
      event.target.style.transition = '1s'
      console.log(event.target.classList[0])
      childrenNodesTimeline = $('.timeline').children()

      if (!childrenNodesTimeline.length) {
        $('.timeline').prepend(event.target)
      } else {

        let refNode = null;
        for (child of childrenNodesTimeline) {
          if (child.offsetLeft > helper.offset.left) {
            refNode = child
            break;
          }
        }

        if (refNode) {
          $(event.target).insertBefore(child)
        } else {
          $('.timeline').append(event.target)
        }
        event.target.style.transition = 'none'

      }
    } else {
      event.target.style.transition = '0.5s'
    }

    event.target.style.left = '0';
    event.target.style.top = '0';
  }

};