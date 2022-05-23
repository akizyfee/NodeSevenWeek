const Post = require('../models/postsModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');


const posts = {
    getPosts: handleErrorAsync(async (req, res) => {
        const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
        const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
        const post = await Post.find(q).populate({
            path: 'user',
            select: 'name photo'
        }).sort(timeSort);
        handleSuccess(res, '資料讀取成功', post);
    }),
    createPost: handleErrorAsync(async (req, res, next) => {
        const data = req.body;
        if (data.content) {
            const newPost = await Post.create(data)
            handleSuccess(res, 200, newPost);
        } else {
            appError(400, '內文不能空白', next)
        }
    }),
    editPost: handleErrorAsync(async (req, res, next) => {
        const id = req.params.id
        const name = req.body.name
        const content = req.body.content
        const newPost = await Post.findById(id).exec();
        if (newPost == null) {
            appError(400, '無此貼文ID', next);
        } else if (!content){
            appError(400, '內文不得為空白', next);
        } else {
            const newPost = await Post.findByIdAndUpdate(
                id,
                {
                    name,
                    content
                },
                {
                    new: true,
                    runValidators: true
                }//修改成功後回傳修改結果，跑驗證
            )
            handleSuccess(res, 200, newPost);
        }
    }),
    deletePosts: handleErrorAsync(async (req, res, next) => {
        if (req.originalUrl === '/posts/') {
            appError(400, '無此路由', next)
        } else {
            const DeleteAll = await Post.deleteMany({})
            handleSuccess(res, '刪除成功', DeleteAll, 200);
        }
    }),
    deleteOnePost: handleErrorAsync(async (req, res, next) => {
        const id = req.params.id;
        const deleteOne = await Post.findById(id).exec();
        if (deleteOne == null) {
            appError(400, '無此ID', next);
        } else {
            const deleteOne = await Post.findByIdAndDelete(id);
            handleSuccess(res, '刪除成功', deleteOne, 200);
        }
    })
}

module.exports = posts;