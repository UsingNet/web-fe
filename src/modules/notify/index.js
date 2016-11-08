class Notify {
  phoneRing = null;
  messageRing = null;
  phoneTimer = null;
  messageTimer = null;
  titleTimer = null;

  constructor() {
    this.phoneRing = document.createElement('audio');
    document.body.appendChild(this.phoneRing);
    this.phoneRing.src = '/resource/phoneRing.mp3';
    this.messageRing = document.createElement('audio');
    document.body.appendChild(this.messageRing);
    this.messageRing.src = '/resource/messageRing.mp3';
  }

  notification = (orderId, name, msg, callback) => {
    if (window.Notification) {
      Notification.requestPermission(() => {
        const n = new Notification(name, {
          icon: '//o1hpnn7d6.qnssl.com/company-logo3.png',
          body: msg,
        }); // 显示通知
        n.onclick = () => {
          callback();
          n.close();
        };
      });
    }

    let i = 0;
    if (!this.titleTimer) {
      this.titleTimer = setInterval(() => {
        i++;
        if (i % 2) {
          document.title = '【　　　】- 优信';
        } else {
          document.title = '【新消息】- 优信';
        }
      }, 300);
    }
  };

  phone = (orderId, name, push) => {
    const msg = '来电';
    if (!this.phoneTimer) {
      const self = this;
      this.phoneTimer = setInterval(() => {
        self.phoneRing.play();
      }, 30000);
      self.phoneRing.play();
      this.notification(orderId, name, msg, push);
    }
  };

  message = (orderId, name, callback) => {
    const msg = '发来一条消息';
    if (!this.messageTimer) {
      const self = this;
      this.messageTimer = setInterval(() => {
        self.messageRing.play();
      }, 3000);
      self.messageRing.play();
      this.notification(orderId, name, msg, callback);
    }
  }

  clearMessage = () => {
    if (this.messageTimer) {
      clearInterval(this.messageTimer);
      this.messageTimer = null;
    }
    if (this.titleTimer) {
      clearInterval(this.titleTimer);
      this.titleTimer = null;
    }
  }

  clearPhone = () => {
    if (this.titleTimer) {
      clearInterval(this.titleTimer);
      this.titleTimer = null;
    }
    if (this.phoneTimer) {
      clearInterval(this.phoneTimer);
      this.phoneTimer = null;
    }
  }
}

export default new Notify;
