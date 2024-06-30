FROM emscripten/emsdk

ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Bazel version.
# Ref: https://github.com/bazelbuild/bazelisk/releases
ENV BAZEL_VERSION=1.20.0

# Protoc version.
# Ref: https://github.com/protocolbuffers/protobuf/releases
ENV PROTOC_VERSION=27.2

# Install Bazel. This is taken from:
# Ref: https://bazel.build/versions/6.0.0/install/ubuntu#add-dis-uri


WORKDIR /tmp/install/bazel
RUN wget https://github.com/bazelbuild/bazelisk/releases/download/v${BAZEL_VERSION}/bazelisk-linux-amd64
RUN chmod a+x bazelisk-linux-amd64
RUN sudo mv bazelisk-linux-amd64 /usr/local/bin/bazel
RUN rm -frv /tmp/install/bazel
RUN echo $(bazel --version)


# Install Protocol buffer compiler.
WORKDIR /tmp/install/pb
RUN curl -LO "https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip"
RUN unzip "protoc-${PROTOC_VERSION}-linux-x86_64.zip" -d /usr/share/protoc
RUN ln -s /usr/share/protoc/bin/protoc /usr/bin/protoc
RUN rm -frv /tmp/install/pb

# Add user.
# Create the user
#RUN groupadd --gid $USER_GID $USERNAME \
    #&& useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    #&& apt-get update \
    #&& apt-get install -y sudo \
    #&& echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    #&& chmod 0440 /etc/sudoers.d/$USERNAME
