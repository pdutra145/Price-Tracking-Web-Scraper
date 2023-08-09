#!/bin/sh

if [ "$DEBUG" = "True" ]; then
    # If DEBUG is True, run your debug command
    exec sleep infinity
else
    # If DEBUG is not True, run your main command
    exec fresh
fi
