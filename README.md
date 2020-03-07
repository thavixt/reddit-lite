![gh-pages](https://github.com/thavixt/reddit-lite/workflows/publish-on-gh-pages/badge.svg?branch=master&event=push)

# Reddit-Lite

Reddit-lite is a lightweight Reddit client for personal use.

The motivation came from the recent Reddit redesign. I found it to be slow and unresponsive, even though the design itself was undeniably better. This is my attempt to recreate it (no all features :), with my personal design and usability ideas.

This project was made with the create-react-app Typescript template.

## TODOs

- [ ] not all post title flairs visible (?)
- [ ] HTML entities in window title
- [ ] embedded content not changing sometimes on post/page change
- [ ] CommentBranch : load more button
- [ ] Page
    - [ ] jump to top btn
- [ ] FeedList
    - [ ] jump to top btn


## Ideas

- [ ] keyboard navigation
- [ ] upvote and downvote -> use [snoowrap](https://github.com/not-an-aardvark/snoowrap)
    - [ ] login? auth?
- [ ] fetch / add / store subreddit list?
- [ ] handle urls?
    - [ ] sub
        - [ ] current sort & timeframe
    - [ ] post
        - [ ] consider crosspost
- [ ] mobile layout
    - [ ] page overlay
        - opens when a post is clicked
        - x button in corner?

## Done

- [x] dotenv
- [x] upgrade to latest creat-react-app
- [x] typescript
    - [x] global types `types/index.d.ts`
- [x] sass stylsheets
    - [x] global variables in `src/variables.scss` (place elsewhere?)
