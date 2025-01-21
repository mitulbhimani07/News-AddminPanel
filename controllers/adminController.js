const AdminModel = require("../models/AdminModel");
const path = require('path');
const fs = require('fs');
const { name } = require("ejs");

module.exports.dashboard = (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    console.log(err);
    return res.redirect("err");
  }
};
module.exports.dashboard2 = (req, res) => {
  try {
    res.render("dashboard2");
  } catch (err) {
    console.log(err);
    return res.redirect("err");
  }
};
module.exports.dashboard3 = (req, res) => {
  try {
    res.render("dashboard3");
  } catch (err) {
    console.log(err);
    return res.redirect("err");
  }
};
module.exports.AddAdmin = (req, res) => {
  try {
    res.render("AddAdmin");
  } catch (err) {
    console.log(err);
    return res.redirect("err");
  }
};
module.exports.insertAdmin = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    let adminImage = "";
    if (req.file) {
      adminImage = AdminModel.imgPath + "/" + req.file.filename;
    }
    req.body.image = adminImage;
    req.body.name = req.body.fname + " " + req.body.lname;

    const AdminRecord = await AdminModel.create(req.body);
    if (AdminRecord) {
      console.log("Data added Successfully");
      return res.redirect("/ViewAdmin");
    } else {
      console.log("Something is Wrong...");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.ViewAdmin = async (req, res) => {
  try {
    let AdminRecord = await AdminModel.find();
    res.render('ViewAdmin', {
      AdminRecord
    })
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}

module.exports.deleteAdmin = async (req, res) => {
  let id = req.params.id;
  let deleteRecord = await AdminModel.findById(id);

  const deletePath = path.join(__dirname, "..", deleteRecord.image);
  try {
    if (deletePath) {
      fs.unlinkSync(deletePath);
      console.log("Delete Record Successfully");
    }
  } catch (err) {
    console.log(err);
  }
  await AdminModel.findByIdAndDelete(id);
  return res.redirect('back');
}

module.exports.updateAdmin = async (req, res) => {
  try {
    let SingleObj = await AdminModel.findById(req.params.id);
    res.render('editAdmin', {
      SingleObj,
      name
    });
  } catch (err) {
    console.log(err, "Something is wrong");
    return res.redirect('back');
  }
}
module.exports.editAdmin = async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}

//Sign In

module.exports.signIn = async (req, res) => {
  try {
    return res.render('signIn');
  }
  catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}
module.exports.checkSignIn = async (req, res) => {
  try {
    return res.redirect("/dashboard");
  }
  catch (err) {
    console.log(err);
    res.redirect("back");
  }
};


module.exports.myProfile = (req, res) => {

  try {
    return res.render("myProfile")
  }
  catch (err) {
    console.log(err);
    return res.redirect("back");
  }
}


// logout 
module.exports.signOut = (req, res) => {
  try {

    req.session.destroy(function (err) {
      if (err) {
        return false;
      }
      return res.redirect('/signIn')
    })


  }
  catch (err) {
    console.log(err);
    return res.redirect("back");
  }
}







module.exports.changePassword = async (req, res) => {
  try {
    res.render('changePassword', {
      adminData: req.cookies.adminData
    });
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}
module.exports.changeNewPassword = async (req, res) => {
  try {
    const oldPassword = req.cookies.adminData;
    console.log(req.body);
    if (oldPassword.password == req.body.currentPassword) {
      if (req.body.currentPassword != req.body.newPassword) {
        if (req.body.newPassword == req.body.confirmPassword) {
          let editPassword = await AdminModel.findByIdAndUpdate(oldPassword._id, { password: req.body.newPassword });
          return res.redirect('logout');
        } else {
          console.log("New password and Confirm password are doesn't match.Try Again..");
          res.redirect('back');
        }
      } else {
        console.log("Current Password and new password are same.Try another..");
        res.redirect('back');
      }
    } else {
      console.log("current password is doesn't match with old pssword.Try Again..");
    }
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}

//forget password

module.exports.verifyEmail = async (req, res) => {
  try {
    let singleObj = await AdminModel.find({ email: req.body.email }).countDocuments();
    if (singleObj == 1) {
      let singleAdminData = await AdminModel.findOne({ email: req.body.email });
      let OTP = Math.floor(Math.random() * 100000);
      res.cookie('otp', OTP);
      res.cookie('email', singleAdminData.email);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "kukadiyanensi41@gmail.com",
          pass: "thlqzvuxvvmkxlwi",
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const info = await transporter.sendMail({
        from: "kukadiyanensi41@gmail.com",
        to: "kukadiyanensi41@gmail.com",
        subject: "OTP ",
        text: "verify OTP",
        html: `<b>your OTP is ${OTP}</b>`,
      });

      console.log("Message sent: ");

      return res.redirect('checkOtp');
    }
    else {
      console.log("Invalid Email try again");
      return res.redirect('back');
    }
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}

module.exports.checkOtp = async (req, res) => {
  try {
    return res.render('checkOtp');
  }
  catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}
module.exports.verifyOtp = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.cookies.otp);
    if (req.body.otp = req.cookies.otp) {
      res.clearCookie('otp');
      res.redirect('/forgotPass');
    }
    else {
      console.log("Invalid OTP");
      res.redirect('back');
    }
  }
  catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}

module.exports.forgotPass = async (req, res) => {
  try {
    return res.render('forgotPass');
  }
  catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}

module.exports.verifyPass = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.newPassword == req.body.confirmPassword) {
      let checkLastTime = await AdminModel.find({ email: req.cookies.email }).countDocuments();
      if (checkLastTime == 1) {
        let adminDataNew = await AdminModel.findOne({ email: req.cookies.email });
        let updatePass = await AdminModel.findByIdAndUpdate(adminDataNew._id, { password: req.body.newPassword });
        if (updatePass) {
          res.clearCookie('email');
          console.log("password Changed Successfully")
          return res.redirect('/');
        }
        else {
          console.log("Password not Updated..Try again");
          return res.redirect('back');
        }
      }
      else {
        console.log("Email not found..Try again");
        return res.redirect('back');
      }
    }
    else {
      console.log("new Password and confirm password not matched..Try again");
      return res.redirect('back');
    }

  }
  catch (err) {
    console.log(err);
    return res.redirect('back');
  }
}









module.exports.insertCategory = async (req, res) => {
  try {
    console.log(req.body);

    //   console.log(req.file);
    //   let adminImage = "";
    //   if (req.file) {
    //     adminImage = AdminModel.imgPath + "/" + req.file.filename;
    //   }
    //   req.body.image = adminImage;
    //   req.body.name = req.body.fname + " " + req.body.lname;

    //   const AdminRecord = await AdminModel.create(req.body);
    //   if (AdminRecord) {
    //     console.log("Data added Successfully");
    //     return res.redirect("/ViewAdmin");
    //   } else {
    //     console.log("Something is Wrong...");
    //     return res.redirect("back");
    //   }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
}
module.exports.deleteMultipleAddmin = async(req,res)=>{
  try{
    console.log(req.body);
    let CategoryDelete = await AdminModel.deleteMany({_id:{$in:req.body.Ids}});
    if (CategoryDelete) {
        return res.redirect("back")
    }
    else{
        console.log("something is wrong");
        return res.redirect("back")

    }
}
catch {
    console.log("something is wrong");
    return res.redirect("back")
}
}