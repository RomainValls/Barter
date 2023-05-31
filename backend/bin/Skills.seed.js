require("dotenv/config");
require("../db/index");
const Skills = require("../models/Skills.model");

const skills = [
  { name: "Personal training", serviceCategory: "Personal" },
  { name: "Styling and fashion consulting", serviceCategory: "Personal" },
  { name: "Personal shopping", serviceCategory: "Personal" },
  { name: "Personal chef services", serviceCategory: "Personal" },
  {
    name: "Personal grooming and beauty services",
    serviceCategory: "Personal",
  },
  { name: "Personal organizing and decluttering", serviceCategory: "Personal" },
  { name: "Event planning and coordination", serviceCategory: "Personal" },
  { name: "Pet sitting", serviceCategory: "Personal" },
  { name: "Dog walking", serviceCategory: "Personal" },
  { name: "House cleaning and organizing", serviceCategory: "Personal" },
  { name: "Babysitting and childcare", serviceCategory: "Personal" },

  { name: "Legal services", serviceCategory: "Professional" },
  {
    name: "Accounting and bookkeeping services",
    serviceCategory: "Professional",
  },
  {
    name: "Financial planning and investment advice",
    serviceCategory: "Professional",
  },
  { name: "Business consulting", serviceCategory: "Professional" },
  { name: "Tax preparation and filing", serviceCategory: "Professional" },
  {
    name: "Marketing and advertising services",
    serviceCategory: "Professional",
  },
  { name: "Graphic design and branding", serviceCategory: "Professional" },
  { name: "Web development and design", serviceCategory: "Professional" },
  { name: "Copywriting and content creation", serviceCategory: "Professional" },
  {
    name: "Translation and interpretation services",
    serviceCategory: "Professional",
  },

  {
    name: "Personal coaching and mentoring",
    serviceCategory: "Health and Wellness",
  },
  {
    name: "Fitness training and coaching",
    serviceCategory: "Health and Wellness",
  },
  { name: "Nutrition counseling", serviceCategory: "Health and Wellness" },
  { name: "Massage therapy", serviceCategory: "Health and Wellness" },
  {
    name: "Yoga and meditation instruction",
    serviceCategory: "Health and Wellness",
  },

  { name: "Tutoring and academic support", serviceCategory: "Educational" },
  { name: "Test preparation", serviceCategory: "Educational" },
  {
    name: "Language instruction and translation",
    serviceCategory: "Educational",
  },
  { name: "Music lessons and instruction", serviceCategory: "Educational" },
  { name: "Art classes and workshops", serviceCategory: "Educational" },
  {
    name: "Cooking classes and culinary instruction",
    serviceCategory: "Educational",
  },
  { name: "Technology training and support", serviceCategory: "Educational" },
  { name: "Career counseling and guidance", serviceCategory: "Educational" },
  { name: "Life skills coaching", serviceCategory: "Educational" },

  { name: "Photography and videography", serviceCategory: "Creative" },
  { name: "Graphic design and illustration", serviceCategory: "Creative" },
  { name: "Writing and editing services", serviceCategory: "Creative" },
  { name: "Music production and composition", serviceCategory: "Creative" },
  { name: "Voice-over and narration", serviceCategory: "Creative" },
  { name: "Fine arts and crafts", serviceCategory: "Creative" },
  { name: "Interior design and decoration", serviceCategory: "Creative" },
  { name: "Event entertainment services", serviceCategory: "Creative" },
  { name: "Customized gift creation", serviceCategory: "Creative" },

  { name: "Plumbing and electrical repairs", serviceCategory: "Home" },
  { name: "Carpentry and woodworking", serviceCategory: "Home" },
  { name: "Painting and wallpapering", serviceCategory: "Home" },
  { name: "Home renovation and remodeling", serviceCategory: "Home" },
  { name: "HVAC services", serviceCategory: "Home" },
  { name: "Lawn care and landscaping", serviceCategory: "Home" },
  { name: "Pest control", serviceCategory: "Home" },
  { name: "Pool maintenance and cleaning", serviceCategory: "Home" },

  { name: "Ride service", serviceCategory: "Transportation" },
  {
    name: "Limousine and chauffeur services",
    serviceCategory: "Transportation",
  },
  { name: "Delivery services", serviceCategory: "Transportation" },
  { name: "Moving and relocation services", serviceCategory: "Transportation" },
  { name: "Car wash and detailing", serviceCategory: "Transportation" },
];

async function seed() {
  try {
    await Skills.deleteMany();
    const skils = await Skills.create(skills);
    console.log(skills.length);
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
