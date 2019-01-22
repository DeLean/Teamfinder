const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Post Route testen
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Post funktioniert" }));

// @route   GET api/posts
// @desc    Alle Posts holen
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'Keine Posts gefunden' }));
});

// @route   GET api/posts/:id
// @desc    Posts über ID holen
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ nopostfound: 'Kein Post mit dieser ID gefunden' });
            }
        })
        .catch(err =>
            res.status(404).json({ nopostfound: 'Kein Post mit dieser ID' })
        );
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Wer hat geposted?
                    if (post.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: 'User nicht authorisiert!' });
                    }


                    post.remove().then(() => res.json({ postDeleted: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Keine Posts gefunden' }));
        });
    }
);

// @route   POST api/posts
// @desc    Etwas posten
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        newPost.save().then(post => res.json(post));
    }
);

// @route   POST api/posts/comments/:id
// @desc    Kommentar zum Post
// @access  Private
router.post("/comments/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            post.save().then(post => res.json(post))

        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
});

// @route   DELETE api/posts/comments/:id/:comment_id
// @desc    Kommentar löschen
// @access  Private
router.delete('/comments/:id/:comment_id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id).length === 0
                ) {
                    return res.status(404).json({ commentnotexists: 'Comment does not exist' });
                }

                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
);


module.exports = router;
