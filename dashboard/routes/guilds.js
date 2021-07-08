const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../auth/auth');
const discord = require('../../index')
const dateformat = require('dateformat')
const number = require('easy-number-formatter')

router.get('/guilds',ensureAuthenticated,(req,res) =>{
    let guilds = discord.client.guilds.cache.array()
    res.render('home/guilds',{
        guilds:guilds,
        profile:req.user,
        client:discord.client,
        dateformat:dateformat,
        number:number
    })
})

router.post('/guilds/leave/:id', ensureAuthenticated,(req,res) =>{
    discord.client.guilds.cache.get(req.params.id).leave().then(value => {
        req.flash('success', `Succesfully left guild "${value.name}"`)
        res.redirect('/guilds')
    })
})

module.exports = router;
