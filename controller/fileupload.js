const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline,
  } = require("@azure/storage-blob");
  const uuidv1 = require("uuid/v1");
  
  
  const fileUpload =  async (req, res,next) => {
  let images = [];
  console.log(req.files)
  try {
    await req.files.forEach(async (reqfile, i) => {
  
      const accountName = 'swimlocker';
      const accountKey = 'bNmQ4TYYDrTwGyeBlUDuDIjOUeUpn8QaVrorfjox9BXoUU9G7u5ZL7RsS2Rsn2tMBk+tsi/kcWI+7JhLp+HppA==';
      const sharedKeyCredential = new StorageSharedKeyCredential(
        accountName,
        accountKey,
      );
      
      const pipeline = newPipeline(sharedKeyCredential);
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        pipeline,
      );
      const uploadOptions = { bufferSize: 4 * 1024 * 1024, maxConcurrency: 20 };
      const getStream = require("into-stream");
      const contanierName = "awlvendorportal";
      const mimetype = reqfile.mimetype.split("/")
      console.log(mimetype[1])
   
      const blobName =  uuidv1() +  "-" + reqfile.originalname + "." + mimetype[1];
      images.push(blobName)
      const stream = getStream(reqfile.buffer);
      const containerClient = blobServiceClient.getContainerClient(
        contanierName,
      );
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
     let resdata = await blockBlobClient.uploadStream(
        stream,
        uploadOptions.bufferSize,
        uploadOptions.maxConcurrency,
        { blobHTTPHeaders: { blobContentType: reqfile.mimetype } },
      );
    });
  
        const Upload = `https://swimlocker.blob.core.windows.net/awlvendorportal/`+images[0];
      console.log(Upload)
  
    res.status(200).send(Upload)
  
  } catch (err) {
    console.log(err)
  }
  }
  
  module.exports = fileUpload
  