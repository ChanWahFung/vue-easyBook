const recauthor = require('./public/json/recommendAuthor.json')

const search_note = require('./public/json/searchNote.json')//搜索  文章数据
const search_users = require('./public/json/searchUsers.json')//搜索  用户数据
const search_collection = require('./public/json/searchCollection.json')//搜索  专题数据
const search_notebook = require('./public/json/searchNotebook.json')//搜索  文集数据

const sub_all = require('./public/json/myRecAll.json') //个人关注  全部推荐
const sub_user = require('./public/json/myRecUser.json')//个人关注 推荐作者
const sub_collection = require('./public/json/myRecCollection.json')//个人关注 推荐专题
const path = require('path');

module.exports = {
    configureWebpack: {
        devServer: {
          before(app) {
            app.get('/api/recauthor', function (req, res) {
                res.json(recauthor);
            });
            app.get('/api/search/note', function (req, res) {
                res.json(search_note);
            });
            app.get('/api/search/users', function (req, res) {
                res.json(search_users);
            });
            app.get('/api/search/collection', function (req, res) {
                res.json(search_collection);
            });
            app.get('/api/search/notebook', function (req, res) {
                res.json(search_notebook);
            });
            app.get('/api/subscriptions/all', function (req, res) {
                res.json(sub_all);
            });
            app.get('/api/subscriptions/user', function (req, res) {
                res.json(sub_user);
            });
            app.get('/api/subscriptions/collection', function (req, res) {
                res.json(sub_collection);
            });
          },
          proxy: {
              '/api': {
                target: 'https://www.jianshu.com',//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                  '^/api': ''
                }
              },
          }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
          preProcessor: 'less',
          patterns: [
            path.resolve(__dirname,'./public/less/_theme.less'),
          ]
        }
      }
}
