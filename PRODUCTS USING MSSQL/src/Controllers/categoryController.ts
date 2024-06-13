import { Request, Response } from 'express'
import { Category, categoryRequest } from '../Models/modelCategory';
import { v4 as uid } from 'uuid'
import mssql from 'mssql'
import { sqlConfig } from '../config'
import { DBHelper } from '../DatabaseHelpers';


const dbInstance = new DBHelper
export async function addCategory(req: Request, res: Response) {
    try {
        //id
        const id = uid()

        const { name, description } = req.body
        // console.log(description)
        // console.log(name)
        //connections
        // const pool = await mssql.connect(sqlConfig)

        // //Make request
        // await pool.request()
        //     .input('id', id)
        //     .input('categoryName', name)
        //     .input('categoryDescription', description)
        //     .execute('addCategory')

        dbInstance.exec('addCategory', {
            id: id,
            categoryName: name,
            categoryDescription: description
        })
        return res.status(200).json({ message: 'Category Added Successfully' })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function getCategories(req: Request, res: Response) {
    try {

        let categories = (await dbInstance.exec('getCategories', {})).recordset as Category[]
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json(error)
    }
}