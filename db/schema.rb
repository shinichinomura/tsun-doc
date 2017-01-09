# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170109130153) do

  create_table "amazon_books", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "asin",       limit: 16,   null: false
    t.string   "title",      limit: 512,  null: false
    t.string   "url",        limit: 2048, null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["asin"], name: "index_amazon_books_on_asin", unique: true, using: :btree
  end

  create_table "user_amazon_books", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "user_id",        null: false
    t.integer  "amazon_book_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["amazon_book_id"], name: "index_user_amazon_books_on_amazon_book_id", using: :btree
    t.index ["user_id", "amazon_book_id"], name: "index_user_amazon_books_on_user_id_and_amazon_book_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_user_amazon_books_on_user_id", using: :btree
  end

  create_table "user_auths", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "user_id",                     null: false
    t.string   "provider",         limit: 16, null: false
    t.bigint   "provider_user_id",            null: false, unsigned: true
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["provider", "provider_user_id"], name: "index_user_auths_on_provider_and_provider_user_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_user_auths_on_user_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "username",   limit: 16, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

  add_foreign_key "user_amazon_books", "amazon_books", on_update: :cascade, on_delete: :cascade
  add_foreign_key "user_amazon_books", "users", on_update: :cascade, on_delete: :cascade
  add_foreign_key "user_auths", "users", on_update: :cascade, on_delete: :cascade
end
