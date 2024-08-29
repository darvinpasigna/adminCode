

const ErrorValidation = (addProd) => {
    let error = {};

    if (!addProd.prod_category) {
        error.prod_category = "Please select category!";
    }
    if (!addProd.prod_name) {
        error.prod_name = "Please enter product name!";
    }
    if (!addProd.price) {
        error.price = "Please enter product price!";
    }
    if (!addProd.desc) {
        error.desc = "Please enter product description!";
    }
    if (!addProd.stock) {
        error.stock = "Please enter number of stocks!";
    }
    if (!addProd.main_img) {
        error.main_img = "Please paste the main image address!";
    }
    if (!addProd.img1) {
        error.img1 = "Please paste the 1st image address!";
    }
    if (!addProd.img2) {
        error.img2 = "Please paste the 2nd image address!";
    }
    if (!addProd.img3) {
        error.img3 = "Please paste the 3nd image address!";
    }

    return error;
}

export default ErrorValidation;
