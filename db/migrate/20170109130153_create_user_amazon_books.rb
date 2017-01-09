class CreateUserAmazonBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :user_amazon_books do |t|
      t.references :user, null: false
      t.references :amazon_book, null: false

      t.index [:user_id, :amazon_book_id], unique: true

      t.timestamps
    end

    add_foreign_key :user_amazon_books, :users, on_delete: :cascade, on_update: :cascade
    add_foreign_key :user_amazon_books, :amazon_books, on_delete: :cascade, on_update: :cascade
  end
end
