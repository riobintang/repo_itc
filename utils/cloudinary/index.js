const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dd6stok7k', 
    api_key: '645673189365785', 
    api_secret: 'dJ3ohgP5cbpNr_GvxMzdi42XhBs' 
  });   

  module.exports = cloudinary;