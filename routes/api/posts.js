const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const postValidation = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Post Route testen
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Post funktioniert" }));

// @route   GET api/posts
// @desc    Alle Posts holen
// @access  Public
router.get("/", (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: "Keine Posts gefunden" }));
});

// @route   GET api/posts/:id
// @desc    Posts über ID holen
// @access  Public
router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ nopostfound: "Kein Post mit dieser ID gefunden" });
            }
        })
        .catch(err =>
            res.status(404).json({ nopostfound: "Kein Post mit dieser ID" })
        );
});

// @route   DELETE api/posts/:id
// @desc    Post löschen
// @access  Privat
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Wer hat geposted?
                    if (post.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: "User nicht authorisiert!" });
                    }


                    post.remove().then(() => res.json({ postDeleted: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: "Keine Posts gefunden" }));
        });
    }
);

// @route   POST api/posts
// @desc    Etwas posten
// @access  Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = postValidation(req.body);

        //Validieren und Fehler zurückgeben
        if (!isValid) {
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
// @access  Privat
router.post("/comments/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = postValidation(req.body);

    if (!isValid) {
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

            post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
});

// @route   DELETE api/posts/comments/:id/:comment_id
// @desc    Kommentar löschen
// @access  Privat
router.delete("/comments/:id/:comment_id", passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Existiert der Kommentar?
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id).length === 0
                ) {
                    return res.status(404).json({ commentnotexists: "Kommentar existiert nicht" });
                }

                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: "Post nicht gefunden" }));
    }



);

//@route   POST api/posts / like /: id
// @desc    Post liken
// @access  Privat
router.post(
    "/like/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyliked: "Bereits geliked" });
                    }

                    // Array mit den likes
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: "Post nicht gefunden" }));
        });
    }
);

// @route   POST api/posts/unlike/:id
// @desc    Like rückgängig machen
// @access  Privat
router.post(
    "/unlike/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({ notliked: "Du hast diesen Post noch nicht geliked" });
                    }

                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: "Post nicht gefunden" }));
        });
    }
);



module.exports = router;
