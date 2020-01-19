const mongoose = require('mongoose');
const Product = mongoose.model('products');
const bodyParser = require('body-parser');

const parserBody = bodyParser.json()


module.exports = (app) => {

    app.get('/api/product', async function(req, res){
        let products = await Product.find();
        return res.status(200).send(products);
    })

    app.post('/api/product', parserBody, async function(req, res){
        try{
            console.log('data',req.body);
            let addProduct = new Product(req.body);
            let data  = addProduct.save(function(err) {
                console.log(err)
            });
            console.log(addProduct)
            return res.status(200).send({
                error: false,
                product: addProduct,
                data,
                ssd: req.body
            })

            return res.status(200).send({
                addProduct,
                req: req.body,
            })
        } catch(e){
            return res.send(405).send({
                error: e,
                errorText: 'Не добавили'
            })
        }

    })

    app.put(`/api/product/:id`, async function(req, res){
        try{
            const { id } = req.params;

            let product = await Product.findByIdAndUpdate({id}, req.body);

            return res.status(202).send({
                    error: false,
                    product
              })
        } catch(e){
            return res.status(404).send({
                message: 'Нет такого продукта',
            })
        }
    })

    app.delete(`/api/product/:id`, async (req, res) => {
        const {id} = req.params;
    
        let product = await Product.findByIdAndDelete(id);
    
        return res.status(202).send({
          error: false,
          product
        })
    
    })
}