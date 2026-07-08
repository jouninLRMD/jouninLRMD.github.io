---
# ── Copy this file to a new name (e.g. my-new-project.md) to create a post. ──
# The filename becomes the URL: my-new-project.md → /blog/my-new-project
# Files starting with "_" are ignored, so this template never gets published.
title: "My new post title"
description: "One or two sentences shown on the blog card and in search results."
date: 2026-01-01
tags: [project, machine-learning]
# ── Everything below is optional — delete what you don't need. ──
# cover: ./my-figure.png        # image next to this file; shown on card + top of post
# coverAlt: "Caption for the cover image"
# doi: 10.3390/xxxxx            # links the post to one of your publications
# draft: true                   # keep the post unpublished while you write
---

Write your post here in plain **Markdown**.

## Sections use `##` headings

Regular text, [links](https://example.com), `inline code`, *italics*, **bold**.

### Adding figures

Put the image file in the same folder as this post and reference it relatively —
Astro optimizes it automatically:

```md
![Description of the figure](./figure1.png)
```

Or store it in `public/blog/` and reference it absolutely: `![...](/blog/figure1.png)`

### Code blocks

```python
import torch
model = MyGNN(hidden=64)
```

> Blockquotes work too — good for highlighting key findings.

1. Numbered lists
2. Work as expected

- So do
- Bullet lists
