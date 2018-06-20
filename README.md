# Video clipper
## challenge for jobsity

This app allow you load a video from youtube (using the id) or adding a url where is video uploaded. Next images will show you some instructions to use this app.

To save data of this app (I don't use any permanent storage like LocalStorage). I'm using [React Api Context](https://reactjs.org/docs/context.html) to save data (clips and main video). For styles I used [material-ui](https://material-ui.com/). Also I used [create-react-app](https://github.com/facebook/create-react-app) to create basic template for this app.

To run the app you must install dependencies and start it:

1. `npm install` or `yarn install`
2. `npm start` or `yarn start`

![App init](screenshots/0-ch-init.png)
![Playing default video](screenshots/1-ch-init-playing.png)

Top controls on ritgh side are used to add a new clip with base on the main video

![Add clip](screenshots/2-ch-add-clip.png)

You can click over the clip name or play icon to play or pause the video (only if is video loaded from an external url). If you add a youtube video id you must use the controls showed on the player zone.

![Playing clip](screenshots/3-ch-playing-clip.png)

You can edit any clip, the main video. Only you can remove clips (not main video).

![Edit clip](screenshots/4-ch-edit-clip.png)
![Remove clip](screenshots/5-ch-remove-clip.png)
![Edit main video](screenshots/6-ch-edit-main-video.png)
