let socketio = {}
let sqlQuery = require('./module/lcMysql')

function getSocket(server){
    socketio.io = require('socket.io')(server);

    let io = socketio.io;
    io.on('connection', function(socket){
        //wxchat项目
        console.log(socket.id+"建立连接")

        //接收登录事件
        socket.on('login',async function(data){
            //先判断是否已经有人在登录，如果有人登录的话，那么将其断开连接
            let sqlStr1 = 'select * from user where isonline = ? and username = ?';
            let result1 = await sqlQuery(sqlStr1,['true',data.username])
            if(result1.length>0){
                socket.to(result1[0].socketid).emit('logout',{content:"有人登录进来，强制将你踢出去！"})
                //断开连接
                //socket.to(result1[0].socketid).disconnect();
            }

            //修改数据库登录信息（socketid,isonline)
            let sqlStr = "update user set socketid=?,isonline=? where username =?"
            let result = await sqlQuery(sqlStr,[socket.id,'true',data.username])
            socket.emit('login',{
                state:'ok',
                content:"登录成功"
            })

            let sqlStr2 = "select * from user"
            //等待获取mysql查询结果
            let result2 = await sqlQuery(sqlStr2)
            io.sockets.emit('users',Array.from(result2))
            

            
            
            //最新未接收的消息
            let sqlStr3 = 'select * from chat where isread = ? and `to`= ?';
            let result3 = await sqlQuery(sqlStr3,['false',data.username])

            socket.emit('unreadMsg',Array.from(result3))

            //加入群（房间）
            //获取所有的群
            let sqlStr4 = 'select * from user where isgroup = ?';
            let result4 = await sqlQuery(sqlStr4,['true'])
            //socket.join()
            Array.from(result4).forEach((item,index)=>{
                console.log(item.socketid)
                socket.join(item.socketid)
            })
            //console.log(result4)

        })

        socket.on('disconnect',async function(){
            //修改数据库登录信息（socketid,isonline）
            let sqlStr = "update user set socketid=?,isonline=? where socketid =?"
            let result = await sqlQuery(sqlStr,[null,null,socket.id])
            // socket.emit('login',{
            //     state:'ok',
            //     content:"登录成功"
            // })
        })

            socket.on('users',async function(){
                let sqlStr = "select * from user"
                //等待获取mysql查询结果
                let result = await sqlQuery(sqlStr)
                socket.emit('users',Array.from(result))
            })


            socket.on('sendMsg',async function(msg){
                console.log(msg)
                //判断收消息的人是否在线
                
                let strSql = 'select * from user where username = ? and isonline= ?';
                let result = await sqlQuery(strSql,[msg.to.username,'true']);
                if(result.length>0){
                    //如果此人在线，那么直接发送消息；
                    let toid = result[0].socketid;
                   // console.log(toid)
                    socket.to(toid).emit("accept",msg)
                    //console.log(socket)
                    //将聊天内容存放到数据库
                    let strSql1 = 'insert into chat (`from`,`to`,content,`time`,isread) values (?,?,?,?,?)';
                    let arr1 = [msg.from.username,msg.to.username,msg.content,msg.time,'true'];
                    sqlQuery(strSql1, arr1)
                }else{
                    //将聊天内容存放到数据库
                    let strSql1 = 'insert into chat (`from`,`to`,content,`time`,isread) values (?,?,?,?,?)';
                    let arr1 = [msg.from.username,msg.to.username,msg.content,msg.time,'false'];
                    sqlQuery(strSql1,arr1)
                }
            })
            //如果收到已读消息，将已读信息改为true;
            socket.on('readMsg',(data)=>{
                let sqlStr = 'update chat set isread=? where `from`=? and `to`=?'
                sqlQuery(sqlStr,['true',data.username,data.self])
            })

        });




        
        
        //此处的socket是当前浏览器某个浏览器与服务器的连接对象

        //当新的用户连接进来时，向所有人广播此人的id

        // io.sockets.emit('addUser',{
        //     id:socket.id,
        //     content:"新用户加入"
        // })
        // socket.emit('news',{hello: 'world'});
        // socket.on('my other event', function(data){
        //     console.log(socket.id)
        //     console.log(data);
        //     socket.emit('hello', {content:"学习前端"})
        // });


         //向某个客户发送消息
        //  socket.on('sendUser',function(data){
            // data = {
            //     from:"发送者ID",
            //     to:"收到者ID",
            //     content:"xxxxxx"
            // }

        //     socket.to(data.to).emit('sendClient',data)
        // })
         //加入房间事件
        // socket.on('addRoom',function(data){
        //     console.log(data)
        //    let roomObj = socket.join(data.room)
        //    console.log(roomObj)
        // })
        //监听群聊事件，并广播给所有人
    //     socket.on('sendMsgRoom',function(data){
    //         console.log(data)
    //         socket.to(data.room).emit('qunliao',data)
    //     })

    // });

//     let qq = io.of('/qq')
//     qq.on("connection",function(){
//         qq.emit('news',{content:"qq命名空间发送过来的内容"})
//     });

// let wx = io.of('/wx')
// wx.on('connection',function(){
//     wx.emit('news',{content:"wx命名空间发送过来的内容"})
// })
}


socketio.getSocket = getSocket;

module.exports = socketio