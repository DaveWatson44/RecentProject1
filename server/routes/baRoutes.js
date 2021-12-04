const express = require('express');
const router = express.Router();
const mdb = require('../db/mysqlquery');
const PopularItems = require('../utils/davids_node_tools/popular-items')
const {totalOrderCount, topSellingClasses, topSellingGroups, topSellingSegments, revenueSources} = require('../utils/queries/mysql/ba_queries');
const redis = require("redis");
const client = redis.createClient({host: 'redis'});


client.on("error", function(error) {
    console.error(error);
  });



router.post('/popular_items', async (req, res, next) => {
    console.log(totalOrderCount())
    let fromDate =  req.body.fromDate;
    let toDate = req.body.toDate;
    let test = new PopularItems({ vendorCode: 'code', vendorWebName: 'name', isDateRange: true, fromDateRange: fromDate, toDateRange: toDate })
    const popularItems = await test.getFinalResults();
    popularItems.sort((a, b) => parseFloat(a.qty) - parseFloat(b.qty));
    console.log(popularItems)
    res.send(popularItems)
});

router.post('/order_count', async (req, res, next) => {
    let sql = totalOrderCount();
    let values = [req.body.fromDate, req.body.toDate];
    let orderCountResults = await mdb.query(sql, values);
    res.send(orderCountResults)
})

router.get('/top_classes', async (req, res, next) => {
    let sql = topSellingClasses();
    let topSellingClassesResults = await mdb.query(sql);
    console.log(topSellingClassesResults)
    res.send(topSellingClassesResults)
})

router.get('/top_groups', async (req, res, next) => {
    let sql = topSellingGroups();
    let topSellingGroupResults = await mdb.query(sql);
    console.log(topSellingGroupResults)
    res.send(topSellingGroupResults)
})

router.get('/top_segments', async (req, res, next) => {
    let sql = topSellingSegments();
    let topSellingSegmentsdResults = await mdb.query(sql);
    console.log(topSellingSegmentsdResults)
    res.send(topSellingSegmentsdResults)
})

router.get('/revenue_sources', async (req, res, next) => {
    let sql = revenueSources();
    let revenueSourcesResults = await mdb.query(sql);
    console.log(revenueSourcesResults)
    res.send(revenueSourcesResults) 
})

module.exports = router;