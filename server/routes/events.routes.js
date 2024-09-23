const Router = require('express');
const Event = require('./../models/Event');

const router = new Router();

router.post('/addEvent', async (req, res) => {
    try {
        const {title, description, dateEvent, organizer} = req.body;
        const event = await new Event({
            title,
            description,
            organizer,
            date: dateEvent,
        });
        await event.save();
        res.status(201).json(event);
    } catch (e) {
        console.log(e);
    }
});

router.delete('/deleteEvent', async (req, res) => {
    try {
        const { id } = req.query;
        const event = await Event.findByIdAndDelete(id);
        res.status(201).json(event);
    } catch (e) {
        console.log(e);
    }
});

router.put('/updateEvent', async (req, res) => {
    try {
        const body = req.body;
        let event = await Event.findById(body._id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.title = body.title || event.title;
        event.date = body.date || event.date;
        event.organizer = body.organizer || event.organizer;
        event.description = body.description || event.description;

        const updatedEvent = await event.save();
        res.status(200).json(updatedEvent);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/events', async (req, res) => {
    try {
        const { sort, currentPage, sizePage } = req.query;
        let events;
        switch (sort) {
            case 'title':
                events = await Event.find().sort({title: 1});
                break;
            case 'description':
                events = await Event.find().sort({description: 1});
                break;
            case 'date':
                events = await Event.find().sort({date: 1});
                break;
            case 'organizer':
                events = await Event.find().sort({organizer: 1});
                break;

            default: events = await Event.find();
        }

        if (sizePage) {
            const skip = (currentPage - 1) * sizePage;
            events = await Event.find().skip(skip).limit(parseInt(sizePage));
        }
        res.status(201).json(events);
    } catch (e) {
        console.log(e);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { id, fullname, email, fromGetInfo, birthday } = req.body;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const userExists = event.users.some(user =>
            user.fullname === fullname && user.birthday === birthday
        );
        if (userExists) {
            return res.status(400).json({ message: 'This user already exists' });
        }
        event.users.push({ fullname, email, fromGetInfo, birthday });
        await event.save();
        return res.status(201).json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;