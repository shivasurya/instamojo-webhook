# instamojo-webhook
instamojo webhook handling and verification library for Express js Middleware <br />
## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install instamojo-webhook
```

## API

```js
var instamojoWebhook = require('instamojo-webhook')
```

### instamojoWebhook(options)
Create a webhook middleware with the given `options`.

#### Options

`instamojo-webhook` accepts secret salt provided Instamojo Developers page in the options object.

```js
instamojoWebhook({ secretKey: 'Your Secret SALT provided by instamojo'});
```

### req.instamojo

To store or access instamojo payment data, simply use the request property `req.instamojo`,
which is (generally) serialized as JSON , so nested objects
are typically fine. For example :

```js
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var instamojoWebhook = require("instamojo-webhook");

app.use(bodyParser());
var instamojoMiddleWare = instamojoWebhook({ secretKey: 'Your Secret Salt provided by Instamojo'});

app.post("/",instamojoMiddleWare,function(req,res){
  console.log(req.instamojo);
  res.send("hello");
})

```

##Why this Module ?

I've written blog post for handling instamojo webhook - [link](http://www.i-visionblog.com/2015/08/working-with-instamojo-payment-integration-for-mobile-and-web-apps.html "Blog post"). 
Got several response via e-mail *sample code for handling instamojo webhook* and made me to design this npm module.

##Contribution
You're always welcome to submit pull request. Here is small to-do list for next enhanced version. <br />
* Prevent Injection attackk, clean all post variables
* Writing Test module for this Module

##License

The MIT License

Copyright (c) 2017 Shivasurya S, http://www.i-visionblog.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
