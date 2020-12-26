const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "client", "vendor", "operation"],
      default: "client",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    assign:[],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    confirmEmailToken: String,
    active: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reportID:[ ],

    profile: {
      contactPersonName: { type: String,  },
      desigination: { type: String,  },
      mobile: { type: String,  },
      alternateMobile: { type: String,  },
      landline: { type: String,  },
      fax: { type: String,  },
      pancard_img: { type: String,  },
      agreement_img: { type: String,  },
      other: { type: String,  },

      companyDetail: {
        companyName: { type: String,  },
        year: { type: String,  },
        CEOname: { type: String,  },
        contactName: { type: String,  },
        websiteURL: { type: String,  },
      },
      Address: {
        building: { type: String,  },
        street: { type: String,  },
        landmark: { type: String,  },
        locality: { type: String,  },
        city: { type: String,  },
        state: { type: String,  },
        country: { type: String,  },
        pincode: { type: String,  },
      },
      statutarydetails: {
        gstin: { type: String,  },
        TAN: { type: String,  },
        importExportCode: { type: String,  },
        pan_number: { type: String,  },
        cin_number: { type: String,  },
        gst: { type: String,  },
      },
      bank_account: {
        IFSC_code: { type: String,  },
        bank_name: { type: String,  },
        importExportCode: { type: String,  },
        account_number: { type: String,  },
        account_type: { type: String,  },
      },
      business_nature: {
        primary_business: { type: String,  },
        employee: { type: String,  },
        ownership_type: { type: String,  },
        annual_turnover: { type: String,  },
        secondary_business: { type: String,  },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
// Generate email confirm token
UserSchema.methods.generateEmailConfirmToken = function (next) {
  // email confirmation token
  const confirmationToken = crypto.randomBytes(20).toString("hex");

  this.confirmEmailToken = crypto
    .createHash("sha256")
    .update(confirmationToken)
    .digest("hex");

  const confirmTokenExtend = crypto.randomBytes(100).toString("hex");
  const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
  return confirmTokenCombined;
};

//Reverse populate with virtuals
UserSchema.virtual("reports", {
  ref: "Report",
  localField: "_id",
  foreignField: "user_id",
  justOne: false,
});

module.exports = mongoose.model("User", UserSchema);
