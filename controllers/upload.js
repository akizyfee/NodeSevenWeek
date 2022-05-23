const express = require('express');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const handleSuccess = require('../service/handleSuccess');
const sizeOf = require('image-size')
const { ImgurClient } = require('imgur');

const uploadFiles = {
    uploadFile: handleErrorAsync(async (req, res, next) => {
        if (!req.files.length) {
            return next(appError(400, '尚未上傳檔案', next));
        }
        //我想上傳不是1:1的貓咪圖所以先註解掉這裡
        // const dimensions = sizeOf(req.files[0].buffer);
        // if (dimensions.width !== dimensions.height) {
        //     return next(appError(400, '圖片長寬不符合1:1', next));
        // }
        const client = new ImgurClient({
            clientId: process.env.IMGUR_CLIENT_ID,
            clientSecret: process.env.IMGUR_CLIENT_SECRET,
            refreshToken: process.env.IMGUR_REFRESH_TOKEN,
        });
        const response = await client.upload({
            image: req.files[0].buffer.toString('base64'),
            type: 'base64',
            album: process.env.IMGUR_ALBUM_ID
        });
        handleSuccess(res, '資料讀取成功', { url: response.data.link });
    })
}

module.exports = uploadFiles;