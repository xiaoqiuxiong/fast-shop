const router = require('koa-router')()
const Goods = require('../schemas/goods')
const Brand = require('../schemas/brand')
const Classify = require('../schemas/classify')


router.prefix('/goods')
const title = '主页'
const mainTitle = '产品管理'

router.get('/', async (ctx, next) => {
    await ctx.render('goods/list')  
})

router.get('/goods_add', async (ctx, next) => {
    const id = ctx.query.id || null
    const brands = await Brand.find()
    const classifys = await Classify.find()
    if (id) {
        const doc = await Goods.findOne({ id: id })
        await ctx.render('goods/goods_add', { goodsInfo: doc, brands: brands, classifys: classifys })
        return false
    }
    await ctx.render('goods/goods_add', { goodsInfo: null, brands: brands, classifys: classifys })
})

router.get('/goods_show', async (ctx, next) => {
    const id = ctx.query.id
    try {
        const doc = await Goods.findOne({ id: id }).populate(['brand','classify'])
        if (!doc) {
            await ctx.render('goods/goods_show', { goodsInfo: null })
            return false
        }
        await ctx.render('goods/goods_show', { goodsInfo: doc })
    } catch (err) {
        console.log(err)
        await ctx.render('goods/goods_show', { goodsInfo: null })
    }

})

router.get('/brand', async (ctx, next) => {
    await ctx.render('goods/brand')
})

router.get('/brand_add', async (ctx, next) => {
    const id = ctx.query.id || null
    if (id) {
        const doc = await Brand.findOne({ id: id })
        await ctx.render('goods/brand_add', { brandInfo: doc })
        return false
    }
    await ctx.render('goods/brand_add', { brandInfo: null })
})

router.get('/brand_show', async (ctx, next) => {
    const id = ctx.query.id
    try {
        const doc = await Brand.findOne({ id: id })
        if (!doc) {
            await ctx.render('goods/brand_show', { brandInfo: null })
            return false
        }
        await ctx.render('goods/brand_show', { brandInfo: doc })
    } catch (err) {
        console.log(err)
        await ctx.render('goods/brand_show', { brandInfo: null })
    }

})

router.get('/classify', async (ctx, next) => {
    await ctx.render('goods/classify')
})

router.get('/classify_add', async (ctx, next) => {
    const id = ctx.query.id || null
    if (id) {
        const doc = await Classify.findOne({ id: id })
        await ctx.render('goods/classify_add', { classifyInfo: doc })
        return false
    }
    await ctx.render('goods/classify_add', { classifyInfo: null })
})

router.get('/classify_show', async (ctx, next) => {
    const id = ctx.query.id
    try {
        const doc = await Classify.findOne({ id: id })
        if (!doc) {
            await ctx.render('goods/classify_show', { classifyInfo: null })
            return false
        }
        await ctx.render('goods/classify_show', { classifyInfo: doc })
    } catch (err) {
        console.log(err)
        await ctx.render('goods/classify_show', { classifyInfo: null })
    }

})

module.exports = router