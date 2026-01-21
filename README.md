## Made possible by

This plugin is based on the Decky plugin template provided by  
[SteamDeckHomebrew/decky-plugin-template](https://github.com/SteamDeckHomebrew/decky-plugin-template).

# Steam Deck Home Assistant Battery

This Decky Loader plugin publishes the Steam Deck battery level and charging
using MQTT.

## Features
- Battery level sensor
- Charging status sensor
- Configurable low battery threshold
- Immediate alert when threshold is crossed
- Fully configurable from Gaming Mode

## Requirements
- Decky Loader
- MQTT broker (e.g. Mosquitto)

## MQTT Topics
- steamdeck/battery/level
- steamdeck/battery/charging
- steamdeck/battery/alert

## Privacy
This plugin only sends battery-related information to a user-configured
MQTT broker.
