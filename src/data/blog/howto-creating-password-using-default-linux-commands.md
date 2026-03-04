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
KbQ4Ga4hXgybSayDZWb+nA==
```

## Method 2: Date + Checksum

This is one of the quickest methods in practice. Use the current date output and hash it with `md5sum` (or `sha256sum`).

```bash
date | md5sum
9ef47ccd0a2abe3913587627593ad53c  -
```

Note: the trailing `-` comes from stdin input. If you only want the hash:

```bash
date | md5sum | awk '{print $1}'
```

## Method 3: `fold` + `/dev/urandom`

This generates stronger random passwords, but they are usually harder to remember. The command reads printable characters from `/dev/urandom`, wraps at 16 chars, then prints 5 candidates.

```bash
tr -cd '[:print:]' < /dev/urandom | fold -w16 | head -5
1\l'0YXYFf8w%q~Y
Wa<hIiQ(e"gWqS.@
8u/bb{cki'`r<{<9
fOs-=cr!|2KRM:VJ
K$b?5SRJ|TP#tC=T
```

If you want exactly one password:

```bash
tr -cd '[:print:]' < /dev/urandom | head -c 16
a7VyIrQdKey$*dVy
```

Alphanumeric-only variant:

```bash
tr -cd '[:alnum:]' < /dev/urandom | fold -w16 | head -5
 eM3DZ7sph26n2nvk
NNduL8dcQJ8jOmSW
4fjWeb7KvXRsH2dn
h1bTvYlDtt2e8Rvh
GwswhCtE4IJ230jt
```

## Final Notes

- Use a password manager whenever possible.
- Prefer longer random passwords over short complex ones.
- For automation, avoid exposing generated passwords in shell history or logs.
