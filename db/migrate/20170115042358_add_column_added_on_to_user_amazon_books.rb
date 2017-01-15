class AddColumnAddedOnToUserAmazonBooks < ActiveRecord::Migration[5.0]
  def change
    add_column :user_amazon_books, :added_on, :date, null: false, after: :amazon_book_id
    add_index :user_amazon_books, :added_on
  end
end
