---
title: NixOS Full Disk Encryption with USB/SD-Card/Password Unlock
description: 'Full Disk Encryption, because obviously the FBI will be attempting to break into your computers. Why else would you be encrypting your drive?'
date: '2024-11-1'
image: /nixos-full-disk-encryption.webp
categories:
  - linux
  - guide
  - nixos
published: true
---

Not long ago I had some super secure data on my server and I wanted it to survive just about anything from a network attack to a physical theft.
Now the NixOS documentation is a bit lacking on this topic, but I've found a few resources that helped me to get this working.
Here you go guys, finally a single guide with all the steps.

References:

- [Queensland FP Lab - Installing NixOS](https://qfpl.io/posts/installing-nixos/)
- [Full Disk Encryption - NixOS Wiki](https://wiki.nixos.org/wiki/Full_Disk_Encryption)

**Note**<br>
This guide does expect that you are in the minimal ISO and have connected to your network via Ethernet or `wpa_cli`.
If you want to know how to setup NixOS from the very beginning, check out my [NixOS Homelab Install Guide](/blog/nixos-homelab-the-install).

## Partitioning

**Note**<br>
In the following snippets I will refer to the drive we are encrypting as `/dev/sda` but yours might be `/dev/nvme0n1`.

If you haven't already, switch to the root user with `sudo -i`

```sh
# Open gdisk on the disk we're installing on
gdisk /dev/sda

# -----------------------
# BEGIN GDISK COMMANDS

# print the partitions on the disk
Command: p

# Delete a partition. Select the partition number when prompted.
# Repeat for all partitions.
Command: d

# Create the EFI boot partition
Command: n
Partition number: 1
First sector: <enter for default>
Last sector: +1G       # make a 1 gigabyte partition
Hex code or GUID: ef00 # this is the EFI System type

# Create the LVM partition
Command: n
Partition number: 2
First sector: <enter for default>
Last sector: <enter for default - rest of disk>
Hex code or GUID: 8e00 # Linux LVM type

# Write changes and quit
Command: w

# END GDISK COMMANDS
# ---------------------
```

If you want more of an explanation on what these commands are doing please look at the [Queensland FP Lab - Installing NixOS](https://qfpl.io/posts/installing-nixos/) post as it is really good!

## Formatting and Encryption

`$LVM_PARTITION` is `/dev/nvme0n1p2` or `/dev/sda2`, this is the second partition we just created.

```sh
# You will be asked to enter your passphrase - DO NOT FORGET THIS
cryptsetup luksFormat $LVM_PARTITION
```

If you want to decrypt the drive on boot without input you can write a decryption key to a USB or SD Card.
As an example if you only ever access this computer via SSH you will want the computer to be able to boot independantly without needing a password input.

Note this method will make the decryption drive unusuable for anything else.

```sh
# Create a random key
dd if=/dev/random of=hdd.key bs=4096 count=1
# Append the key to the list of secure keys that can unlock the drive.
cryptsetup luksAddKey $LVM_PARTITION ./hdd.key

# Now write the key to your USB or SD Card, find it from lsblk.
dd if=hdd.key of=/dev/REPLACE-HERE
```

Continue here.

```sh
# SKIP TO HERE IF NOT USING USB UNLOCKING.
# Decrypt the encrypted partition and call it nixos-enc. The decrypted partition
# will get mounted at /dev/mapper/nixos-enc
cryptsetup luksOpen $LVM_PARTITION nixos-enc
```

```sh
# Create the LVM physical volume using nixos-enc
pvcreate /dev/mapper/nixos-enc

# Create a volume group that will contain our root and swap partitions
vgcreate nixos-vg /dev/mapper/nixos-enc

# Create a swap partition that is 16G in size - the amount of RAM on this machine
# Volume is labeled "swap"'
lvcreate -L 16G -n swap nixos-vg

# Create a logical volume for our root filesystem from all remaining free space.
# Volume is labeled "root"
lvcreate -l 100%FREE -n root nixos-vg

# $BOOT_PARTITION is your first partition, so `/dev/nvme0n1p1` or `/dev/sda1`

# Create a FAT32 filesystem on our boot partition
mkfs.vfat -n boot $BOOT_PARTITION

# Create an ext4 filesystem for our root partition
mkfs.ext4 -L nixos /dev/nixos-vg/root

# Tell our swap partition to be a swap
mkswap -L swap /dev/nixos-vg/swap

# Turn the swap on before install
swapon /dev/nixos-vg/swap
```

Now let's mount the file system.

```sh
mount /dev/nixos-vg/root /mnt
mkdir /mnt/boot
# $BOOT_PARTITION is your first partition, so `/dev/nvme0n1p1` or `/dev/sda1`
mount $BOOT_PARTITION /mnt/boot
```

From here just generate a new configuration and replace the existing `boot` options with the following.

```nix
boot = {
  loader = {
    efi.canTouchEfiVariables = true;
    grub = {
      enable = true;
      efiSupport = true;
      device = "nodev";
    };
  };
  initrd = {
    kernelModules = ["usb_storage"];
    luks.devices.cryptroot = {
      device = "/dev/second-partition-of-your-drive"; # [!code highlight]
      preLVM = true;

      # If using a USB or SD Card for decryption include the following.
      allowDiscards = true;
      keyFileSize = 4096;
      # This is the disk id of your USB or SD Card.
      # Get this by running `ls -l /dev/disk/by-id`,
      # and copy the long string into the spot below.
      keyFile = "/dev/disk/by-id/REPLACE-HERE"; # [!code highlight]

      # Use this if you want to fallback to the encryption password
      # when the drive can't be found. HIGHLY RECCOMENDED!!!!
      fallbackToPassword = true;
    };
  };
};
```

Now just setup your configuration and run `nixos-install`

And that is it! Full Disk Encryption and remote unlocking with a flash drive.
Again if your looking for more info or run into and issue check the two links at the top of this guide.

This has been Jasper, until next time 👋
