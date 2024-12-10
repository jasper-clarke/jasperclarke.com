{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShellNoCC {
  packages = with pkgs; [
    nodejs
    nodePackages.pnpm
  ];
  shellHook = ''
    export PNPM_HOME=$HOME/Projects/NodeProjects/pnpm-bin
    export PATH=$PNPM_HOME:$PATH
  '';
}
