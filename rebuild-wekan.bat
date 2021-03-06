@ECHO OFF

REM IN PROGRESS: Build on Windows.
REM https://github.com/wekan/wekan/wiki/Install-Wekan-from-source-on-Windows
REM Please add fix PRs, like config of MongoDB etc.

REM Install chocolatey
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

choco install -y git curl python2 dotnet4.5.2 nano mongodb-3 mongoclient meteor

curl -O https://nodejs.org/dist/v8.12.0/node-v8.12.0-x64.msi
call node-v8.12.0-x64.msi

call npm config -g set msvs_version 2015
call meteor npm config -g set msvs_version 2015

call npm -g install npm
call npm -g install node-gyp
call npm -g install fibers@2.0.0
cd d:\
git clone https://github.com/ShmuelPick/wekan
cd wekan
git checkout master
echo "Building Wekan."
REM del /S /F /Q packages
md packages
cd packages
git clone --depth 1 -b master https://github.com/wekan/flow-router.git kadira-flow-router
git clone --depth 1 -b master https://github.com/meteor-useraccounts/core.git meteor-useraccounts-core
git clone --depth 1 -b master https://github.com/wekan/meteor-accounts-cas.git
git clone --depth 1 -b master https://github.com/wekan/wekan-ldap.git
REM sed -i 's/api\.versionsFrom/\/\/api.versionsFrom/' ~/work/wekan/packages/meteor-useraccounts-core/package.js
cd ..
REM del /S /F /Q node_modules
call meteor npm install
REM del /S /F /Q .build
call meteor build .build --directory
copy fix-download-unicode\cfs_access-point.txt .build\bundle\programs\server\packages\cfs_access-point.js
cd .build\bundle\programs\server
call meteor npm install
REM cd C:\dev\work\wekan\.meteor\local\build\programs\server
REM del node_modules
cd d:\wekan
call start-wekan.bat
