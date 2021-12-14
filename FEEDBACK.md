# User Feedback/Evaluation 2021-12-12

Here is a compiled list of feedback we got from letting our friends test our app.

The user feedback was given with the app during commit [ab8d2bc](https://gits-15.sys.kth.se/jberg8/DH2642-Vinobo/commit/ab8d2bcdf65d6da9cded4a6fd5480c1f0728aae1).

## Feedback we got

### Tester #1 (10 minutes)

- First impression: "You make your own playlist?"
- Clicked the empty YT player expecting something to happen.
- Concern: Transcript autoscrolls while playing video. Making this optional would help.
- The form with "Add Note" a bit unclear (before understanding it's purpose).
- Bug found: Deleting video did not make it dissapear in other tab. Then, deleting one of it's notes made it sync back.
- Mistaking the Log in form to be the Register form since they clicked on "Register".

### Tester #2 (30 minutes)

- Clicked the empty YT player expecting something to happen.
- Confused about what "YouTube ID" means (not URL though).
- Transcript didn't work at the time of testing. Attempted to search the transcript, expecting them to show up after search.
- Confused about both Title and Note being required. Copied video title into note title expecting the Note to be global. Realized later that the are saved per video. Generally a bit confused about the Title+Content structure of a Note.
- On "About" page: Confused about the text "until the next time you study".
- The note timestamps being clickable was discovered by accident (not obvious).
- Mistaking the Log in form to be the Register form since they clicked on "Register".
- Searching in My Notes feature requested. And perhaps in My Videos too.
- Suggested a more descriptive header, such as "Vinobo - Video Notebook".

### Tester #3 (10 minutes)

- At the beginning it was a bit unclear what to do first
- It would be nice to either have instructions on how to proceed, or highlight what to do first
- Would be nice to have an image placeholder for the youtube videos, so that the user can easily browse the videos quickly
- Wasn't sure what the notes view exactly was for, or what the app is supposed to help you with
- Didn't see the added value of the transcript -> by clicking on it they saw the value of searching the video (not necessarily on keywords)
- Would be nice to be able to organise the notes in someway (either in folders based on topics, labels)
- User page would be appreciated with a dashboard (or maybe be able to add general comments or descriptions to videos)

## Features we improved based on feedback

> _Clicked the empty YT player expecting something to happen._

Empty YouTube player is hidden and replaced by a tooltip pointing the user to paste a link.

> _Attempted to search the transcript, expecting them to show up after search._

Transcript search bar is only visible when a transcript has loaded.

> _Confused about what "YouTube ID" means._

Tooltip only says URL.
