i=1
max=65535
while [ $i -lt $max ]
do
    echo "Port: $i"
    nc -w 1 -v 172.17.0.1 $i </dev/null; echo $?
    true $(( i++ ))
done