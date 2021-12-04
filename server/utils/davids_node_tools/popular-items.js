
const mdb = require('./mysqlDB');
const pdb = require('./pgDB')

class PopularItems {
    constructor({ vendorCode, vendorWebName, isDateRange, fromDateRange, toDateRange, lastYear, lastYearYTD, ytd } = {}) {
        this.vendorCode = vendorCode || '';
        this.vendorWebName = vendorWebName || '';
        this.isDateRange = isDateRange || false;
        this.fromDateRange = fromDateRange || '';
        this.toDateRange = toDateRange || '';
        this.lastYear = lastYear || false;
        this.lastYearYTD = lastYearYTD || false;
        this.ytd = ytd || false
        this.result = []
        this.hasProductPage = false;
        this.labels = []
        this.values = []
        this.pgSQL = `sql`
    }

    mySQLWhereClause() {
        let whereClause = `clause`
        if (this.isDateRange) {
            whereClause += `clause`
        } else {
            return
        }
        return whereClause
    };

    mysqlSQL() {
        return `clause `
    }

    async getMysqlData() {
        return new Promise((resolve, reject) => {
            mdb.query(this.mysqlSQL(), (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            })
        })
    };

    async getPgData() {
        return new Promise((resolve, reject) => {
            pdb.query(this.pgSQL, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows);
            })

        })
    };

    handleProdPageQuantity(incomingProductPage, incomingQuantity) {
        this.result.forEach(data => {
            if (incomingProductPage == data.productPage) {
                this.hasProductPage = true;
                data.qty += incomingQuantity
                return
            } else {
                this.hasProductPage = false;
                return
            }
        })
        return
    };

    async getProductPageQuantities() {
        let mySQLFields = await this.getMysqlData();
        let pgFields = await this.getPgData();
        return new Promise((resolve) => {
            mySQLFields.forEach(item => {
                pgFields.forEach(pgItem => {
                    if (item.sku.trim() == pgItem.sku) {
                        let hasItem = this.result.filter((item) => item.productPage == pgItem.product_page)
                        if(hasItem == false){
                            this.result.push({ productPage: pgItem.product_page, qty: item.qty })
                        } else{
                            this.result.forEach(data => {
                                if (pgItem.product_page == data.productPage) {
                                    this.hasProductPage = true;
                                    data.qty += item.qty
                                    return
                                }
    
                            })
                        }
                    }
                })
            })
            resolve(this.result)
        })
    };

    async getFinalResults() {
        let finishedProducts = await this.getProductPageQuantities()
        finishedProducts.forEach((data) => {
            this.labels.push(data.productPage)
            this.values.push(data.qty)
        })
        return finishedProducts.sort((item1, item2) => item1.qty - item2.qty)
    };
};

module.exports = PopularItems