---
title: "The Easiest Local Kubernetes Setup on macOS: Multipass vs Lima"
pubDatetime: 2024-04-13T00:00:00Z
description: "A practical comparison of local Kubernetes options on macOS, including Docker Desktop, K3d, Multipass, and Lima."
tags:
  - k8s
  - macos
  - multipass
  - lima
  - local-development
featured: false
draft: false
---

This post is an English migration of my original Chinese article, keeping the original publish date.

When your daily work depends on Kubernetes, you eventually need a local cluster you can run without relying on company network access. Local clusters are also useful when you want to test features safely before touching shared environments.

This is also useful if you need to:

- Test across ARM and AMD64 architectures.
- Build isolated environments for Docker, Podman, BuildKit, or containerd.
- Use fast disposable VM environments in CI/CD for tests.
- Simulate more Kubernetes nodes with limited local resources.

Below is a practical comparison of the options I have used.

## Option Comparison

### 1. Docker Desktop with Kubernetes enabled

Pros:

- Easiest setup.
- Works out of the box.

Cons:

- Single-node only.
- Limited Kubernetes features and customization.

### 2. K3d (K3s running in containers)

Pros:

- Simple to start.
- Works with any Docker-compatible runtime.

Cons:

- Limited to K3s.
- Stability may vary depending on your environment.

### 3. Multipass VMs + K8s/K3s/minikube

Pros:

- Fast way to launch clean Ubuntu VMs.
- Can also start from a minikube-focused image.

Cons:

- Ubuntu-focused.
- VM architecture follows host architecture.

### 4. Lima VMs + K8s/K3s/minikube

Pros:

- Supports multiple Linux distributions.
- Supports cross-architecture VMs.
- Can replace parts of Docker Desktop workflows.

Cons:

- More complex than Multipass.
- Startup is usually slower.
- Not available on Windows.

In a normal network environment, all of these options can get a single-node cluster running in around 10 minutes.

## How I Choose

- If you need a company-friendly non-commercial setup, skip Docker Desktop.
- If you need deeper Kubernetes control and customization, skip K3d.
- If your machine is Windows, skip Lima.

I used Multipass for years because it is stable and straightforward. Once I moved to Apple Silicon and needed x86_64 compatibility for testing, I switched to Lima for heterogeneous architecture support.

## Quick Start: Multipass + K3s

Use `multipass find` to list available images:

```bash
multipass find
```

Launch a VM and install K3s:

```bash
# Launch Ubuntu 22.04 VM named k3s
multipass launch --name k3s --cpus 8 --memory 16G --disk 256G 22.04

# Inspect VM details (IP, resources)
multipass info k3s

# Open a shell in the VM
multipass shell k3s

# Install K3s master
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn K3S_KUBECONFIG_MODE=600 INSTALL_K3S_CHANNEL=latest sh -
```

After installation, copy `/etc/rancher/k3s/k3s.yaml` and use it as your local kubeconfig.

## Quick Start: Lima

Useful starter commands:

```bash
# List templates
limactl start --list-templates

# Start default Ubuntu VM
limactl start --name=default --cpus=2 --memory=4 --disk=32 template://ubuntu

# On Apple Silicon, create x86_64 VM
limactl create --name=agent --arch=x86_64 --cpus=2 --memory=4 --disk=32 template://ubuntu

# Start a Kubernetes template directly
limactl start --name=k8s --cpus=2 --memory=4 --disk=32 template://k8s

# Export kubeconfig
export KUBECONFIG=$(limactl list k8s --format 'unix://{{.Dir}}/copied-from-guest/kubeconfig.yaml')

# VM lifecycle
limactl list
limactl start agent
limactl stop agent
limactl shell agent
```

## Final Takeaway

If you want a stable, simple VM-based path on macOS, Multipass is still a strong choice. If you need cross-architecture workflows (especially x86_64 on Apple Silicon), Lima is often the better fit.
