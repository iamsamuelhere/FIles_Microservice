const router=require("express").Router();
const maincontroller=require("../controllers/MainController");
const upload=require("../config/multer")

router.get("/",maincontroller.fetchResults)

router.post("/postdata",upload.single("avatar"),maincontroller.postData)

router.delete("/delete-post/:id",maincontroller.deletePost)

module.exports=router;