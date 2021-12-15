# Vinobo

Video Notebook for students.

## Description

The application allows the user to watch a Youtube video and search for keywords in the video's transcript
to find relevant parts in the video.
The user will also be able to annotate the video with personal notes, placed at specific times in the video.

## What we have done

- A custom API endpoint for getting Youtube transcripts.
- Pasting Youtube link and view the video.
- Searching in the transcript.
- Adding/deleting a video to the model.
- Adding/deleting notes.
- Logo.
- Persistence (keeping user data saved if they sign in).
- Auto-scrolling of transcript ~~and notes~~ while the video is playing.
- Searching in notes.

## What we plan to add

- Edit notes after they've been saved.
- Organize/order your saved videos with tags/folders/...

## What we might add

- Persistance in localStorage until the first time a user signs in.
- Text formatting notes with for example Markdown.
- Sharing your notes on a video (collaboratively or read-only) with a link.
- Dictionary function (look up word definitions with a 2nd API).

## File structure

- `components/`
  - Custom React components to be used throughout the app.
- `js/`
  - Javascript files for Model, video controller and other helper functions.
- `pages/`
  - `api/`
    - `get_transcript`: Custom API enpoint for delivering the data our app needs.
  - One file per page (endpoint) on the site.
- `presenters/`
  - Presenters for the different views.
- `public/`
  - Static files. Logos and images.
- `styles/`
  - CSS modules that render per component.
- `views/`
  - Views and their respective functions.
