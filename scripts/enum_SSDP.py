import socket
 
# M-Search message body
MS = \
    'M-SEARCH * HTTP/1.1\r\n' \
    'HOST:10.10.10.203:5985\r\n' \
    'ST:upnp:rootdevice\r\n' \
    'MX:2\r\n' \
    'MAN:"ssdp:discover"\r\n' \
    '\r\n'
 
# Set up a UDP socket for multicast
SOC = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
SOC.settimeout(2)
 
# Send M-Search message to multicast address for UPNP
SOC.sendto(MS.encode('utf-8'), ('10.10.10.203', 5985) )
 
#listen and capture returned responses
try:
    while True:
        data, addr = SOC.recvfrom(8192)
        print (addr, data)
except socket.timeout:
        pass