// Import functionalities
const express = require('express');
const router = express.Router();

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

// importing data model schemas
const { clients, events } = require('../models/models');
const { ObjectId } = require('mongodb');

// reading the org id from the environment variable
const org = process.env.ORG_ID;

router.get('/client_details/:id', async (req,res,next) => {
    try {
        client_info = await clients.findOne({_id: req.params.id, orgs: org});
        reg_events = await events.find({attendees: req.params.id, org: org});
        non_reg_events = await events.find({attendees: {$nin: [req.params.id]}, org: org,});

        if (!client_info) {
            res.status(400).send('Client not found')
        }

        combinedData = {
            client_info: client_info,
            reg_events: reg_events,
            non_reg_events: non_reg_events
        };

        res.json(combinedData)
    } catch(err){
        console.error(err)
        res.send(err)
    }
})

module.exports = router;