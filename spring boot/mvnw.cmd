@echo off
rem ----------------------------------------------------------------------------
rem Maven Wrapper
rem ----------------------------------------------------------------------------
setlocal
set MVNW_DIR=%~dp0.mvn\wrapper
set MVNW_JAR=%MVNW_DIR%\maven-wrapper.jar

if not exist "%MVNW_JAR%" (
  echo Downloading the Maven Wrapper jar...
  powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://repo1.maven.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar','%MVNW_JAR%')"
)

java -jar "%MVNW_JAR%" %*
