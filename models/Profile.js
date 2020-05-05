const { Schema, model } = require('mongoose');

const mongoose = require('mongoose');

const profileObj = {
  basicInformation: {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    dob: {
      type: Date
    },
    height: Number,
    weight: Number,
    maritalStatus: {
      type: String,
      enum: ['single', 'married']
    },
    physicalType: {
      type: String,
      enum: ['normal', 'normal2']
    },
    bodyType: {
      type: String,
      enum: ['slim', 'medium']
    },

    complexion: {
      type: String,
      enum: ['fair', 'wheatish']
    },
    eating: {
      type: String,
      enum: ['vegetarian', 'non-vegetarian', 'eggetarian']
    },
    drinking: {
      type: String,
      enum: ['never', 'occational', 'always']
    },
    smoking: {
      type: String,
      enum: ['never', 'occational', 'always']
    }
  },
  religiousInformation: {
    religion: {
      type: String,
      enum: ['hindu', 'christian', 'muslim', 'others']
    },
    caste: {
      type: String,
      enum: ['caste-1', 'caste-2', 'caste-3'],
    },
    subCaste: String,
    gothram: String,
    zodiac: String,
    star: String,
    rasi: String,
    dosham: String,

  },
  professionalInformation: {
    education: {
      type: String,
      enum: ['B.Tech', 'B.E'],
    },
    college: [String],
    occupation: String,
    organization: String,
    annualIncome: Number
  },
  location: {
    country: String,
    state: String,
    city: String,
    citizenship: String
  },
  familyDetails: {
    familyValues: {
      type: String,
      enum: ['traditional', 'liberal']
    },
    familyType: {
      type: String,
      enum: ['joint', 'nuclear']
    },
    fatherOccupation: String,
    motherOccupation: String,
    bothers: Number,
    sisters: Number,
    ancestralOrigin: String,
    aboutOurFamily: String,
  },
  aboutMe: {
    type: String,
    required: [true, 'Please add about me.'],
    trum: true,
    maxlength: [500, 'About me cannot be more than 500 characters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}


const profileSchema = new Schema(profileObj);
module.exports = model('Profile', profileSchema);
