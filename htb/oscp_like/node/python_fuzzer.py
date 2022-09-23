from os import wait
import socket
import time
import sys

def main():
    try:
        print("start")

        try:
            with open('big.txt', 'r') as infile:
                print("reading file")
                # for line in infile:
                #     print(line.strip())
                wordSet = set(line.strip() for line in infile)
                # print(wordSet)
        except IOError:
            print('error opening file')

        for word in wordSet:
            # inputBuffer = "A" * size
    
            # content = "username="+inputBuffer+"&password=A"
        
            buffer = "GET /api/"+ word +"HTTP/1.1\r\n"
            buffer += "Host: 10.10.10.58\r\n"
            buffer += "User-Agent: Mozilla/5.0 (X11; Linux_86_64; rv:52.0) Gecko/20100101 Firefox/52.0\r\n"
            buffer += "Accept: application/json, text/plain, */*\r\n"
            buffer += "Accept-Language: en-US,en;q=0.5\r\n"
            buffer += "Accept-Encoding: gzip, deflate"
            buffer += "Referer: http://10.10.10.58:3000/\r\n"
            buffer += "Connection: close\r\n"
            buffer += "Content-Type: application/x-www-form-urlencoded\r\n"
            # buffer += "Content-Length: "+str(len(content))+"\r\n"
            buffer += "\r\n"
            # buffer += content

            s=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect("10.10.10.58",3000)
            s.send(buffer)


            s.close()

            time.sleep(10)
    except:
        print("Could not connect")
        sys.exit()



if __name__=="__main__":
    main()
