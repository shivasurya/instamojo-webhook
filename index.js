var crypto = require('crypto');

var checkPostVariable = function(req){

  if(!req.body.hasOwnProperty("buyer_name")){
    return false;
  }
  if(!req.body.hasOwnProperty("offer_title"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("fees"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("payment_id"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("variants"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("custom_fields"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("currency"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("status"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("amount"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("buyer_phone"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("offer_slug"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("buyer"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("mac"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("quantity"))
  {
    return false;
  }
  if(!req.body.hasOwnProperty("unit_price"))
  {
    return false;
  }
  return true;
}
module.exports = function(options) {
  return function(req, res, next) {
    var secret =  options.secretKey;
    var generated_string = "";
    var generated_symbol = "|";
    //creating instance for instamojo with request object
    req.instamojo = {
      webhookStatus : false,
      amount        : "",
      buyer_name    : "",
      buyer_phone   : "",
      currency      : "",
      custom_fields : "",
      fees          : "",
      offer_slug    : "",
      offer_title   : "",
      payment_id    : "",
      quantity      : "",
      status        : "",
      unit_price    : "",
      variants      : "",
      reason        : ""
    };

    if(req.hasOwnProperty("body"))
    {
      if(checkPostVariable(req))
      {
        generated_string = req.body.amount + generated_symbol;
        generated_string = generated_string + req.body.buyer  + generated_symbol;
        generated_string = generated_string + req.body.buyer_name + generated_symbol;
        generated_string = generated_string + req.body.buyer_phone + generated_symbol;
        generated_string = generated_string + req.body.currency + generated_symbol;
        generated_string = generated_string + req.body.custom_fields + generated_symbol;
        generated_string = generated_string + req.body.fees + generated_symbol;
        generated_string = generated_string + req.body.offer_slug + generated_symbol;
        generated_string = generated_string + req.body.offer_title + generated_symbol;
        generated_string = generated_string + req.body.payment_id + generated_symbol;
        generated_string = generated_string + req.body.quantity + generated_symbol;
        generated_string = generated_string + req.body.status + generated_symbol;
        generated_string = generated_string + req.body.unit_price + generated_symbol;
        generated_string = generated_string + req.body.variants;

        var hash = crypto.createHmac('sha1', secret).update(generated_string).digest('hex');
        if(hash === req.body.mac)
        {
          req.instamojo.webhookStatus = true;
          req.instamojo.amount        = req.body.amount;
          req.instamojo.buyer_name    = req.body.buyer_name;
          req.instamojo.buyer_phone   = req.body.buyer_phone;
          req.instamojo.currency      = req.body.currency;
          req.instamojo.custom_fields = req.body.custom_fields;
          req.instamojo.fees          = req.body.fees;
          req.instamojo.offer_slug    = req.body.offer_slug;
          req.instamojo.offer_title   = req.body.offer_title;
          req.instamojo.payment_id    = req.body.payment_id;
          req.instamojo.quantity      = req.body.quantity;
          req.instamojo.status        = req.body.status;
          req.instamojo.unit_price    = req.body.unit_price;
          req.instamojo.variants      = req.body.variants;
          req.instamojo.reason        = "successful transactions";
        }
        else
        {
          req.instamojo.webhookStatus = false;
          req.instamojo.reason = "HMAC-SHA1 authentication didnt succeed";
        }
      }
      else
      {
        req.instamojo.webhookStatus = false;
        req.instamojo.reason = "instamojo key pair post data missing";
      }
    }
    else
    {
      req.instamojo.webhookStatus = false;
      req.instamojo.reason = "couldnt retrieve post data or form data! Try using body-parser above instamojo webhook middleware";
    }
    next();
  }
}
