const uuid = require('uuid/v4')

exports.up = function(knex) {
  return knex.schema
    .createTable('schools', tbl => {
      tbl.increments()
      tbl.uuid('audit_id').defaultTo(uuid()).notNullable()
      tbl.text('name').notNullable()
    })
    .createTable('users', tbl => {
      tbl.increments();
      tbl.uuid('audit_id').defaultTo(uuid()).notNullable()
      tbl.text('username').notNullable()
      tbl.text('avatar_url').nullable()
      tbl.integer('school_id')
         .references('id')
         .inTable('schools')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
         .notNullable()
      tbl.boolean('is_admin').defaultTo(false);
    })
    .createTable('bubls', tbl => {
      tbl.increments()
      tbl.uuid('audit_id').defaultTo(uuid()).notNullable()
      tbl.text('topic').notNullable()
      tbl.integer('school_id')
         .references('id')
         .inTable('schools')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
    })
    .createTable('posts', tbl => {
      tbl.increments()
      tbl.uuid('audit_id').defaultTo(uuid()).notNullable()
      tbl.text('title')
      tbl.text('body')
      tbl.datetime('created_at').defaultTo(knex.fn.now(6))
      tbl.datetime('modified_at').defaultTo(knex.fn.now(6))
      tbl.integer('bubl_id')
         .references('id')
         .inTable('bubls')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
         .notNullable()
      tbl.integer('author_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
    })
    .createTable('comments', tbl => {
      tbl.increments()
      tbl.uuid('audit_id').defaultTo(uuid()).notNullable()
      tbl.text('body')
      tbl.datetime('created_at').defaultTo(knex.fn.now(6))
      tbl.integer('post_id')
         .references('id')
         .inTable('posts')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
         .notNullable()
      tbl.integer('author_id')
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
         .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('bubls')
    .dropTableIfExists('users')
    .dropTableIfExists('schools')
};
