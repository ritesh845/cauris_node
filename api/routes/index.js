const express = require('express');
const router  = express.Router();
const db = require('../models');
const User = db.users;
const Talent = db.talents;
const multer = require('multer');
const fs = require('fs');
const TokenVerify = require('../middleware/tokenVerify');


var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        const dir = `./uploads/`;
        fs.exists(dir,exist => {
            if(!exist){
                return fs.mkdir(dir,error => cb(error,dir));
            }
            return cb(null,dir);
        });
        // cb(null,dir);
    },
    filename : function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}



var upload = multer({
    storage:storage,
    limits:{
        fieldNameSize: 50,
        fileSize:1024 * 1024 *5
    },
    fileFilter:fileFilter
}).single('file');


router.get('/',(req,res) => {
    res.status(200).json({
        message:bcrypt.hashSync('admin',10)
    });

 });




router.post('/login',(req,res) => {
    User.findAll({
        where : {
            email : req.body.email
        }
    }).then(user =>{
		if(user.length < 1){
			return res.status(401).json({
				message : "This credentails doesn't match our records."
			});
		}else{

            bcrypt.compare(req.body.password,user[0].password,(err, result) =>{
                console.log(result)
                if(result){
                    const token  = jwt.sign({
                        email:user[0].email,
                        userId : user[0].id
                    },'secrettext',{
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        status:'success',
                        message : 'login successfully',
                        accesstoken: token,
                    });
                }else{
                    return res.status(401).json({
                        errors : "This credentails doesn't match our records."
                    });
                }
            })
		}
    })
});

router.get('/get_talent',(req,res) => {

    Talent.findAll({where:{status:'A'}}).then((result) => {
        res.status(200).json({
            data:result
        })
    }).catch(err => {
        res.status(500).json({
            error:err
        })
    });

});


router.get('/talent',TokenVerify,(req,res) => {

    Talent.findAll().then((result) => {
        res.status(200).json({
            data:result
        })
    }).catch(err => {
        res.status(500).json({
            error:err
        })
    });

});



router.post('/talent/create',TokenVerify,upload,(req,res) => {

    var talent = {
        name:req.body.name,
        about:req.body.about,
        img:req.file.filename,
        status:req.body.status,
        facebookLink:req.body.facebookLink,
        instagramLink:req.body.instagramLink,
        snapchatLink:req.body.snapchatLink,
        youtubeLink:req.body.youtubeLink

    }
    Talent.create(talent).then(result => {
        res.status(200).json({
            message:'Talent Created Successfully'
        });
    }).catch(err => {
        res.status(500).json({
            error:{
                message:"Some Error please check data and format of file"
            }
        })
    });


});

router.put('/talent/update/:id',TokenVerify,upload,(req,res) => {
    var id = req.params.id;
    var talent = {
        name:req.body.name,
        about:req.body.about,
        status:req.body.status,
        facebookLink:req.body.facebookLink,
        instagramLink:req.body.instagramLink,
        snapchatLink:req.body.snapchatLink,
        youtubeLink:req.body.youtubeLink
    }
    var path = req.body.oldFile;
    console.log(path)
    if(req.file !=undefined){
        try {
            fs.unlinkSync("uploads/"+path)
            //file removed
        } catch(err) {
            console.error(err)
        }
        console.log(req.file)
        talent.img = req.file.filename;
    }

    Talent.update(talent,{where:{id:id}}).then(result => {
        res.status(200).json({
            message:'Talent Updated Successfully'
        });
    }).catch(err => {
        res.status(500).json({
            error:{
                message:"Some Error please check data and format of file"
            }
        })
    })
});

router.delete('/tutorial/delete/:id',TokenVerify,(req,res) => {
    var id = req.params.id;
    Talent.findByPk(id).then(result => {
        try {
            fs.unlinkSync("uploads/"+path)
            //file removed
        } catch(err) {
            console.error(err)
        }
      }).catch(err =>{
            res.status(500).send({
                message: "Error retrieving Talent with id=" + id
            });
      });

      Talent.destroy({
        where: { id: id }
        })
        .then(result => {
            if (result == 1) {
            res.send({
                message: "Talent was deleted successfully!"
            });
            } else {
            res.send({
                message: `Cannot delete Talent with id=${id}. Maybe Talent was not found!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Could not delete Talent with id=" + id
            });
        });
})

module.exports = router;
