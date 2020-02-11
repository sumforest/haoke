import DataPacket from "./DataPacket.js"
import IMEvent from "./IMEvent.js"

/**
 * 通讯客户端
 */
class IMClient {
  constructor(url) {
      this._url = url;
      this._autoConnect = true;
      this._handlers = {};
      this._DataPacketQueue = [];
      this._isOpened = false;

      this.addEventListener(IMEvent.CONNECTED, () => {
        this.serverOnConnected();
      })

      // this.addEventListener(IMEvent.CONNECTED, () => {
      //   this.clearMsgQueue();
      // })

      this.addEventListener(IMEvent.DISCONNECTED, () => {
        this.serverOnDisconnected();
      })
    }
    /**
     * 底层通讯函数回调
     */
    // 连接
  connect() {
    if (!this._socket) {
      this._socket = new WebSocket(this._url);

      this._socket.onmessage = (evt) => {
        this.onMessage(evt.data);
      }
      this._socket.onopen = (ws) => {
        this.onOpen(ws);
      }
      this._socket.onclose = ws => {
        this.onClose(ws);
      }
      this._socket.onerror = ws => {
        this.onError(ws);
      };
    }
  }

  // 消息接收
  onMessage(message) {
    if (typeof message === "string") {
      this.dispatchMessage(message);
    }
  }

  // 打开回调
  onOpen() {
    this.emitEvent(IMEvent.CONNECTED);
  }

  // 关闭回调
  onClose() {
    this._socket = undefined;
    this.emitEvent(IMEvent.DISCONNECTED);
    if (this.autoReconnect) {
      setTimeout(() => {
        this.connect();
      }, 5000);
    }
  }

  // 出现错误回调
  onError() {
    this._socket = undefined;
    if (this.autoReconnect) {
      setTimeout(() => {
        this.connect();
      }, 5000);
    }
  }

  // 向服务器发送数据包
  sendDataPacket(dataPacket) {
    if (this._isOpened) {
      this._socket.send(dataPacket.rawMessage);
    } else {
      this._DataPacketQueue.push(dataPacket);
    }
  }

  /**
   * 事件处理
   */
  // 当连接服务器时处理
  serverOnConnected() {
    this._isOpened = true;
  }

  // 当断开连接服务器时处理
  serverOnDisconnected() {
    this._isOpened = false;
  }

  // 清空消息队列
  clearMsgQueue() {
    if (this._DataPacketQueue.length > 0) {
      this._DataPacketQueue.forEach(dataPacket => {
        this.sendDataPacket(dataPacket);
      });
      this._socketMsgQueue = [];
    }
  }


  /**
   * 发射事件
   * @param {string} type 事件类型
   * @param {参数列表} args 传递事件参数
   */
  emitEvent(type, ...args) {
    if (this._handlers[type] && this._handlers[type].length > 0) {
      let handlers = this._handlers[type];
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(this, ...args);
      }
    }
  }

  /**
   * 添加事件监听
   * 
   * @param {string} type 事件类型
   * @param {Function} callback 事件处理函数
   */
  addEventListener(type, handler) {
    if (!this._handlers[type]) {
      this._handlers[type] = [];
    }
    this._handlers[type].push(handler);
  }

  /**
   * 移除事件
   * 
   * @param {string} type 事件类型
   * @param {*} callback 
   */
  removeEventListener(type, handler) {
    if (this._handlers[type] && this._handlers[type].length > 0) {
      let handlers = this._handlers[type];
      for (var i = handlers.length - 1; i >= 0; i--) {
        if (handler === handlers[i]) {
          handlers.splice(i, 1);
        }
      }
    }
  }

  /**
   * 消息封装成数据包
   */
  dispatchMessage(message) {
    let dataPacket = new DataPacket(message);
    if (dataPacket.data) {
      this.dispatchDataPacket(dataPacket);
    }
  }

  /**
   * 处理数据包
   */
  dispatchDataPacket(dataPacket) {
    this.emitEvent(dataPacket.type, dataPacket);
  }
}

export default IMClient
