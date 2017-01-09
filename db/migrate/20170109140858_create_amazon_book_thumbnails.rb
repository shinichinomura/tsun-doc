class CreateAmazonBookThumbnails < ActiveRecord::Migration[5.0]
  def change
    create_table :amazon_book_thumbnails do |t|
      t.references :amazon_book, null: false
      t.string :url, null: false, limit: 1024

      t.timestamps null: false
    end

    add_foreign_key :amazon_book_thumbnails, :amazon_books, on_delete: :cascade, on_update: :cascade
  end
end
