---
title: React State Changes Are Not Propagating in Enzyme
description: "Two Ways to Handle this Situtation"
date: "2020-10-20"
---

Have you ever run into the situation where your React class component state updates (and you've verified that the state is updating - you've logged it - and it's definitely changing), but other components in your Enzyme tests are not getting the updated state?

TODO: it appears that the ReactWrappers that Enzyme returns don't necessarily stay in sync with React state updates. This can cause issues depending on what you're asserting against.

What do you do here? How do you satisfy that you've written sufficient tests? Should you assert on the internal state? You could, but that would make your tests rather tightly coupled with your component implementations. You're trying to avoid that.

You could wrap your assertions in setTimeout() calls. It works! But it sort of feels wrong, and a bit hacky. Can we do better?

Turns out the Enzyme function [setProps()](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/setProps.html) will force a re-render. 