FROM node:10.0

# 在容器中创建一个目录
RUN mkdir -p /usr/src/nodejs/

# 定位到容器的工作目录
WORKDIR /usr/src/nodejs/

# RUN/COPY 是分层的，package.json 提前，只没有修改，就不会重新安装包
COPY package.json /usr/src/nodejs/package.json
RUN cd /usr/src/nodejs/
RUN npm i

# 把当前目录下的所有文件拷贝到 Image 的 /usr/src/nodejs/ 目录下

COPY . /usr/src/nodejs/

EXPOSE 30010
CMD npm start