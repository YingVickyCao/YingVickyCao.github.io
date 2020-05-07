# Anaconda

Anaconda 是 Python 的包管理器和环境管理器, 用来管理不同版本的 Python 环境，并自带软件包。

- 管理包  
  Anaconda 基于 conda（一个包管理器和环境管理器）。  
  使用 conda 来安装、卸载和更新包。
- 管理环境  
  为不同的项目建立不同的运行环境。  
  切换时不导致包版本混乱和错误。

# 1 Download Anaconda

https://www.anaconda.com/distribution/  
Anaconda3-2019.10-MacOSX-x86_64.pkg

# 2 Check Anaconda version

```
# If 提示conda不是内容命令，则手动配置系统环境变量。
# Mac 安装时自动设置了环境变量
$ conda info

     active environment : base
    active env location : /Users/hades/opt/anaconda3
            shell level : 1
       user config file : /Users/hades/.condarc
 populated config files : /Users/hades/.condarc
          conda version : 4.7.12
    conda-build version : 3.18.9
         python version : 3.7.4.final.0
       virtual packages :
       base environment : /Users/hades/opt/anaconda3  (writable)
           channel URLs : https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/osx-64
                          https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/noarch
                          https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/osx-64
                          https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/noarch
                          https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/osx-64
                          https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/noarch
                          https://repo.anaconda.com/pkgs/main/osx-64
                          https://repo.anaconda.com/pkgs/main/noarch
                          https://repo.anaconda.com/pkgs/r/osx-64
                          https://repo.anaconda.com/pkgs/r/noarch
          package cache : /Users/hades/opt/anaconda3/pkgs
                          /Users/hades/.conda/pkgs
       envs directories : /Users/hades/opt/anaconda3/envs
                          /Users/hades/.conda/envs
               platform : osx-64
             user-agent : conda/4.7.12 requests/2.22.0 CPython/3.7.4 Darwin/18.7.0 OSX/10.14.6
                UID:GID : 501:20
             netrc file : None
           offline mode : False

```

# 3 手动配置系统环境变量

```
-> Path
D:\ProgramData\Anaconda3;
D:\ProgramData\Anaconda3\Scripts;
D:\ProgramData\Anaconda3\Library\mingw-w64\bin;
D:\ProgramData\Anaconda3\Library\usr\bin;
D:\ProgramData\Anaconda3\Library\bin;
```

# 4 设置 Anaconda 镜像，加速下载包

- Set channels

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --set show_channel_urls yes
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
```

```
# ~/.condarc
ssl_verify: true
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - defaults
show_channel_urls: true
```

- Check channels

```
(base) 192:Desktop hades$ conda config --get channels
--add channels 'defaults'   # lowest priority
--add channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/'
--add channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/'
--add channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/'   # highest priority
```

```
(base) 192:Desktop hades$ conda config --shwo channels
usage: conda [-h] [-V] command ...
conda: error: unrecognized arguments: --shwo channels
(base) 192:Desktop hades$ conda config --show channels
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - defaults
```

# 5 conda 管理包

## Search package all versons

```
$ conda search pymssql
Loading channels: done
# Name                       Version           Build  					Channel
pymssql                        2.1.3          py27_0 					 anaconda/pkgs/free
pymssql                        2.1.3          py34_0  					anaconda/pkgs/free
pymssql                        2.1.3          py35_0  					anaconda/pkgs/free
pymssql                 2.1.3.post16    py27_0  					anaconda/cloud/conda-forge
pymssql                 2.1.3.post16    py35_0  					anaconda/cloud/conda-forge
pymssql                 2.1.3.post16    py36_0  					anaconda/cloud/conda-forge
pymssql                        2.1.4 	py27h0a44026_2001  		anaconda/cloud/conda-forge
pymssql                        2.1.4  	py27h1de35cc_0  			pkgs/main
pymssql                        2.1.4 	py27hfc679d8_1001  anaconda/cloud/conda-forge
pymssql                        2.1.4  	py35h1de35cc_0  pkgs/main
pymssql                        2.1.4 	py36h0a44026_2001  anaconda/cloud/conda-forge
pymssql                        2.1.4 	 py36h1de35cc_0  pkgs/main
pymssql                        2.1.4 	py36hfc679d8_1001  anaconda/cloud/conda-forge
pymssql                        2.1.4 	py37h0a44026_2001  anaconda/cloud/conda-forge
pymssql                        2.1.4 	 py37h1de35cc_0  pkgs/main
pymssql                        2.1.4 	py37hfc679d8_1001  anaconda/clo
```

## Install from Online 安装包

- `conda install pymssql`

```
# Last version
(base) 192:$ conda install pymssql
Collecting package metadata (current_repodata.json): done
Solving environment: done


==> WARNING: A newer version of conda exists. <==
  current version: 4.7.12
  latest version: 4.8.0rc0

Please update conda by running

    $ conda update -n base -c defaults conda



## Package Plan ##

  environment location: /Users/hades/opt/anaconda3

  added / updated specs:
    - pymssql


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    certifi-2019.9.11          |           py37_0         147 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    conda-4.7.12               |           py37_0         3.0 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    freetds-1.1rc3             |       h821aae6_0         2.3 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    pymssql-2.1.4              |py37h0a44026_2001         214 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    ------------------------------------------------------------
                                           Total:         5.7 MB

The following NEW packages will be INSTALLED:

  freetds            anaconda/cloud/conda-forge/osx-64::freetds-1.1rc3-h821aae6_0
  pymssql            anaconda/cloud/conda-forge/osx-64::pymssql-2.1.4-py37h0a44026_2001

The following packages will be SUPERSEDED by a higher-priority channel:

  certifi                                         pkgs/main --> anaconda/cloud/conda-forge
  conda                                           pkgs/main --> anaconda/cloud/conda-forge


Proceed ([y]/n)? y


Downloading and Extracting Packages
freetds-1.1rc3       | 2.3 MB    | ################################################################################################################################################################# | 100%
pymssql-2.1.4        | 214 KB    | ################################################################################################################################################################# | 100%
conda-4.7.12         | 3.0 MB    | ################################################################################################################################################################# | 100%
certifi-2019.9.11    | 147 KB    | ################################################################################################################################################################# | 100%
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
```

Where is pymssql installed ？

```
opt/anaconda3/pkgs/pymssql-2.1.4-py37h0a44026_2001
```

- Specific package version

```
# specific version
conda install pymssql=2.14
```

- Specific environment

```
# 环境 python_3_7_4 安装pymssql
$ conda install -n python_3_7_4 pymssql
$ conda install --name python_3_7_4 pymssql
```

- `pip install`

```
(python_3_7_4)$  pip install pygame

(python_3_7_4)$ conda list
# packages in environment at /Users/hades/opt/anaconda3/envs/python_3_7_4:
#
# Name                    Version                   Build  Channel
pip                       19.3.1                   py37_0    https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
pygame                    1.9.6                    pypi_0    pypi
```

## Install From offline 安装包

### conda

Step 1: Downlaod  
https://anaconda.org/search?q=pymssql  
https://repo.anaconda.com/pkgs/

Step 2: Install from local

https://conda.io/en/latest/  
https://conda.io/projects/conda/en/latest/commands.html#conda-general-commands

```
# Saved on ~/Downloads
conda install --use-local  ~/Downloads/pymssql-2.1.4-py37h7b6447c_0.tar.bz2
```

Step 3 : Where is pymssql installed ？

```
# Search pymssql-2.1.4-py37h7b6447c_0
opt/anaconda3/pkgs/pymssql-2.1.4-py37h7b6447c_0
```

### Pip

```
$ pip --version
pip 19.2.3 from /Users/hades/opt/anaconda3/lib/python3.7/site-packages/pip (python 3.7)
```

Step 1: Downlaod  
https://pypi.org/search/?q=pymssql

Step 2: Install from local  
https://packaging.python.org/tutorials/installing-packages/

```
pip install ~/Downloads/pymssql-3.0.3.tar.gz

```

Step 3 : Where is pymssql installed ？(TBD)

## 删除包

```
conda remove matplotlib
```

## 更新包

```
$ conda update matplotlib

# update conda
$ conda update -n base -c defaults conda

# 更新指定环境下的包,python27,etc.
conda update -n python27
```

## 查询已安装的包（/版本）

```
# 查看当前环境下安装的包
$ conda list

# 查看指定环境下安装的包,python27,etc.
$ conda list -n python27

# etc pip
$ pip --version
pip 7.0.3 from /usr/local/lib/python3.5/dist-packages (python 3.5)

# etc pygame
$ python
>>> import pygame

```

# 6 环境管理

## 创建环境

```
# 创建python2.7版本的环境
$ conda create -n python27 python=2.7
Collecting package metadata (current_repodata.json): done
Solving environment: done


==> WARNING: A newer version of conda exists. <==
  current version: 4.7.12
  latest version: 4.8.0rc0

Please update conda by running

    $ conda update -n base -c defaults conda



## Package Plan ##

  environment location: /Users/hades/opt/anaconda3/envs/python27

  added / updated specs:
    - python=2.7


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    ca-certificates-2019.9.11  |       hecc5488_0         143 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    certifi-2019.9.11          |           py27_0         147 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    libcxx-9.0.0               |       h89e68fa_1         1.0 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    libffi-3.2.1               |    h6de7cb9_1006          43 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    ncurses-6.1                |    h0a44026_1002         1.3 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    openssl-1.1.1d             |       h0b31af3_0         1.9 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    pip-19.3.1                 |           py27_0         1.9 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    python-2.7.15              |    hd51d24c_1009        12.2 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    readline-8.0               |       hcfe32e1_0         415 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    setuptools-41.6.0          |           py27_1         622 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    sqlite-3.30.1              |       h93121df_0         2.5 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    tk-8.6.9                   |    h2573ce8_1003         3.2 MB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    wheel-0.33.6               |           py27_0          35 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    zlib-1.2.11                |    h0b31af3_1006         101 KB  https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
    ------------------------------------------------------------
                                           Total:        25.4 MB

The following NEW packages will be INSTALLED:

  ca-certificates    anaconda/cloud/conda-forge/osx-64::ca-certificates-2019.9.11-hecc5488_0
  certifi            anaconda/cloud/conda-forge/osx-64::certifi-2019.9.11-py27_0
  libcxx             anaconda/cloud/conda-forge/osx-64::libcxx-9.0.0-h89e68fa_1
  libffi             anaconda/cloud/conda-forge/osx-64::libffi-3.2.1-h6de7cb9_1006
  ncurses            anaconda/cloud/conda-forge/osx-64::ncurses-6.1-h0a44026_1002
  openssl            anaconda/cloud/conda-forge/osx-64::openssl-1.1.1d-h0b31af3_0
  pip                anaconda/cloud/conda-forge/osx-64::pip-19.3.1-py27_0
  python             anaconda/cloud/conda-forge/osx-64::python-2.7.15-hd51d24c_1009
  readline           anaconda/cloud/conda-forge/osx-64::readline-8.0-hcfe32e1_0
  setuptools         anaconda/cloud/conda-forge/osx-64::setuptools-41.6.0-py27_1
  sqlite             anaconda/cloud/conda-forge/osx-64::sqlite-3.30.1-h93121df_0
  tk                 anaconda/cloud/conda-forge/osx-64::tk-8.6.9-h2573ce8_1003
  wheel              anaconda/cloud/conda-forge/osx-64::wheel-0.33.6-py27_0
  zlib               anaconda/cloud/conda-forge/osx-64::zlib-1.2.11-h0b31af3_1006


Proceed ([y]/n)? y


Downloading and Extracting Packages
setuptools-41.6.0    | 622 KB    | ############################################################################################################################################################### | 100%
pip-19.3.1           | 1.9 MB    | ############################################################################################################################################################### | 100%
ncurses-6.1          | 1.3 MB    | ############################################################################################################################################################### | 100%
wheel-0.33.6         | 35 KB     | ############################################################################################################################################################### | 100%
zlib-1.2.11          | 101 KB    | ############################################################################################################################################################### | 100%
certifi-2019.9.11    | 147 KB    | ############################################################################################################################################################### | 100%
python-2.7.15        | 12.2 MB   | ############################################################################################################################################################### | 100%
libcxx-9.0.0         | 1.0 MB    | ############################################################################################################################################################### | 100%
readline-8.0         | 415 KB    | ############################################################################################################################################################### | 100%
libffi-3.2.1         | 43 KB     | ############################################################################################################################################################### | 100%
sqlite-3.30.1        | 2.5 MB    | ############################################################################################################################################################### | 100%
tk-8.6.9             | 3.2 MB    | ############################################################################################################################################################### | 100%
openssl-1.1.1d       | 1.9 MB    | ############################################################################################################################################################### | 100%
ca-certificates-2019 | 143 KB    | ############################################################################################################################################################### | 100%
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
#
# To activate this environment, use
#
#     $ conda activate python27
#
# To deactivate an active environment, use
#
#     $ conda deactivate
```

```
# Current use is env python_3_7_4
# Python 3.7.4
~/opt/anaconda3/envs/python_3_7_4/bin/python
```

## 进入环境

```
#进入python27环境
conda activate python27
(base) 192:~ hades$ conda activate python27
(python27) 192:~ hades$ deactivate
```

## 离开环境

```
(python27) 192:~ hades$ conda deactivate
(base) 192:~ hades$
```

## 共享环境

在 GitHub 上共享代码时，最好同样创建环境文件并将其包括在代码库中。这能让其他人更轻松地安装代码的所有依赖项。

Step 1 : 当前环境

```
#将your 当前环境保存到文件中包保存为YAML文件
conda env export > environment.yaml
```

```
# environment.yaml
name: python27
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - defaults
dependencies:
  - ca-certificates=2019.9.11=hecc5488_0
  - certifi=2019.9.11=py27_0
  - libcxx=9.0.0=h89e68fa_1
  - libffi=3.2.1=h6de7cb9_1006
  - ncurses=6.1=h0a44026_1002
  - openssl=1.1.1d=h0b31af3_0
  - pip=19.3.1=py27_0
  - python=2.7.15=hd51d24c_1009
  - readline=8.0=hcfe32e1_0
  - setuptools=41.6.0=py27_1
  - sqlite=3.30.1=h93121df_0
  - tk=8.6.9=h2573ce8_1003
  - wheel=0.33.6=py27_0
  - zlib=1.2.11=h0b31af3_1006
prefix: /Users/hades/opt/anaconda3/envs/python27
```

Step 2 : 其他电脑根据导出的环境文件，更新/新建环境

```
# 根据导出.yaml文件，更新环境
#-f:导出文件在本地的路径
conda env update -f=/path/to/environment.yml

根据导出.yaml文件，新建环境
conda env create --name snakemake --file snakemake.yaml
```

## 列出创建的所有环境

```
(python27) 192:Desktop hades$ conda env list
# conda environments:
#
base                     /Users/hades/opt/anaconda3 				// 默认的环境为base
python27              *  /Users/hades/opt/anaconda3/envs/python27  // 当前所在环境
```

## 删除环境

```
# 删除 python27 环境及下属所有包
$ conda env remove -n python27
Remove all packages in environment /Users/hades/opt/anaconda3/envs/python27:
```

# Refs:

- https://www.jianshu.com/p/026a2c43b081
