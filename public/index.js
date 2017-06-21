///// Document ready code to trigger the run function /////
// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
//IE8 not supported

function run(event) {
    console.log("DOM fully loaded and parsed");

    populateVideoFeed();

    var dropdownElment = document.querySelector('#filterByDropdown');
    var nofilterString = 'All';
    //TODO normalize usage of single quote double qoute
    var listItems = [nofilterString, "Youtube", "Facebook", "Other"]
        .map(function (filter) {
            return '<li id="' + filter.toLowerCase() + '"><a href="#">' + filter + '</a></li>';
        }).join('\n');


    // append to the element's content
    dropdownElment.innerHTML = listItems;
    dropdownElment.addEventListener('click', function (event) {
        console.log('Dropdown elment clicked!');
        console.log('event.srcElment.innerText: ' + event.srcElement.innerText);
        var filter = event.srcElement.innerText == nofilterString ? null : event.srcElement.innerText.toLowerCase();
        populateVideoFeed(filter);
    });
}

function populateVideoFeed(filter) {
    console.log('populateVideoFeed');
    getJson('/v1.0/videos', function (json) {;
        renderVideos(json)
    });
}

function renderVideos(json) {
    var feedHtml = json.items.map(function (video) {
        return createVideoHtml(video);
    }).join('\n');

    var videoFeed = document.querySelector("#videos");
    videoFeed.innerHTML = feedHtml;
}

function createVideoHtml(video) {

    ensureVideoUrl(video);
    ensureVideoTitle(video);


    return '<div class="row"> \
            <div class="col-md-10 col-md-offset-1"> \
                <div class="post-preview"> \
                    <a href="' + video.url + '"> \
                        <h2 class="post-title">' +
        video.title +
        '</h2> ' +
        createVideoElement(video) +
        ' </a> \
                    <p class="post-meta">Posted on <a href="#">' + video.source + '</a>. ' + video.views + ' views.</p> \
                </div> \
            </div> \
        </div>';
}

function ensureVideoUrl(video) {


    if ('url' in video)
        return;

    switch (video.source) {
        case 'youtube':
            video.url = `http://www.youtube.com/embed/${video.videoId}?rel=0&hd=1`;
            break;
        case 'facebook':
            video.url = `http://www.facebook.com/video/video.php?v=${video.videoId}`;
            break;
        default:
            console.log('Unknown video source with missing URL!');
            video.url = null;
    }
}

function ensureVideoTitle(video) {
    if ('title' in video)
        return;

    switch (video.source) {
        case 'youtube':
            video.title = 'Youtube video';
            break;
        case 'facebook':
            video.title = 'Facebook video';
            break;
        default:
            video.title = 'Just another video';
    }
}


function createVideoElement(video) {
    switch (video.source) {
        case 'youtube':
            return '<div class="videoWrapper"> \
                        <iframe width="560" height="349" src="' + video.url + '" frameborder="0" allowfullscreen></iframe> \
                        </div>';
        case 'facebook':
            return '<div class="fb-video" data-href="' + video.url + '" data-allowfullscreen="true" data-width="500"></div>'
        default:

            return '<div class="videoWrapper"> \
                    <iframe src="' + video.url + '" frameborder="0" allowfullscreen></iframe> \
                        </div>';
    }
}

function getJson(url, success) {
    console.log('getJson');
    var xhr = new XMLHttpRequest(); //IE10 and moden browsers
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log('json recieved.');
            console.log(json);
            success(json);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}