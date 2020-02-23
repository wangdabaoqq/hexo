var http = require('http');			// http 网路
var cheerio = require('cheerio');	// html 解析
var fs = require("fs");				// 流
const request = require('request');
var baseUrl = 'https://api.instagram.com/v1/users/5601660036/media/recent/?access_token=5601660036.1677ed0.d36b1b706d704a3d972f2a588723cb94';

/**
 * 根据url和参数获取分页内容
 * @param {String}： url
 * @param {int}： serach
 */
function getHtml(href, serach) {
	request({uri: href, 'proxy':'http://localhost:1088'}, function (error, response, body) {
        // console.log(body)
        // $ = cheerio.load(body);
        // console.log(body)
        let datas = JSON.parse(body).data
        // console.log(datas, 111)
        datas.forEach(element => {
          // console.log(element, 22)
            let imgCar = element.carousel_media
            // console.log(imgCar)
            if (imgCar) {
              imgCar.forEach(ele => {
                let imgSrc = ele.images.standard_resolution.url
                download(imgSrc, ele.id)
                i++;
                // console.log(ele)
                // let imgSrc = ele.images.
              })
            } else {
              let imgSrc = element.images.standard_resolution.url
              console.log('正在下载原图')
              downLoad(imgSrc, element.id)
            }
        });
        datas.forEach(function (value, index) {
          let imgCar = value.carousel_media;
          if(imgCar){
            imgCar.forEach(function (value1, index) {
            let thumbnailSrc = value1.images.thumbnail.url;
    
              console.log('正在下载压缩图' + thumbnailSrc);
              downLoad(thumbnailSrc, value.id + '.min');
              j++;
              console.log('下载完成');
              });
          } else {
            let thumbnailSrc = value.images.thumbnail.url;
    
              console.log('正在下载压缩图' + thumbnailSrc);
              downLoad(thumbnailSrc, value.id + '.min');
              console.log('下载完成');
          }
          
        });
    
        fs.writeFile('../source/photos/ins.json',body,function(err){
          if(err) throw err;
        });
	})
}
function downLoad (url, file) {
  request.head(url, function (err, res, body) {
    request({uri: url,'proxy':'http://localhost:1088'}).pipe(fs.createWriteStream('../source/Img' + "/" + file + ".jpg"))
  })
}

function start(){
	console.log("开始获取图片连接");
	getHtml(baseUrl);
}

start();