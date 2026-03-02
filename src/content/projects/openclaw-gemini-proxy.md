---
title: "OpenClaw Gemini Proxy"
description: "A local proxy service that enables OpenClaw to interact with the Gemini CLI."
tags: ["Node.js", "Express", "TDD", "Gemini", "Proxy"]
url: "https://github.com/vlucaswang/openclaw-gemini-proxy"
---

# OpenClaw Gemini Proxy

This project provides a local RESTful API that enables OpenClaw to interact with the Gemini CLI. It acts as a bridge, allowing programmatic access to the CLI's capabilities.

## Key Features

- **Terminal Simulation**: Uses `node-pty` to simulate a real terminal environment for the Gemini CLI.
- **Automated Execution**: Supports the Gemini CLI's `-p` (persistent) and `--yolo` (autonomous) flags for seamless automation.
- **File Management**: Built-in support for uploading markdown files and other assets to the Gemini context.
- **Scheduled Tasks**: Includes `node-cron` for running recurring Gemini tasks.
- **Quality Assured**: Developed with Test-Driven Development (TDD) and maintains 100% code coverage.

## Technologies Used

- **Node.js** & **Express**: For the core API server.
- **node-pty**: To handle pseudoterminals.
- **node-cron**: For task scheduling.
- **Jest**: For comprehensive testing and coverage reporting.
