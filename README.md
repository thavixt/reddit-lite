![gh-pages](https://github.com/thavixt/reddit-lite/workflows/gh-pages/badge.svg?branch=master&event=push)

# Reddit-Lite

Reddit-lite is a lightweight Reddit client for personal use.

The motivation came from the recent Reddit redesign. I found it to be slow and unresponsive, even though the design itself was undeniably better. This is my attempt to recreate it (no all features :), with my personal design and usability ideas.

This project was made with the create-react-app Typescript template.

## TODOs

- [ ] voting
- [ ] user subscriptions
- [ ] commenting
- [ ] not all post title flairs visible (?)
- [ ] HTML entities in window title
- [ ] CommentBranch : load more button
- [ ] Page
    - [ ] jump to top btn
- [ ] FeedList
    - [ ] jump to top btn


## Ideas

- [ ] keyboard navigation
- [ ] fetch / add / store subreddit list?
- [ ] handle urls?
    - [x] sub
        - [x] current sort & timeframe
    - [ ] post
        - [ ] consider crosspost
- [ ] mobile layout
    - [ ] page overlay
        - opens when a post is clicked
        - x button in corner?

## Done

- [x] auth with Reddit.com
- [x] use github workflow to build and deploy on push to master
- [x] embedded content not changing sometimes on post/page change
- [x] dotenv
- [x] upgrade to latest creat-react-app
- [x] typescript
    - [x] global types `types/index.d.ts`
- [x] sass stylsheets
    - [x] global variables in `src/variables.scss`
