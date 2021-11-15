class ApiResponse {
  setStatus(status) {
    this.status = status;
    return this;
  }

  setMessage(msg) {
    this.message = msg;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  build() {
    return {
      status: this.status,
      data: this.data,
      message: this.message,
    };
  }
}

module.exports = ApiResponse;
