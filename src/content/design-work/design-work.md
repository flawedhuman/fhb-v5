---
title: "Terrible Gerald's — Event System Rebuild"
date: 2026-06-13
description: "Rebuilt the booking flow around a Storyblok-driven calendar."
tags: ["astro", "storyblok", "client-work"]
draft: false
---

## The problem

The old event page was a static list someone updated by hand every week.
Bookings came in through a separate email thread that had nothing to do
with the site.

Old event page, a plain bulleted list. *(Add `./before.jpg` when ready.)*

## The approach

Rebuilt the event data model in Storyblok so non-technical staff could
add/edit events without touching code, then wired the booking form
directly into it via a small VueJS component.

New calendar view with live availability. *(Add `./calendar.jpg` when ready.)*

## The result

Support emails about "is this event still happening" basically disappeared.

Mobile view of the finished booking flow. *(Add `./mobile.jpg` when ready.)*

**Stack:** Astro, VueJS, Storyblok CMS