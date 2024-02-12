const {
  blog,
  scheduleDeletion,
  category,

} = require("./controller");

const blogPostData = require('../Aggregrate/blogPost_aggregation');


const blogPosts = async (req, res) => {
  try {
    const categorydata = await category.find({});
    const { startIndex, limit } = req.pagination;
    let post = [];

    let blogs = await blog.aggregate(blogPostData).skip(startIndex)
      .limit(limit);

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
      limit
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  blogPosts,
};
