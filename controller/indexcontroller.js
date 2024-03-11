import { blog, category, user } from "./models.js";
import { scheduleDeletion } from "../middelwares/postdelete.js";
import logger from '../logger.js';
import { blogPostData } from '../Aggregrate/blogPost_aggregation.js';
import { blogPostLoginData } from '../Aggregrate/blogPostLogin_agggregation.js';
import { premiumBlogPostData } from '../Aggregrate/premium_blogPost_aggregaion.js';
import mongoose from "mongoose";

const blogPosts = async (req, res) => {
  try {
    const categorydata = await category.find({});
    const { startIndex, limit } = req.pagination;
    let post = [], blogs, IsSubscribed;
    if (req.isAuthenticated()) {
      let id = req.user.id;
      id = new mongoose.Types.ObjectId(id);
      let IsUserSubscribed = await user.findOne(id);
      IsSubscribed = IsUserSubscribed.IsSubscribed

      if (req.user.IsSubscribed == true) {
        blogs = await blog.aggregate(premiumBlogPostData(id)).skip(startIndex)
          .limit(limit);
      } else {
        blogs = await blog.aggregate(blogPostData(id)).skip(startIndex)
          .limit(limit);
      }
    } else {
      blogs = await blog.aggregate(blogPostLoginData).skip(startIndex)
        .limit(limit);
    }
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].postDeleteDate != null && blogs[i].postDeleteDate != undefined) {
        let obj = {
          id: blogs[i]._id,
          postDeleteDate: blogs[i].postDeleteDate,
        };
        post.push(obj);
      }
    }
    scheduleDeletion(post);

    return res.render("AdminPanel/index", {
      categorydata,
      themes: [],
      blogs,
      totalPages: Math.ceil(blogs.length / limit),
      page: req.pagination.page,
      user: req.user,
      IsSubscribed: IsSubscribed,
      limit,
      response: []
    });
  } catch (err) {
    logger.error(err)
    console.log(err);
    return false;
  }
};

export {
  blogPosts
};