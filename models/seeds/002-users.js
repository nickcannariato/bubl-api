const fs = require('fs');
const faker = require('faker');
const bcrypt = require('bcryptjs');

const createFakeUser = () => ({
  audit_id: faker.random.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
  avatar_url: faker.internet.avatar(),
  school_id: 1,
  is_admin: false
})

exports.seed = async function (knex, Promise) {
  const fakeUsers = [{
    audit_id: faker.random.uuid(),
    username: 'harrypotter',
    password: 'theboywholived',
    avatar_url: faker.internet.avatar(),
    school_id: 1,
    is_admin: false
  }]

  for (let i = 0; i < 500; i++) {
    fakeUsers.push(createFakeUser());
  }

  fs.writeFileSync('./authTestInfo.json', JSON.stringify({ users: fakeUsers }))

  fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 4)
  })

  return await knex("users").insert(fakeUsers);
};
