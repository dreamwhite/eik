---
sidebar_position: 1
title: OpenVPN
---

# OpenVPN

OpenVPN is an open-source software used for creating secure Virtual Private Network (VPN) connections. It utilizes strong encryption protocols to provide privacy, security, and remote access.

## How I discovered OpenVPN

I first heard about OpenVPN around 2010 when my dad mentioned it to me. Initially, I didn't pay much attention, until later when I needed secure remote access to my home server. At that time, I set up OpenVPN using Dynamic DNS (DDNS) through a no-ip configuration on my Fritzbox 7590 router.

Currently, I'm running **PiVPN**—an easy-to-use implementation of OpenVPN—on my Raspberry Pi 4 (4GB).

## Configuration and Directories

OpenVPN stores its configuration files under the `/etc/openvpn` directory. The structure typically includes the following subdirectories:

- **`/etc/openvpn/`** – Main directory containing configuration files (`.conf` or `.ovpn`).
- **`/etc/openvpn/server/`** – Configuration files specific to the OpenVPN server.
- **`/etc/openvpn/client/`** – Configuration files specific to the OpenVPN client setups.
- **`/etc/openvpn/ccd/`** – Client Configuration Directory, used for client-specific configurations.
- **`/etc/openvpn/easy-rsa/`** – Scripts and files for managing certificates and encryption keys.
- **`/etc/openvpn/private/`** *(root-only access)* – Contains private keys and sensitive files.

:::warning Sensitive Data
Directories like `/etc/openvpn/private/` store sensitive information, including private keys. Always restrict permissions carefully (`sudo chmod 600`) and ensure these files are secure to prevent unauthorized access.
:::

## Quick Commands Reference

Some useful commands for managing OpenVPN services:

```bash
# Start OpenVPN service
sudo systemctl start openvpn

# Stop OpenVPN service
sudo systemctl stop openvpn

# Check status of OpenVPN service
sudo systemctl status openvpn

# Enable OpenVPN service at boot
sudo systemctl enable openvpn
```

## How I Discovered PiVPN

I came across **PiVPN** while looking for a straightforward way to set up and manage an OpenVPN server on my Raspberry Pi. PiVPN simplifies the setup process by automating many steps that would otherwise require manual configuration, making it perfect for quick and secure home VPN setups.

What attracted me to PiVPN was its simplicity and ease of use—it drastically reduced the complexity of managing OpenVPN configurations, certificates, and clients. It has become my go-to solution whenever I set up secure VPN access on a Raspberry Pi.

### Useful PiVPN Commands

Here are some of the most useful commands for managing PiVPN:

```bash
# Add a new VPN client/user
pivpn add

# List existing VPN clients
pivpn list

# Remove a VPN client
pivpn revoke <client_name>

# Backup PiVPN configuration
pivpn backup

# Check the current PiVPN status
pivpn status

# Update PiVPN scripts and dependencies
pivpn update

# Uninstall PiVPN
pivpn uninstall
```

This set of commands covers common tasks you'll frequently perform when using PiVPN.
