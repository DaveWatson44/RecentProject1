const express = require('express');
const router = express.Router();
const pg = require('../utils/davids_node_tools/pgDB');
const User = require('../utils/user');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage });
const { missingImagesQuery, missingImagesByVendorQuery, missingChartsByVendor, getVendorNames, getProduct } = require('../utils/queries/pgsql/maintenanceQueries/webMaintenanceQueries');
const { vgmMissingImagesQuery } = require('../utils/queries/pgsql/maintenanceQueries/vgmMaintenanceQueries')

router.get('/missing_images_summary', (req, res, next) => {
    const sql = missingImagesQuery();
    
    pg.query(sql).then(resp => {
        console.log(resp)
        res.send(resp.rows)
    }).catch(err => err)
});

router.get('/missing_images_by_vendor', (req, res, next) => {
    let vendorName = req.query.vendorName;
    const sql = missingImagesByVendorQuery();
    let values = [vendorName]
    pg.query(sql, values).then(resp => {
        res.send(resp.rows)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
});

router.get('/missing_charts_by_vendor', (req, res, next) => {
    let vendorName = req.body.vendorName;
    const sql = missingChartsByVendor();
    let values = [vendorName]

    pg.query(sql, values).then(resp => {
        console.log(resp)
        res.send(resp.rows)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
});

router.get('/vendor_names', (req, res, next) => {
    const sql = getVendorNames();
    let vendorList = []

    pg.query(sql).then(resp => {
        let vendorResults = resp.rows;
        for(vendor of vendorResults){
            let vendorName = vendor.vendor_web_name;
            vendorList.push(vendorName)
        }
        res.send(vendorList)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
});

router.get('/product_images', (req, res, next) => {
    let productID = req.query.productID;
    const sql = getProduct();
    let values = [productID]

    pg.query(sql, values).then(resp => {
        res.send(resp.rows)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
});

router.post('/product_images', upload.array('uploadedImages', 2), (req, res, next) => {
    console.log('hit post files')
    console.log(req.files)
})

//VGM

router.get('/vgm_missing_images', (req, res, next) => {
    const sql = vgmMissingImagesQuery();
    
    pg.query(sql).then(resp => {
        console.log(resp)
        res.send(resp.rows)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
});



module.exports = router;