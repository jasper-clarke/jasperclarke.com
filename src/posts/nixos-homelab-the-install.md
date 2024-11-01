---
title: 'The Ultimate NixOS HomeLab Guide: The Install'
description: 'In this post we will be going through the installation of NixOS on your homeserver. This is the first post in the series and will be followed by setting up Flakes, Modules and other self-hosted software.'
date: '2024-05-03'
updated: '2024-11-1'
image: /nixos-homelab-install.jpg
categories:
  - linux
  - guide
  - nixos
published: true
---

Finally after 2 weeks here we are. A full, in-depth, step-by-step, ultimate guide to NixOS for homeservers!

## Contents

Well without further a due, lets get this series rolling!

## Installation

Just about all of the following is straight from the [NixOS Manual](https://nixos.org/manual/nixos/unstable/#sec-installation) so if you need any extra help you can check there or ask a comment below this post and I'll try to help out!

### Getting a NixOS flash drive

Ok so let's download the ISO and flash it to a spare 8-16GB USB.
First download the nixos-unstable ISO from [this link](https://channels.nixos.org/nixos-unstable/latest-nixos-minimal-x86_64-linux.iso).

Next for Linux users just do the following:

1. Check `lsblk` for your USB flash drive, for example mine will be `/dev/sdb`
2. Still in the terminal navigate to the folder where the ISO is and run:

```sh
sudo dd bs=4M if=nixos-unstable.iso of=/dev/sdb status=progress oflag=sync
```

Make sure to change `nixos-unstable.iso` to the file name of the ISO you just downloaded and change `/dev/sdb` to your flash drives identifier.

For Windows user:

1. Get [Rufus](https://github.com/pbatard/rufus/releases/latest)
2. Install Rufus, select the ISO and your flash drive and click Start, then run in ISO mode. You don't need to change any other settings.

Ok so now that we have our boot-able flash drive let's plug it into our server and turn it on.
I'm sure for anyone reading this you do know how to do stuff like entering BIOS and booting a flash drive but for those who are not familiar just hold DEL or F12 on your keyboard whilst your server is turning on to bring up the boot menu, this key can be different depending on your motherboard so if your having trouble lookup its brand to find the key to open the "Boot Menu".

From there select your flash drive, then when the NixOS installer boots just press enter on the first option.

### Setup and Partitioning

Since we are not using the graphical installer we will have to do this all in the terminal. As a quick note you need to have a monitor and keyboard connected to your server for the first part of the installation, afterwords you can simply connect via SSH.

I won't be explaining the next few steps in detail as otherwise this post's retention rate will cease to exist but if your interested what everything is doing check the [NixOS Manual](https://nixos.org/manual/nixos/unstable/#sec-installation-manual).

First thing do `sudo -i` to enter root, this way you won't have to prefix every command with sudo.

If you have a Ethernet cable for your server make sure it is plugged in otherwise lets setup the Wifi as you will need internet in the installer.

#### Networking

1. `systemctl start wpa_supplicant`
2. `add_network`
3. `set_network 0 ssid "myhomenetwork"`
4. `set_network 0 psk "mypassword"`
5. `set_network 0 key_mgmt WPA-PSK`
6. `enable_network 0`

If all went well you should see something along the lines of below showing that the connection was successful.

```sh
<3>CTRL-EVENT-CONNECTED - Connection to 32:85:ab:ef:24:5c completed [id=0 id_str=]
```

#### Partitioning

For the following commands if you have a M.2 SSD for your main drive you will use `/dev/nvme0n1` instead of `/dev/sda`, if you have multiple M.2 SSDs you should check `lsblk` to find the one you want to use.

1. `parted /dev/sda -- mklabel gpt`
2. `parted /dev/sda -- mkpart root ext4 512MB -8GB`
3. `parted /dev/sda -- mkpart swap linux-swap -8GB 100%`
4. `parted /dev/sda -- mkpart ESP fat32 1MB 512MB`
5. `parted /dev/sda -- set 3 esp on`

Now let's format these partitions.

6. `mkfs.ext4 -L nixos /dev/sda1`
7. `mkswap -L swap /dev/sda2`
8. `mkfs.fat -F 32 -n boot /dev/sda3`

And now finish it off by mounting the correct volumes.

9. `mount /dev/disk/by-label/nixos /mnt`
10. `mkdir -p /mnt/boot`
11. `mount /dev/disk/by-label/boot /mnt/boot`
12. `swapon /dev/sda2`

## Configuration

Now that all our partitions are setup let's do our initial base configuration.

1. `nixos-generate-config --root /mnt`
2. `nano /mnt/etc/nixos/configuration.nix`

Want to use Vim? Just do the following to install vim on the live installer.

- `nix-env -f '<nixpkgs>' -iA vim`

Now that we have our base canvas of our configuration ready to be painted upon let's start with some basics.

```nix

{ config, lib, pkgs, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
    ];

  boot = {
    # Use the latest linux kernel
    kernelPackages = pkgs.linuxPackages_latest;
    # Grub bootloader stuff, no need to change this.
    loader = {
      efi.canTouchEfiVariables = true;
      grub = {
        enable = true;
        efiSupport = true;
        device = "nodev";
      };
    };
  };

  # Allows us to use closed source packages.
  nixpkgs.config.allowUnfree = true;

  networking = {
    # What should your server be on the network?
    hostName = "homelab";
    # Use network manager, makes life easier
    networkmanager = {
      enable = true;
    };
  };

  # Your timezone here
  time.timeZone = "Australia/Sydney";

  # Change `admin` to whatever username you want.
  users.users.admin = {
    # This makes sure the user isn't root.
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ]; # Enable ‘sudo’ and the use of docker for the user.
    # Set the home directory, also change this to `/home/your-username`
    home = "/home/admin";
    # Use Zsh
    shell = pkgs.zsh;
  };

  # Enable Zsh, this is just personal preference
  programs = {
    zsh.enable = true;
  };

  environment.systemPackages = with pkgs; [
    vim
  ];

  # Enable the OpenSSH daemon, for SSH...
  services.openssh.enable = true;

  # Backup the system configuration when changed
  system.copySystemConfiguration = true;

  # The current unstable version of NixOS
  system.stateVersion = "24.05";

}
```

This is the minimum of what you need to get started on NixOS. We won't add anything more to this now as it would just take ages longer to install and we want to get in ASAP!

So once your happy with the configuration just run the following commmand.

- `nixos-install`

After a while it will prompt you to set the root password and then voila, you just installed NixOS!

Now just `reboot` and hop into your new system, don't unplug your keyboard and monitor just yet though, we have a couple more things to do.

### Post-Install

Now launched into NixOS login to the root user account since the user you created doesn't have a password yet.
Once logged into root type `passwd your-username` to set the user password.
Then `exit` and login to the user account.

For Wifi users you are not done quite yet, follow these steps to login to your network in nmtui.

1. `sudo nmtui`
2. Select `Activate a connection`
3. Select your network name and enter the password.
4. Once connected hit escape a few times and your done!

Congratulations! You have just setup NixOS for your homeserver, in the next post I'll be setting up Nextcloud and organizing our configuration to use modules so stay tuned for the next installment coming next week (hopefully)!

Thanks everyone and I'll see you all again soon!
