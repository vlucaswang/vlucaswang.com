---
title: "HOWTO: Creating Passwords Using Default Linux Commands"
pubDatetime: 2023-10-30T16:41:00Z
description: "Several practical ways to generate passwords on Linux using only default tools like openssl, md5sum, and /dev/urandom."
tags:
  - linux
  - security
  - password
  - openssl
  - howto
featured: false
draft: false
---

## Overview

I wanted a simple way to generate passwords that are easy to use, while only relying on tools that already exist on most Linux systems. That rules out non-default helpers such as `mkpasswd` and `pwgen`.

## Method 1: OpenSSL

This is straightforward. Base64 is useful because some raw bytes are not printable.

```bash
openssl rand 16 | base64
zJhh9QmSHL95x6VRYqwm/g==
```

## Method 2: Date + Checksum

This is one of the quickest methods in practice. Use the current date output and hash it with `md5sum` (or `sha256sum`).

```bash
date | md5sum
687cc841260fae6cfc50ff5dc6e1c7a9  -
```

Note: the trailing `-` comes from stdin input. If you only want the hash:

```bash
date | md5sum | awk '{print $1}'
```

## Method 3: `fold` + `/dev/urandom`

This generates stronger random passwords, but they are usually harder to remember. The command reads printable characters from `/dev/urandom`, wraps at 16 chars, then prints 5 candidates.

```bash
tr -cd '[:print:]' < /dev/urandom | fold -w16 | head -5
r9\mlY-e@I?CqO+Z
7.Kcsa3n,r&^uv{b
WyR@CmPz[ff:efRx
6x2A;9)0"O>h^G/)
z\%U!n%fgbD2G)e,
```

If you want exactly one password:

```bash
tr -cd '[:print:]' < /dev/urandom | head -c 16
RI'C9.CoX.E5E^ED
```

Alphanumeric-only variant:

```bash
tr -cd '[:alnum:]' < /dev/urandom | fold -w16 | head -5
XcnAbrAZUJYI03dl
CLgQcsKNfzv5xYlE
TME1XKXCG2ZH0L26
FeD024ZIGFQBnDw0
9L1DQeM5LNgT2JTC
```

## Final Notes

- Use a password manager whenever possible.
- Prefer longer random passwords over short complex ones.
- For automation, avoid exposing generated passwords in shell history or logs.
