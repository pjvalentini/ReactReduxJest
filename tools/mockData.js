const contacts = [
  {
    id: 1,
    name: "John Doe",
    slug: "John Doe",
    creatorId: 3,
    category: "John@Doe.com"
  },
  {
    id: 2,
    name: "Jane Doe",
    slug: "Jane Doe",
    creatorId: 1,
    category: "Jane@Doe.com"
  },
  {
    id: 3,
    name: "Bill Clinton",
    slug: "Bill Clinton",
    creatorId: 2,
    category: "potus@gmail.com"
  },
  {
    id: 4,
    name: "LeBron James",
    slug: "Lebron James",
    creatorId: 2,
    category: "kingJames@gmail.com"
  },
  {
    id: 5,
    name: "Wayne Gretzky",
    slug: "Wayne Gretzky",
    creatorId: 1,
    category: "greatone@gmail.com"
  },
  {
    id: 6,
    name: "Ted Dead",
    slug: "Ted Dead",
    creatorId: 1,
    category: "Ted@Dead.com"
  },
  {
    id: 7,
    name: "Wilt Chamberlin",
    slug: "Wilt Chamberlin",
    creatorId: 1,
    category: "wilt@theStilt"
  },
  {
    id: 8,
    name: "Sam Ashe",
    slug: "Sam Ashe",
    creatorId: 1,
    category: "Sam@Ashe.com"
  },
  {
    id: 9,
    name: "Mario Mario",
    slug: "Mario Mario",
    creatorId: 3,
    category: "marioM@gmail.com"
  },
  {
    id: 10,
    name: "Scottie Pippen",
    slug: "Scottie Pippen",
    creatorId: 1,
    category: "SP@outlook.com"
  }
];

const creators = [
  { id: 1, name: "Lea Collins" },
  { id: 2, name: "Kent Elmer" },
  { id: 3, name: "PJ Valentini" },
  { id: 4, name: "Paula Speakman" },
  { id: 5, name: "Robert Blackstone" },
  { id: 6, name: "Adam Cornett" },
  { id: 7, name: "Dan Jewell" },
  { id: 8, name: "Jeff Riedinger" },
  { id: 9, name: "Diva Payne" },
  { id: 10, name: "Amy Johnson" }
];

const newContact = {
  id: null,
  name: "",
  creatorId: null,
  category: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newContact,
  contacts,
  creators
};
