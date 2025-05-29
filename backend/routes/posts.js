import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, PPT, and PPTX are allowed.'));
    }
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'firstName lastName role company department');
    
    // Format posts for client
    const formattedPosts = posts.map(post => {
      const { _id, title, content, type, createdAt, updatedAt, attachments } = post;
      const author = {
        name: `${post.author.firstName} ${post.author.lastName}`,
        role: post.author.role,
        company: post.author.company,
        department: post.author.department
      };
    
      return {
        id: _id,
        title,
        content,
        type,
        author,
        attachments, 
        createdAt,
        updatedAt
      };
    });
    
    
    res.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new post
router.post('/', auth, upload.array('attachments', 5), async (req, res) => {
  try {
    const { title, content, type,  attachmentUrl, } = req.body;
    
    // Create post object
    const postData = {
      title,
      content,
      type,
      author: req.userId,

    };
    
    if (attachmentUrl) {
      postData.attachment = {
        filename: attachmentUrl.split('/').pop(),
        url: attachmentUrl,
        source: 'external'
      };
    } else if (req.files && req.files.length > 0) {
      const file = req.files[0];
      postData.attachment = {
        filename: file.originalname,
        url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
        source: 'upload'
      };
    }
    
    
    
    const post = new Post(postData);
    await post.save();
    
    // Populate author details
    await post.populate('author', 'firstName lastName role company department');
    
    // Format post for client
    const formattedPost = {
      id: post._id,
      title: post.title,
      content: post.content,
      type: post.type,
      author: {
        name: `${post.author.firstName} ${post.author.lastName}`,
        role: post.author.role,
        company: post.author.company,
        department: post.author.department
      },
      attachmentUrl: post.attachment?.url || null,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
    
    
    res.status(201).json(formattedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'firstName lastName role company department')
      .populate('comments.user', 'firstName lastName');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Format post for client
    const formattedPost = {
      id: post._id,
      title: post.title,
      content: post.content,
      type: post.type,
      author: {
        name: `${post.author.firstName} ${post.author.lastName}`,
        role: post.author.role,
        company: post.author.company,
        department: post.author.department
      },
      attachments: post.attachments,
      likes: post.likes.length,
      comments: post.comments.map(comment => ({
        id: comment._id,
        text: comment.text,
        user: `${comment.user.firstName} ${comment.user.lastName}`,
        createdAt: comment.createdAt
      })),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
    
    res.json(formattedPost);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Find post and check ownership
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    
    // Update post
    post.title = title || post.title;
    post.content = content || post.content;
    
    await post.save();
    
    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find post and check ownership
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    // Delete attachments if any
    if (post.attachments && post.attachments.length > 0) {
      post.attachments.forEach(attachment => {
        try {
          fs.unlinkSync(attachment.path);
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
    
    await post.remove();
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment to post
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Add comment
    post.comments.unshift({
      user: req.userId,
      text
    });
    
    await post.save();
    
    // Populate user details for the new comment
    await post.populate('comments.user', 'firstName lastName');
    
    // Return the new comment
    const newComment = {
      id: post.comments[0]._id,
      text: post.comments[0].text,
      user: `${post.comments[0].user.firstName} ${post.comments[0].user.lastName}`,
      createdAt: post.comments[0].createdAt
    };
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/unlike post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if post has already been liked by user
    const alreadyLiked = post.likes.some(like => like.toString() === req.userId);
    
    if (alreadyLiked) {
      // Unlike the post
      post.likes = post.likes.filter(like => like.toString() !== req.userId);
    } else {
      // Like the post
      post.likes.unshift(req.userId);
    }
    
    await post.save();
    
    res.json({ likes: post.likes.length, liked: !alreadyLiked });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;