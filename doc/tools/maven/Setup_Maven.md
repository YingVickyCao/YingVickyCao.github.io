# Setup Maven

- Download maven
  https://maven.apache.org/download.cgi
  https://www.apache.org/mirrors/

- Need JDK

```ini
# Check environment variable value
echo $JAVA_HOME

java -version
```

- Adding to PATH

```ini
# .bash_profile
export MAVEN_HOME=~/Library/maven
export PATH=${PATH}:$MAVEN_HOME/bin

# Enable path
source ~/.bash_profile

# Confirm
mvn -v
```
