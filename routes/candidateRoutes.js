const express=require('express');
const User = require('../models/user');
const Candidate = require('../models/candidate');
const router=express.Router();
const {jwtAuthMiddleware,generateToken}=require('../jwt');


// Check if user is admin
const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);
        return user && user.role === 'admin';
    } catch (err) {
        return false;
    }
};

// POST route to add a candidate
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id)))
            return res.status(403).json({ message: 'User does not have admin role' });

        const newCandidate = new Candidate(req.body);
        const response = await newCandidate.save();
        console.log('Candidate saved');
        res.status(200).json({ response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT route to update a candidate
router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id)))
            return res.status(403).json({ message: 'User does not have admin role' });

        const updatedCandidate = await Candidate.findByIdAndUpdate(
            req.params.candidateID,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCandidate)
            return res.status(404).json({ error: 'Candidate not found' });

        console.log('Candidate updated');
        res.status(200).json(updatedCandidate);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE route to delete a candidate
router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id)))
            return res.status(403).json({ message: 'User does not have admin role' });

        const deletedCandidate = await Candidate.findByIdAndDelete(req.params.candidateID);

        if (!deletedCandidate)
            return res.status(404).json({ error: 'Candidate not found' });

        console.log('Candidate deleted');
        res.status(200).json(deletedCandidate);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// vote count 
router.get('/vote/count', async (req, res) => {
    try{
        // Find all candidates and sort them by voteCount in descending order
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        // Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data)=>{
            return {
                party: data.party,
                count: data.voteCount
            }
        });

        return res.status(200).json(voteRecord);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Route to vote for a candidate
router.get('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
    const candidateId = req.params.candidateID;
    const userId = req.user.id;

    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate)
            return res.status(404).json({ message: 'Candidate not found' });

        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        if (user.role === 'admin')
            return res.status(403).json({ message: 'Admin is not allowed to vote' });

        if (user.isVoted)
            return res.status(400).json({ message: 'You have already voted' });

        user.isVoted = true;
        await user.save();

        candidate.voteCount = (candidate.voteCount || 0) + 1;
        await candidate.save();

        return res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get vote counts


// Get all candidates (name and party only)
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find({}, 'name party -_id');
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;