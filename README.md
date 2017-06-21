# videofeed exercise
simple nodejs app with external data source

It's a simplified website SPA that displays a video feed from several sources.
The feed source is the following url https://cdn.playbuzz.com/content/feed/items

## Behavior
By default all videos are displayed
User can filter by source type: Facebook, Youtube, Url

## Components
### Client
responsible for all rendeging and UI
IT is vanilla javascript with Facebook SDK and some vanilla bootstap library to allow the dropdown navbars to work without jquery or bootstrap code.

### Server
The server supplies the feed items and allows filtering
The server take the data from the remote playbuzz server

## Gaps and future items
1. The video types list should be dynamic and depend on server api
2. Unavailable videos should have a text stating so.
3. This should be straight forwatd for url but requires Youtube api and some yet unfigured solution for Facebook
