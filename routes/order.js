const router = require('koa-router')()
const Order = require('../schemas/order')
const Goods = require('../schemas/goods')

router.prefix('/order')

router.get('/', async (ctx, next) => {
    await ctx.render('order/list')
})

router.get('/sales_return', async (ctx, next) => {
    await ctx.render('order/sales_return_list')
})

router.get('/order_show', async (ctx, next) => {
    const id = ctx.query.id
    try {
        let doc = await Order.findOne({ _id: id }).populate(['buyid', 'address'])	
        if (!doc) {
            await ctx.render('order/order_show', { orderInfo: null })
            return false
        }
        doc = doc.toObject()
        console.log(doc)
        doc.goods.forEach(async (item, index) => {
        	const goodsdata = await Goods.findOne({ id: item.id }).populate(['classify', 'brand'])	
          doc.goods[index].data = goodsdata
        })
        await ctx.render('order/order_show', { orderInfo: doc })
    } catch (err) {
        console.log(err)
        await ctx.render('order/order_show', { orderInfo: null })
    }

})

module.exports = router