#!/bin/sh

# Define structure as folder:file list
folders="platforms networking dev systems"

platforms="home-assistant mqtt ksenia2mqtt pihole traefik"
networking="openvpn linux"
dev="docker fastapi flask"
systems="macos hackintosh"

mkdir -p docs

for folder in $folders; do
  mkdir -p "docs/$folder"
  eval topics=\$$folder
  for topic in $topics; do
    filepath="docs/$folder/$topic.md"
    title=$(echo "$topic" | sed -E 's/-/ /g' | sed -E 's/(^| )(.)/\U\2/g')

    cat > "$filepath" <<EOF
---
sidebar_position: 1
title: $title
---

# $title

This is a placeholder page for **$title**.

More content coming soon. 🚧

EOF

    echo "✅ Created $filepath"
  done
done
