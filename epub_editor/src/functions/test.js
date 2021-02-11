
export function test () {
  var axios = require('axios');
  var FormData = require('form-data');
  var fs = require('fs');
  var data = new FormData();
  data.append('file', fs.createReadStream('C:/Users/Jubin Jang/Desktop/빼꼼루피.png'));
  data.append('email', 'sunshine4429@gmail.com');
  data.append('epubName', 'postman');
  data.append('path', '/test');
  var header2 = data.getHeaders()
  var config = {
    method: 'post',
    url: 'https://contact.dabook.site/api/upload',
    headers: header2,
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}
