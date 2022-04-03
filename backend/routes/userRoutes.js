//const router = require('express').Router()
import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/', async (req, res) => {
    
    const {name, username} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
    }
      
    const user = {
        name,
        username
    }

    try {
        await User.create(user)
        res.status(201).json({message: 'Pessoa inserida com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {

    try {
        const people = await User.find()

        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    
    try {
        const people = await User.findOne({_id: id})

        if(!people){
            res.status(422).json({message: 'O Usuário não foi encontrado'})
            return
        }

        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    
    const {name, username} = req.body
    const id = req.params.id

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
    }
      
    const User = {
        name,
        username,
    }

    try {
        const updateUser = await User.updateOne({_id: id}, User)

        if(updateUser.matchedCount == 0){
            res.status(422).json({ message: 'O Usuário não foi encontrado'})
            return
        }
        
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const people = await User.findOne({_id: id})

        if(!people){
            res.status(422).json({message: 'O Usuário não foi encontrado'})
            return
        }

        await User.deleteOne({_id: id})

        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

export default router