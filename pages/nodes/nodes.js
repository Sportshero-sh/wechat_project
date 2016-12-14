//logs.js
import {SS_SERVER_URL}  from '../../utils/constants.js'
var QR = require("../../utils/qrcode.js");
var Base64 = require('../../utils/base64.js');

let app = getApp()
Page({
  data: {
    maskHidden:true,
    imagePath:'',
    nodes: [],
    pass: '',
    current: 0,
    port: ''
  },
  handleChange: function(e){
    let current = e.detail.current
    let volsLength = this.data.nodes.length

    if (current === volsLength) {
      this.setData({
        current: volsLength
      })
    }
 },
 //适配不同屏幕大小的canvas
  setCanvasSize:function(){
    var size={};
    try {
        var res = wx.getSystemInfoSync();
        var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth/scale;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败"+e);
      } 
    return size;
  } ,
  createQrCode:function(url,canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url,canvasId,cavW,cavH);
    var that = this;
    //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    var st = setTimeout(function(){
      that.canvasToTempImage();
      clearTimeout(st);
    },3000);
    
  },
 //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
              imagePath:tempFilePath,
          });
      },
      fail: function (res) {
          console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    var img = this.data.imagePath
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  onLoad: function () {
    wx.request({
        url: SS_SERVER_URL+'/user/_wxnode.php',
        data: {
            uid: app.globalData.uid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: (res) => {
            // success
            console.log('UserInfo Success')
            console.log(res)
            this.setData({
                nodes: res.data.nodes,
                pass: res.data.pass,
                port: res.data.port
            })
          let size = this.setCanvasSize();//动态设置画布大小
          let ssURL = this.data.nodes[0].node_method 
              + ":" + this.data.pass 
              + "@" + this.data.nodes[0].node_server
              + ":" + this.data.port;
          let initUrl = "ss://"+Base64.encode(ssURL);
          console.log(ssURL);
          console.log(initUrl);
          this.createQrCode(initUrl,"mycanvas",size.w,size.h);       },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
  }
})
