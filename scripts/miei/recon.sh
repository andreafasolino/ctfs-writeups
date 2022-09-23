#!/bin/#!/usr/bin/env bash
masscan -p1-65535 --rate 1000 --banners --open -e tun0 $1
