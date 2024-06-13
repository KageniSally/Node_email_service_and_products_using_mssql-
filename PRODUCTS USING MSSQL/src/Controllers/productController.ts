import { Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import mssql from 'mssql'
import { sqlConfig } from '../config'
import { DBHelper } from '../DatabaseHelpers'

const dbInstance = new DBHelper

export async function addProduct(req: Request, res: Response) {
    try {
        const id = uid()

        //req body
        const { name, description, price, categoryId } = req.body

        dbInstance.exec('addProduct', {
            id: id,
            productName: name,
            productDescription: description,
            productPrice: price,
            categoryId: categoryId
        })

        return res.status(200).json({ message: "Product Added Successfully" })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function getProducts(req: Request, res: Response) {
    try {
        // let pool = await mssql.connect(sqlConfig)
        // let products = (await pool.request().execute('getProducts')).recordset as Product[]
        let products = (await dbInstance.exec('getProducts', {})).recordset as Product[]
        return res.status(200).json(products)

    } catch (error) {
        return res.status(500).json(error)
    }

}


export async function getProduct(req: Request<{ id: string }>, res: Response) {
    try {
        let product = (await dbInstance.exec('getProduct', { id: req.params.id })).recordset[0] as Product
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json(error)
    }

}


export async function getCategoryProduct(req: Request<{ categoryId: string }>, res: Response) {
    try {


        let categoryProducts = (await dbInstance.exec('getCategoryProducts', { categoryId: req.params.categoryId })).recordset as Product[]

        return res.status(200).json(categoryProducts)

    } catch (error) {
        return res.status(500).json(error)
    }

}



export async function updateProduct(req: Request<{ id: string }>, res: Response) {
    try {
        const product = (await dbInstance.exec('getProduct', { id: req.params.id })).recordset[0] as Product


        if (product && product.id) {
            const { name, price, description, categoryId } = req.body


            dbInstance.exec('updateProduct', {
                id: req.params.id,
                productName: name,
                productPrice: price,
                productDescription: description,
                categoryId: categoryId
            })

            return res.status(200).json({ message: "Product Updated Successfully" })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function deleteProducts(req: Request<{ id: string }>, res: Response) {
    try {
        dbInstance.exec('deleteProduct', { id: req.params.id })

        return res.status(200).json({ message: "Product Deleted Successfully" })
    } catch (error) {
        return res.status(500).json(error)
    }
}

