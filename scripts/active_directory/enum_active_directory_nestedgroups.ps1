#1) get the LDAP provider path
#get domain obj with all the info needed to build the LDAP provider path
$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
#Primary Domain Controller hostname
$PDC =($domainObj.PdcRoleOwner).Name
#final query string ($SearchString) -> LDAP://HostName[:PortNumer][/DistinguishedName]
$SearchString = "LDAP://"
$SearchString += $PDC + "/"
#DistinguishedName done from domain name broken down into individual domain components -> corp.com -> DC=corp,DC=com
$DistinguishedName = "DC=$($domainObj.Name.Replace('.',',DC='))"
$SearchString += $DistinguishedName

#print SearchString
$SearchString

#2) instantiate the DirectorySearcher based on the LDAP provider path to execute all the queries
$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)
$objDomain = New-Object System.DirectoryServices.DirectoryEntry
#search all active directory because no path has been given to objDomain (no argument passed to the contructor)
$Searcher.SearchRoot = $objDomain

#3) set filter
$Searcher.filter="(objectClass=Group)"
#$Searcher.filter="(name=Secret_Group)"

$Result = $Searcher.FindAll()

#4) cleanup output to make it more readable
Foreach($obj in $Result){
    $obj.Properties.Name    #print groups name if filter = (objectClass=Group)
    #to print members of a group when filter= (name=Secret_Group), it may print names of nested groups or users directly in a group
    #$obj.Properties.member     
}


