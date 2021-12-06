# Vinobo

Video Notebook for students.

## Description

The application will allow the user to watch a Youtube video and search for keywords in the video's transcript
to find relevant parts in the video.
The user will also be able to annotate the video with personal notes, placed at specific times in the video.

## What we have done

- A custom API endpoint for getting Youtube transcripts.
- Pasting Youtube link and view the video.
- Searching in the transcript.
- Adding/deleting a video to the model.
- Adding notes.
- Logo.

## What we plan to add

- Deleting notes.
- Persistence (keeping user data saved if they log in, and perhaps also saving to localStorage if not logged in).
- Auto-scrolling of transcript and notes while the video is playing.
- Edit notes after they've been saved.
- Organize/order your saved videos with tags/folders/...
- Searching in notes.

## What we might add

- Sharing your notes on a video (collaboratively or read-only) with a link.
- Dictionary function (look up word definitions with a 2nd API).

## File structure

- `js/`
  - Javascript files for Model, video controller and other helper functions.
- `pages/`
  - `api/`
    - `get_transcript`: Custom API enpoint for delivering the data our app needs.
  - The page endpoints, currently only the index page.
- `presenters/`
  - Presenters for the different views.
- `public/`
  - Static files.
- `styles/`
  - CSS modules that render per component.
- `views/`
  - Views and helper functions.
