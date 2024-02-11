const express = require('express')
const app = express()
const port = 3000

//ติดต่อกับฐานข้อมูล
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'project2',
  password: '(Q[*5auq-gu97iDY',
  database: 'shop_system'
})

connection.connect()
if(connection){console.log("Connect success");}
else{console.log("Failed");}

//เพิ่มสมาชิก

  app.get('/addmember',(req,res)=>{
    let id_member = req.query.id_member;
    let username = req.query.username;
    let password = req.query.password;
    let firstname = req.query.firstname;
    let surname = req.query.surname;
    let address = req.query.address;
    let query = `INSERT INTO member(id_member,username,password,firstname,surname,address)
               VALUE ('${id_member}' ,'${username}','${password}','${firstname}','${surname}','${address}')`;
               console.log(query);
               connection.query(query,(err,rows,fields)=>{
                if(err)throw err
                res.send(rows)
               })
  });

//เพิ่มข้อมูลคนซื้อ
  app.get('/addpurchaser_seller',(req,res)=>{
    let id_member = req.query.id_member;
    let firstname = req.query.firstname;
    let surname = req.query.surname;
    let address = req.query.address;
    let product_type = req.query.product_type;
    let name_type = req.query.name_type;
    let size_type = req.query.size_type;
    let quantity_type = req.query.quantity_type;
    let price_type = req.query.price_type;
    let sex =req.query.sex
    let query = `INSERT INTO purchaser(id_member,firstname,surname,address,product_type,name_type,
      size_type,quantity_type,price_type,sex)
               VALUE ('${id_member}' ,'${firstname}','${surname}','${address}','${product_type}',
               '${name_type}','${size_type}','${quantity_type}','${price_type}','${sex}')`;
               console.log(query);
               connection.query(query,(err,rows,fields)=>{
                if(err)throw err
                res.send(rows)
               })

               //เพิ่มข้อมูลที่ขายได้
               let id_type	 = req.query.id_type;
               let product_type_s = req.query.product_type_s;
               let name_type_s = req.query.name_type_s;
               let size_type_s	 = req.query.size_type_s;
               let quantity_type_s = req.query.quantity_type_s;
               let price_type_s = req.query.price_type_s;
               let total_type_s = req.query.total_type_s;
               let time = req.query.time;
               let query1 = `INSERT INTO seller(id_type,product_type_s,name_type_s,size_type_s,quantity_type_s,
                price_type_s,total_type_s,time)
                          VALUE ('${id_type}' ,'${product_type_s}','${name_type_s}','${size_type_s}','${quantity_type_s}',
                          '${price_type_s}','${total_type_s}','${time}')`;
                          console.log(query1);
               connection.query(query1,(err,rows,fields)=>{
                if(err)throw err
                res.send(rows)
               })
  });

  //ดูได้ว่าคนซื้อ ซื้ออะไรไปบ้าง
  app.get('/viewpurchaser',(req,res)=>{
    let id_member = req.query.id_member;
    let query = 'SELECT * from purchaser WHERE id_member='+id_member;
    console.log(query);

    connection.query(query,(err,rows,fields)=>{
      if(err)throw err
      res.send(rows)
    })
  });

  //คนขายดูยอดขายได้
  app.get('/viewseller',(req,res)=>{
    let product_type_s = req.query.product_type_s;
    let query = 'SELECT * from seller WHERE product_type_s='+product_type_s;
    console.log(query);

    connection.query(query,(err,rows,fields)=>{
      if(err)throw err
      res.send(rows)
    })
  });

  //ยกเลิกการจอง ลบข้อมูล
  app.get('/cancel_order',(req,res)=>{
    connection.query('DELETE from purchaser',(err,rows,fields)=>{
      if (err) throw err
      res.send("cancel order") 
    });
    connection.query('DELETE from seller',(err,res)=>{
      if (err) throw err
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })