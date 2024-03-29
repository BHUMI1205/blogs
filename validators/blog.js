import validator from "validator";

const validateBlogData = (title, detail, theme, file) => {
  if (file == false) {
    return "image have to Added";
  } else if (theme == undefined) {
    return "theme have to Added";
  } else if (validator.isEmpty(title) == true) {
    return "Title have to Added";
  } else if (validator.isEmpty(detail) == true) {
    return "Detail have to Added";
  } else {
    return null;
  }
}

const validateUpdateBlogData = (title, detail) => {
  if (validator.isEmpty(title) == true) {
    return "Title have to Added";
  } else if (validator.isEmpty(detail) == true) {
    return "Detail have to Added";
  } else {
    return null;
  }
};

const validateData = (req, res) => {
  return "You have to Login First";
};

export { validateBlogData, validateUpdateBlogData, validateData };
