---
title: 'The Ultimate NixOS Homelab Guide - Flakes, Modules and Fail2Ban w/ Cloudflare'
description: 'In this post we will be moving all our configurations into a very simple flake, setting up Vaultwarden with Fail2Ban and finally modularizing our configuration ready for future self hosted apps.'
date: '2024-07-02'
image: /nixos-homelab-flakes-n-modules.png
categories:
  - linux
  - guide
  - nixos
published: true
---

Welcome back everyone to the NixOS homelab guide, today we will be moving all our configurations into a very simple flake, setting up Vaultwarden with Fail2Ban and finally modularizing our configuration ready for future self hosted apps.

## Contents

## Flake Setup

Moving our configuration to a flake is pretty easy so let's get straight to it.

Make a new directory in your home folder.

```
mkdir ~/.flake
cd ~/.flake
```

Now create a new `flake.nix` file at the root of that directory and open it in your text editor of choice.

```
vim flake.nix
```

Now fill out the file with the following, then I'll explain and break it down.

```nix
{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };
  outputs = {
    self,
    nixpkgs,
    ...
  } @ inputs: let
    system = "x86_64-linux";
    version = "24.11";
    user = "your-username";
    hostname = "homelab";
    pkgs = import nixpkgs {
      inherit system;
      config = { allowUnfree = true; };
    };
    lib = nixpkgs.lib;
  in {
    nixosConfigurations = {
      ${hostname} = lib.nixosSystem {
        inherit system;
        specialArgs = { inherit user hostname version; };
        modules = [
          ./nix/configuration.nix
        ];
      };
    };
  };
}
```

We initialize a flake, add the unstable nixpkgs source, set some variables we can use through our entire config (make sure to set the hostname and user variables to whatever username and hostname you used in your `configuration.nix`, we set that file up in the last post) and then create the nixosSystem inheriting our variables and then importing `configuration.nix` which we will move into our flake directory right now.

```sh
mkdir ~/.flake/nix
sudo cp /etc/nixos/* ~/.flake/nix
sudo chown $USER:users ~/.flake/nix/*
sudo chmod a+rw ~/.flake/nix/*
```

Those commands will copy our existing configurations to our new flake directory and then make sure our user have all the write permissions.

You should now have this directory structure.

```
~/.flake
├── flake.nix
└── nix
    ├── configuration.nix
    └── hardware-configuration.nix
```

Now we need to update our `configuration.nix` to work with our flake and also add some utilities.

```nix
{ config, lib, pkgs, user, hostname, version, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
    ];

  boot = {
    kernelPackages = pkgs.linuxPackages_latest;
    loader = {
      efi.canTouchEfiVariables = true;
      grub = {
        enable = true;
        efiSupport = true;
        device = "nodev";
      };
    };
  };

  nix = {
    # Enable flakes!
    settings = {
      experimental-features = [ "nix-command" "flakes" ];
      auto-optimise-store = true;
    };
  };

  nixpkgs.config.allowUnfree = true;

  networking = {
    hostName = "${hostname}";
    networkmanager = {
      enable = true;
    };
  };

  # Your timezone
  time.timeZone = "Australia/Sydney";

  users.users.${user} = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ]; # Enable ‘sudo’ for the user with wheel.
    home = "/home/${user}";
    shell = pkgs.zsh;
  };

  programs = {
    # Personal preference
    zsh.enable = true;

    nh = {
      enable = true;
      flake = "/home/${user}/.flake";
    };
  };

  environment.systemPackages = with pkgs; [
    vim
  ];

  # Enable the OpenSSH daemon.
  services.openssh.enable = true;

  system.stateVersion = "${version}";

}
```

Now our config will make use of the `user`, `hostname` and `version` variables we created in our `flake.nix`.

Now we are finally ready to apply our new config, run the below command. (replace `homelab` with whatever the `hostname` variable is in your `flake.nix`)

```sh
sudo nixos-rebuild boot --flake /home/$USER/.flake#homelab
```

If any errors come up please leave a comment below and I'll be happy to help troubleshoot.
If the command completes and there were no issues then you can just run `sudo reboot`.

## Fail2Ban and Modularization

In this example I am setting up Fail2Ban for a local Vaultwarden server, you will need to adapt this based on the Fail2Ban instructions for your software.

Let's start and creating a folder at `~/.flake/nix/modules`

```
mkdir ~/.flake/nix/modules
```

In there let's open up a new file and you can name it either `fail2ban.nix` or `vaultwarden.nix` if that is the service you are protecting. (name doesn't matter that much its just semantics).

In that file start with this content:

```nix
{ pkgs, lib, config, user, ... }:

{
  services.fail2ban = {
    enable = true;
  };
}
```

Throughout this I'll be referring to these pages:
https://nixos.wiki/wiki/Fail2ban
https://github.com/dani-garcia/vaultwarden/wiki/Fail2Ban-Setup
https://github.com/fail2ban/fail2ban/blob/master/config/action.d/cloudflare.conf

Now I assume if your setting up Fail2Ban you understand how it works and what it is, so you may be asking, alright so how can I create stuff like Jails and custom actions and filters.

Well Nix has you covered. Let's take a look at my Jail configuration for Vaultwarden.

```nix
{ pkgs, lib, config, user, ... }:

{
  services.fail2ban = {
    enable = true;
    jails = {
      vaultwarden.settings = {
        enabled = true;
        filter = "vaultwarden";
        action = ''
          cf
          iptables-allports
        '';
        # This is the path where I have my vaultwarden data
        logpath = "/home/${user}/vaultwarden/vw-data/vaultwarden.log";
        # User gets banned after 4 incorrect attempts
        maxretry = 4;
        bantime = "52w";
        findtime = "52w";
        chain = "FORWARD";
      };
    };
  };
}
```

"Ok awesome but what is the `cf` action and what about the vaultwarden filter, how do i set that up on NixOS when /etc is read-only?"

Fear not because here is `environment.etc`

```nix
{ pkgs, lib, config, user, ... }:

{
  environment.etc = {
    "fail2ban/filter.d/vaultwarden.local".text = pkgs.lib.mkDefault (pkgs.lib.mkAfter ''
      [INCLUDES]
      before = common.conf

      [Definition]
      failregex = ^.*Username or password is incorrect\. Try again\. IP: <ADDR>\. Username:.*$
      ignoreregex =
    '');
  };

  services.fail2ban = {
    # ...
  };
}
```

You may recognise that string for the first child of `etc` it is the fail2ban path for custom filters!

Now let's add the `cf` action which is for banning through Cloudflare. You only need this if you have made your Vaultwarden instance public via Cloudflare/-Tunnels.

```nix
  environment.etc = {
    "fail2ban/action.d/cf.conf".text = pkgs.lib.mkDefault (pkgs.lib.mkAfter ''
      [Definition]

      actionstart =
      actionstop =
      actioncheck =

      actionban = /run/current-system/sw/bin/curl -s -o /dev/null -X POST \
            -H "X-Auth-Email: <cfuser>" \
            -H "X-Auth-Key: <cftoken>" \
            -H "Content-Type: application/json" \
            -d '{"mode":"block","configuration":{"target":"ip","value":"<ip>"},"notes":"Fail2Ban <name>"}' \
            "https://api.cloudflare.com/client/v4/user/firewall/access_rules/rules"

      actionunban = /run/current-system/sw/bin/curl -s -o /dev/null -X DELETE -H 'X-Auth-Email: <cfuser>' -H 'X-Auth-Key: <cftoken>' \
            https://api.cloudflare.com/client/v4/user/firewall/access_rules/rules/$(/run/current-system/sw/bin/curl -s -X GET -H 'X-Auth-Email: <cfuser>' -H 'X-Auth-Key: <cftoken>' \
            'https://api.cloudflare.com/client/v4/user/firewall/access_rules/rules?mode=block&configuration_target=ip&configuration_value=&page=1&per_page=1' | tr -d '\n' | cut -d'"' -f6)

      [Init]
      cftoken = your-token

      cfuser = jasper-at-windswept@example.com

    '');
  };
```

Again you can see that the initial string just references the path as a child of `/etc`. It should be pretty conclusive from there how to add your own actions and filters.
And if ever in doubt, check the NixOS Wiki and search.nixos.org for options relating to fail2ban.

As a side note, getting this to work took me literal days so yeah, haha.

Now to get this to work in our config add the following to your `configuration.nix`

```
{ config, lib, pkgs, user, hostname, version, ... }:

{
  imports = [
    ./hardware-configuration.nix
    ./modules/vaultwarden.nix
  ];
}
```

Now since we moved to a flake and I snuck `nh` into your configuration you can run the super simple command:

- `nh os switch`

This will rebuild your system and switch over to it automatically based on the flake path we provided earlier, `~/.flake`

## Securing your Server

Well this is a pretty big post now isn't it.
The best way I secure my server is by disabling SSH via password and only allowing my personal private key.

This can be done as follows:

On your personal computer (the one with your private key)

- `ssh-copy-id -i ~/.ssh/private_key.pub admin@your.homelab.ip.address`

You should also change your `~/.ssh/config` on your PC to use that private key when connecting to your homeserver.

```
Host your.homelab.ip.address
  IdentityFile ~/.ssh/private
```

- **KEEP A LOGGED IN TERMINAL TO YOUR SERVER OPEN BEFORE REBUILDING WITH PASSWORDS DISABLED AS IF ANYTHING GOES WRONG YOU WILL BE LOCKED OUT!!!**

On your homeserver open up `~/.ssh/authorized_keys` and copy the newly created string.

`configuration.nix`

```nix
{
  users.users.${user} = {
    # ...
    openssh.authorizedKeys = [
      # Paste your key into double quotes here
      # Example:
      "ssh-ed25519 AAAA------------ jasper@nixos"
    ];
  };

  services = {
    openssh = {
      enable = true;
      settings = {
        PasswordAuthentication = false;
      };
    };
  };
}
```

Then rebuild, this time though we will use the `boot` option and restart the server.

```
nh os boot
reboot
```

Now on your personal computer, open a new terminal and try to connect to the server via SSH. If you connect with the password being requested then hurray, you have just secured your server!

If you have any troubles please leave a comment or contact me on Discord (`jasper_clarke`) and I will try to help out!

This has been Jasper, until next time 👋
