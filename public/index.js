function run(event) {
    console.log("DOM fully loaded and parsed");

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
        loadItemsFromServer(filter);
    });
}

function loadItemsFromServer(filter){
    console.log('loadItemsFromServer');
}


///// Document ready code to trigger the run function /////
// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);